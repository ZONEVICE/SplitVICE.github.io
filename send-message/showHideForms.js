// ----------------------------------------------------------------------------------------
// DOM elements capture.
// ----------------------------------------------------------------------------------------
const sendMessageForm_native = document.getElementById("sendMessageForm_native");
const interactiveArea = document.getElementById("interactiveArea");
const loadSpinner = document.getElementById("loadSpinner");

// ----------------------------------------------------------------------------------------
// Initial page config.
// ----------------------------------------------------------------------------------------
sendMessageForm_native.style.display = "none";

// ----------------------------------------------------------------------------------------
// Functions
// ----------------------------------------------------------------------------------------
// Checks if the mail backend is up. If so, shows the form to send the message.
function checkBackendStatus() {
    const url = "https://vicemailer.herokuapp.com/sendemail";

    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .catch(function (err) { // If fetching failed, an error is shown.
            if (err == "TypeError: Failed to fetch") {
                errorFailedToFetch();
            }
        })
        .then(function (response) { // Response got.
            let obj = JSON.parse(response);
            if (obj.status) {
                if (obj.status == "up") { // Service is available and working.
                    console.log("NodeJS Email Sender's service is up.");
                    sendMessageForm_native.style.display = "inline";
                    loadSpinner.style.display = "none";
                } else { // Service is unavailable.
                    errorFailedToFetch();
                }
            } else { // Service is unavailable.
                errorFailedToFetch();
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

// Function is called.
checkBackendStatus();

// ----------------------------------------------------------------------------------------
// Secondary functions.
// ----------------------------------------------------------------------------------------
// Shows an error if email service couldn't be reached for some reason.
function errorFailedToFetch() {
    interactiveArea.innerHTML = `
        <div class="alert alert-danger" role="alert">
            <div class="h6">Service unavailable</div>
            <hr>
            <p>The email delivery service is unavailable at this moment. Try reaching me out on <a target="_blank" href="/s/twitter">Twitter.</a></p>
        </div>
    `;
}