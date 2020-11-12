/**
 * Comments section is powered by Online Notes by JUST VICE.
 * Visit the page at onlinenotes.ml
 */

// ------------------------------------------------------------------------------
// DOM elements capture.
// ------------------------------------------------------------------------------
const TextArea_newComment = document.getElementById("TextArea_newComment");
const btn_PostNewComment = document.getElementById("btn_PostNewComment");
const CommentsList = document.getElementById("CommentsList");
const API_Connection_Token = "e209d36868a8d22254278cb2dc54e3ec37e86c6fc863e3b497f14f4c08452add19fc59";
const url = "https://online-notes-vice.herokuapp.com";

// ------------------------------------------------------------------------------
// Functions.
// ------------------------------------------------------------------------------

// ==============================================================================
// === Comments rendering functions. ===

// Fetches comments from the Online Notes server. If error ocurred, 503 error will be shown.
// If ReadPermission is disallowed, Comments are currently disabled message is shown.
function fetch_comments() {
    const url_api = url + "/api/token/read-private-note.php";
    let json_request = { token: API_Connection_Token };
    fetch(url_api, {
        body: JSON.stringify(json_request), method: 'POST'
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            let res = JSON.parse(response);
            if (!res["status"]) render_comments(res); // No errors nor warnings.
            else {
                if (res["status"] == "failed") { // An error has occurred.
                    console.log(res);
                    error_switch(res);
                } else { // Warning.
                    console.log(res);
                    render_comments(res);
                }
            }
        })
        .catch(function (err) {
            error_503_message();
            console.error(err);
        });
}

// Renders the comments on the HTML.
function render_comments(comments_input) {
    if (comments_input["status"] == "warning") // Warning status only stands for no notes registered.
        CommentsList.innerHTML = `No comments yet.`;
    else {
        CommentsList.innerHTML = "";
        let temporalComment = "";
        array_length = comments_input.length;
        for (let i = array_length; i > 0; i--) {
            temporalComment = linkify(comments_input[i - 1]["description"]);
            CommentsList.innerHTML += `
                <div class="alert alert-secondary comment" role="alert">
                    ${temporalComment}
                </div>`;
        }
    }
}

// ==============================================================================
// === Post comments functions. ===

btn_PostNewComment.addEventListener("click", function () {
    if (TextArea_newComment.value != "") publish_comment(TextArea_newComment.value);
    else no_comment_written_alert();
});

// Handles the process to publish a new comment.
function publish_comment(inputText_newComment_value) {
    const url_api = url + "/api/token/insert-private-note.php";
    var json_request = {
        title: "Comment",
        description: inputText_newComment_value,
        token: API_Connection_Token
    };
    fetch(url_api, {
        method: 'POST',
        body: JSON.stringify(json_request)
    }).then(res => res.json())
        .then((response) => {
            if (response.status == "success") {
                fetch_comments();
                TextArea_newComment.value = "";
                message_posted_alert();
            } else {
                console.log(response);
                error_switch(response);
            }
        });
}

// Shows a message alert when a comment is successfully posted.
function message_posted_alert() {
    const Toast = Swal.mixin({
        toast: true,
        position: 'top-end',
        showConfirmButton: false,
        timer: 1500,
        timerProgressBar: true,
        didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
        }
    })

    Toast.fire({
        icon: 'success',
        title: 'Comment posted'
    })
}

// Checks if API Connection Token has PublishPermission allowed.
// If not, button to post comments is disabled.
function check_PublishPermission() {
    const url_api = url + "/api/token/permissions.php";
    let json_request = {
        token: API_Connection_Token
    };
    fetch(url_api, {
        body: JSON.stringify(json_request)
        , method: 'POST'
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            let res = JSON.parse(response);
            if (res["status"] == "success") {
                if (res["PublishPermission"] == 0) postComment_btnSetDisabled();
            } else postComment_btnSetDisabled();
        })
        .catch(function (err) {
            postComment_btnSetDisabled();
            console.err(err);
        });
}

check_PublishPermission();

// ==============================================================================
// === Error functions. ===

function error_switch(error) {
    if (error["description"] == "read permission disallowed") comments_are_disabled();
    else if (error["description"] == "publish permission disallowed") {
        alert_toCommentIsDisabled();
        postComment_btnSetDisabled();
    } else error_503_message();

}

function error_503_message() {
    CommentsList.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Error 503 - Service Unavailable. <a href="../send-message">Please, report this issue here.</a>
    </div>
    `;
}

function comments_are_disabled() {
    CommentsList.innerHTML = `
    <div class="alert alert-warning" role="alert">
        Comments are currently disabled.
    </div>
    `;
}

function alert_toCommentIsDisabled() {
    Swal.fire({
        icon: 'error', title: 'Comments are disabled', text: 'Sorry! Comments right now are disabled!'
    })
}

function postComment_btnSetDisabled() {
    btn_PostNewComment.disabled = true;
    btn_PostNewComment.classList.remove("btn-primary");
    btn_PostNewComment.classList.add("btn-light");
    btn_PostNewComment.innerHTML = "Commenting is currently disabled";
}

// Shows a message when user tries to post a comment with no content.
function no_comment_written_alert() {
    Swal.fire({
        icon: 'error', title: 'Invalid comment', text: 'You cannot post an empty comment.'
    })
}

// ==============================================================================
// Programmability functions.

// Reads plain-text string. Checks for links and images. Returns <a> and <img> tags arround 
// plain-text input if required.
function linkify(inputText) {
    // Source: https://stackoverflow.com/questions/49634850/javascript-convert-plain-text-links-to-clickable-links
    // Version 1.0
    var replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

    //URLs starting with http://, https://, or ftp://
    replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
    replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

    //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
    replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
    replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

    //Change email addresses to mailto:: links.
    replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
    replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

    //Change img addresses to <img> tag.
	replacePattern4 = /(?<=>)(https?:\/\/\S+(?:png|jpe?g|gif)[^<]*)/g;
    replacedText = replacedText.replace(replacePattern4, '<img src="$1" class="comment_image">');

    return replacedText;
}
