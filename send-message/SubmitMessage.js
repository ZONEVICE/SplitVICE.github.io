// Script to send the message with NodeJS Email Sender service.
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
    if (areThereAMessage(msg)) // Checks if a message was written.
        sendMessage(msg);
    else {
        Swal.fire({ // Modal showing no message was written.
            icon: 'error',
            title: 'Invalid message',
            text: 'You cannot send an empty message.'
        })
    }
}

// Builds message to be sent. Connects to Mail backend service's API to send the message.
async function sendMessage(msg) {
    const url = serverHost + "/sendemail";

    const textMessage = // Body message content.
        `Message Type: ${msg.messageType}<br><br>
        Contact info: ${msg.contactInfo}<br><br>
        Message body: ${msg.yourMessage}<br><br>
        End of the message. \r\n
    `;

    // Entire message structure to be sent.
    const messageStructure = {
        "subject": `Message from - JUST-VICE.com - Type: ${msg.messageType}`,
        "text": "Plaintext content of the Email.",
        "html": textMessage
    }

    const request = await fetch(url, {
        method: 'POST',
        headers: { 'Accept': 'application/json', 'Content-Type': 'application/json' },
        body: JSON.stringify(messageStructure)
    });

    const response = await request.json();

    if (response.status == 'success') {
        interactiveArea.innerHTML =
            `
            <div class="alert alert-success" role="alert">
                Your message has been sent!
            </div>
            `
    } else {
        interactiveArea.innerHTML =
            `
            <div class="alert alert-danger" role="alert">
                Internal server error (ERROR 500).
            </div>
            Message written:
            ${msg.messageType}${msg.contactInfo}${msg.yourMessage}
            <br><br>
            Please, try reaching me on <a href="../s/twitter">Twitter</a>.
            `
    }
}

// ----------------------------------------------------------------------------------------
// Secondary functions.
// ----------------------------------------------------------------------------------------

// Returns string of type of message selected.
function getMessageType() {
    if (op1.checked) return "Friendly or hate message";
    if (op2.checked) return "Question";
    if (op3.checked) return "Error report";
    if (op4.checked) return "Suggestion";
    if (op5.checked) return "Commission or business enquiries";
    if (op6.checked) return "Other";
    return "Not defined.";
}

// Checks if user has written a message.
function areThereAMessage(msg) {
    return msg.yourMessage != "" ? true : false;
}
