const contactInfo = document.getElementById("contactInfo");
const yourMessage = document.getElementById("yourMessage");
const interactiveArea = document.getElementById("interactiveArea");

const op1 = document.getElementById("op1");
const op2 = document.getElementById("op2");
const op3 = document.getElementById("op3");
const op4 = document.getElementById("op4");
const op5 = document.getElementById("op5");
const op6 = document.getElementById("op6");

function submitForm_native() {

    let messageType = getMessageType();

    const msg = {
        "contactInfo": contactInfo.value,
        "yourMessage": yourMessage.value,
        "messageType": messageType
    };
    if (areThereAMessage(msg)) {
        sendMessage(msg);
    } else {
        Swal.fire({
            icon: 'error',
            title: 'Invalid message',
            text: 'You cannot send an empty message.'
        })
    }
}

function sendMessage(msg) {
    const url = "https://vicemailer.herokuapp.com/sendemail";

    const textMessage =
        `Message Type: ${msg.messageType}<br><br>
        Contact info: ${msg.contactInfo}<br><br>
        Message body: ${msg.yourMessage}<br><br>
        End of the message. \r\n
    `;

    const messageStructure = {
        "subject": `Message from Send a Message - justvice.github.io - Type: ${msg.messageType}`,
        "text": "Plaintext content of the Email.",
        "html": textMessage
    }

    fetch(url, {
        method: 'POST',
        body: JSON.stringify(messageStructure), // data can be `string` or {object}!
        headers: {
            'Content-Type': 'application/json'
        }
    }).then(res => res.json())
        .catch((error) => {
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
        .then((response) => {
            console.log(response)
            interactiveArea.innerHTML =
                `
            <div class="alert alert-success" role="alert">
                Your message has been sent!
            </div>
            `
        });
}

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
