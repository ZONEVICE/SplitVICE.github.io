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
const API_Connection_Token = "3a37462bcc2b6fec5119f08cdc36d17a33f01246aabee8d7eb2ba81404b14499d28293";
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
        array_length = comments_input.length;
        for (let i = array_length; i > 0; i--) {
            CommentsList.innerHTML += `
                <div class="alert alert-secondary comment" role="alert">
                    ${imageFinderAndReplace(comments_input[i - 1]["description"])}
                </div>
                `;
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

// Finds image links inside plain-text strings and adds <img> tag.
function imageFinderAndReplace(plain_text) {
    const regexp = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/ig;
    const replace = `
    <a target='_black' href='$1'>
        <img class='comment_image' src='$1'>
    </a>
    `;
    return plain_text.replace(regexp, replace);
}
