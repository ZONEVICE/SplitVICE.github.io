const sendMessageForm_wordpress = document.getElementById("sendMessageForm_wordpress");
const sendMessageForm_native = document.getElementById("sendMessageForm_native");
const loadSpinner = document.getElementById("loadSpinner");

sendMessageForm_wordpress.style.display = "none";
sendMessageForm_native.style.display = "none";

function main() {

    const url = "https://vicemailer.herokuapp.com/sendemail";

    fetch(url)
        .then(function (response) {
            return response.text();
        })
        .then(function (response) {
            let obj = JSON.parse(response);
            if (obj.status) {
                if (obj.status == "up") {
                    console.log("NodeJS Email Sender's service is up.");
                    sendMessageForm_native.style.display = "inline";
                    loadSpinner.style.display = "none";
                } else {
                    sendMessageForm_wordpress.style.display = "inline";
                    loadSpinner.style.display = "none";
                }
            } else {
                sendMessageForm_wordpress.style.display = "inline";
                loadSpinner.style.display = "none";
            }
        })
        .catch(function (err) {
            console.error(err);
        });
}

function showWordpressForm() {
    sendMessageForm_native.style.display = "none";
    loadSpinner.style.display = "none";
    sendMessageForm_wordpress.style.display = "inline";
}

main();