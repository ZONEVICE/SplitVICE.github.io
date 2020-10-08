/**
 * Comments section is powered by Online Notes by JUST VICE.
 * Visit the page at onlinenotes.ml
 */

// ------------------------------------------------------------------------------
// DOM elements capture.
// ------------------------------------------------------------------------------
const input_newComment = document.getElementById("input_newComment");
const btn_newComment = document.getElementById("btn_newComment");
const comments = document.getElementById("comments");
const API_Connection_Token = "13c4ae8e38567da5981106230513aecb5ae05f533c15015c0cad15f675675ef05ce8cb";

// ------------------------------------------------------------------------------
// Functions.
// ------------------------------------------------------------------------------

// ==============================================================================
// ==============================================================================
// ==============================================================================
// Fetch comments.

function fetch_comments() {
    const url = "http://onlinenotes.ml/api/token/read-private-note.php";
    let json_request = {
        token: API_Connection_Token
    };
    fetch(url, {
        body: JSON.stringify(json_request)
        , method: 'POST'
    })
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            let obj = JSON.parse(response);
            //console.log(obj);
            render_comments(obj);
        })
        .catch(function (err) {
            console.error(err);
        });
}

function render_comments(comments_input) {
    if (comments_input["status"] == "warning") {
        console.log("Status: warning");
        if (comments_input["description"] == "user does not have private notes") {
            comments.innerHTML = `
            There are not comments registered.
            `;
        }
    } else { // There are comments.
        comments.innerHTML = "";
        array_length = comments_input.length;
        let counter = 1;
        for (let i = array_length; i > 0; i--) {
            comments.innerHTML += `
            Comment #${counter}: ${comments_input[i - 1]["description"]}<br>
            `;
            counter++;
        }
    }
}

// ==============================================================================
// ==============================================================================
// ==============================================================================
// Publish comments.

btn_newComment.addEventListener("click", function () {
    if (input_newComment.value != "") { // If content written.
        publish_comment(input_newComment.value);
    }else{
        no_comment_written_alert();
    }
});

// Handles the process to publish a new comment.
function publish_comment(input_newComment_value) {
    const url = "http://onlinenotes.ml/api/token/insert-private-note.php";
    var json_request = {
        title: "JustVice.Github.io Comment",
        description: input_newComment_value,
        token: API_Connection_Token
    };
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(json_request)
    }).then(res => res.json())
        .then((response) => {
            if (response.status == "success") {
                fetch_comments();
                input_newComment.value = "";
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
function no_comment_written_alert(){
    Swal.fire({ // Modal showing no message was written.
        icon: 'error',
        title: 'Invalid comment',
        text: 'You cannot post an empty comment.'
    })
}

// ==============================================================================
// ==============================================================================
// ==============================================================================
// On startup function calls.

// Comments are loaded.
fetch_comments();
