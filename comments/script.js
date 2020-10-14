/**
 * Comments section is powered by Online Notes by JUST VICE.
 * Visit the page at onlinenotes.ml
 */

// ------------------------------------------------------------------------------
// DOM elements capture.
// ------------------------------------------------------------------------------
const inputText_newComment = document.getElementById("inputText_newComment");
const btn_newComment = document.getElementById("btn_newComment");
const comments = document.getElementById("comments");
const API_Connection_Token = "13c4ae8e38567da5981106230513aecb5ae05f533c15015c0cad15f675675ef05ce8cb";
const url = "https://online-notes-vice.herokuapp.com"; // Heroku gives free HTTPS SSL service.

// ------------------------------------------------------------------------------
// Functions.
// ------------------------------------------------------------------------------

// ==============================================================================
// ==============================================================================
// Comments rendering.

function fetch_comments() {
    const url_api = url + "/api/token/read-private-note.php";
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
            let obj = JSON.parse(response);
            render_comments(obj);
        })
        .catch(function (err) {
            console.error(err);
            error_503_message();
        });
}

function render_comments(comments_input) {
    if (comments_input["status"] == "warning") {
        console.log("Status: warning");
        if (comments_input["description"] == "user does not have private notes") {
            comments.innerHTML = `
            There are no comments registered.
            `;
        }
    } else { // There are comments.
        comments.innerHTML = "";
        array_length = comments_input.length;
        for (let i = array_length; i > 0; i--) {
            if (!regexMatcher_isURLAnImage(comments_input[i - 1]["description"])) { // If doesn't contain an image.
                comments.innerHTML += `
                <div class="alert alert-secondary comment" role="alert">
                    ${comments_input[i - 1]["description"]}
                </div>
                `;
            } else { // If comment contains an image.
                comments.innerHTML += `
                <div class="alert alert-secondary comment" role="alert">
                    ${imageFinderAndReplace(comments_input[i - 1]["description"])}
                </div>
                `;
            }
        }
    }
}

// ==============================================================================
// ==============================================================================
// Publish comments.

btn_newComment.addEventListener("click", function () {
    if (inputText_newComment.value != "") { // If content written.
        publish_comment(inputText_newComment.value);
    } else {
        no_comment_written_alert();
    }
});

// Handles the process to publish a new comment.
function publish_comment(inputText_newComment_value) {
    const url_api = url + "/api/token/insert-private-note.php";
    var json_request = {
        title: "JustVice.Github.io Comment",
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
                inputText_newComment.value = "";
                message_posted_alert();
            } else {
                alert("An error has occurred. Please, report at Send a Message section.");
            }
        });
}

// Shows a message alert when a comment is posted.
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

// Shows a message when user tries to post a comment with no content.
function no_comment_written_alert() {
    Swal.fire({ // Modal showing no message was written.
        icon: 'error',
        title: 'Invalid comment',
        text: 'You cannot post an empty comment.'
    })
}

// ==============================================================================
// ==============================================================================
// Error notification functions.

function error_503_message() {
    comments.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Error 503 - Server error. <a href="../send-message">Report error here.</a>
    </div>
    `;
}

// ==============================================================================
// ==============================================================================
// Regex functions.

// Finds image links inside plain-text strings and adds <img> tag.
function imageFinderAndReplace(plain_text){
    const regexp = /\b(https?:\/\/\S+(?:png|jpe?g|gif)\S*)\b/ig;
    const replace = `
    <a target='_black' href='$1'>
        <img class='comment_image' src='$1'>
    </a>
    `;
    return plain_text.replace(regexp, replace);
}
