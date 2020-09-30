// This script is the responsible of sending the message.

// ----------------------------------------------------------------------------------------
// DOM elements capture.
// ----------------------------------------------------------------------------------------
const contactInfo = document.getElementById("contactInfo");
const yourMessage = document.getElementById("yourMessage");

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const op5 = document.getElementById("op5");
const op6 = document.getElementById("op6");

// ----------------------------------------------------------------------------------------
// Primary functions.
// ----------------------------------------------------------------------------------------

// Checks if user has written down a valid message. If so, sends the message.
function submitForm_native() {
    let messageType = getMessageType();

    const msg = {
        "contactInfo": contactInfo.value,
        "yourMessage": yourMessage.value,
        "messageType": messageType
    };
    if (areThereAMessage(msg)) { // Checks if a message was written.
        sendMessage(msg);
    } else {
        Swal.fire({ // Modal showing no message was written.
            icon: 'error',
            title: 'Invalid message',
            text: 'You cannot send an empty message.'
        })
    }
}

// Builds message to be sent. Connects to Mail backend service's API to send the message.
function sendMessage(msg) {
    const url = "https://vicemailer.herokuapp.com/sendemail"; // Mail backend service API url.

    const textMessage = // Body message content.
        `Message Type: ${msg.messageType}<br><br>
        Contact info: ${msg.contactInfo}<br><br>
        Message body: ${msg.yourMessage}<br><br>
        End of the message. \r\n
    `;

    // Entire message structure to be sent.
    const messageStructure = {
        "subject": `Message from Send a Message - justvice.github.io - Type: ${msg.messageType}`,
        "text": "Plaintext content of the Email.",
        "html": textMessage
    }

    // API connection.
    fetch(url, {
        method: 'POST',
        body: JSON.stringify(messageStructure), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => { // If error occurred, message is displayed notifying so.
            console.error('Error:', error)
            interactiveArea.innerHTML =
                `
                <div class="alert alert-danger" role="alert">
                    An internal server error has happened! Sorry about that!.
                </div>
                Here's the message you wrote:
                ${msg.messageType}${msg.contactInfo}${msg.yourMessage}
                <br><br>
                Please, try it again with the Wordpress form.<br>
                If that does not work either, try reaching me on Twitter.
                `
            sendMessageForm_wordpress.style.display = "inline";
        })
        .then((response) => { // If message sent, success message is displayed.
            console.log(response)
            interactiveArea.innerHTML =
                `
            <div class="alert alert-success" role="alert">
                Your message has been sent!
            </div>
            `
        });
}

// ----------------------------------------------------------------------------------------
// Secondary functions.
// ----------------------------------------------------------------------------------------

// Returns string of type of message selected.
function getMessageType() {
    if (op1.checked) {
        return "Friendly or hate message";
    }
    if (op2.checked) {
        return "Question";
    }
    if (op3.checked) {
        return "Error report";
    }
    if (op4.checked) {
        return "Suggestion";
    }
    if (op5.checked) {
        return "Commission or business enquiries";
    }
    if (op6.checked) {
        return "Other";
    }
    return "Not defined.";
}

// Checks if user has written a message.
function areThereAMessage(msg) {
    if (msg.yourMessage != "") {
        return true;
    }
    return false;
}
