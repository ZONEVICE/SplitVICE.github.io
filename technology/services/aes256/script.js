/**
 * ==================================================================================
 * DOM elements capture.
 * ==================================================================================
 */
const input_1 = document.getElementById("input_1");
const input_2 = document.getElementById("input_2");
const key = document.getElementById("key");
const btn_input1 = document.getElementById("btn_input1");
const btn_input2 = document.getElementById("btn_input2");
const btn_input1_copyClipboard = document.getElementById("btn_input1_copyClipboard");
const btn_input2_copyClipboard = document.getElementById("btn_input2_copyClipboard");
const aes256Content = document.getElementById("aes256Content");

/**
 * ==================================================================================
 * MAIN
 */
checkServiceUp();

// Checks if backend service is up.
async function checkServiceUp() {
    try {
        let request = await fetch(serverHost + "/api/isup", {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        let response = await request.json();
        if (response.status == "up") {
            console.log("Server OK");
        } else {
            serviceNotAvailable_renderHTMLError();
        }
    } catch (error) {
        if (error == "TypeError: Failed to fetch") {
            console.log("Server unreachable");
            serviceNotAvailable_renderHTMLError();
        }
    }
}

/**
 * ==================================================================================
 */

/**
 * ==================================================================================
 * Event listener declarations.
 * ==================================================================================
 */
btn_input1.addEventListener("click", () => {
    if (checkRequiresParams_ToEncrypt())
        encrypt();
});

btn_input2.addEventListener("click", () => {
    if (checkRequiresParams_ToDecrypt())
        decrypt();
});

btn_input1_copyClipboard.addEventListener("click", () => {
    if (input_1.value != "")
        copy_text_to_clipboard(input_1.value);
});

btn_input2_copyClipboard.addEventListener("click", () => {
    if (input_2.value != "")
        copy_text_to_clipboard(input_2.value);
});

/**
 * ==================================================================================
 * Logic
 */
async function encrypt() {
    try {
        const request = await fetch(serverHost + "/api/aes256service/encrypt", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    key: key.value,
                    plaintext: input_1.value
                }
            )
        });
        const response = await request.json();
        input_2.value = response;
    } catch (error) {
        serviceNotAvailable_renderHTMLError();
    }
}

async function decrypt() {
    try {
        const request = await fetch(serverHost + "/api/aes256service/decrypt", {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    key: key.value,
                    plaintext: input_2.value
                }
            )
        });
        const response = await request.json();
        console.log(response)
        input_1.value = response;
    } catch (error) {
        serviceNotAvailable_renderHTMLError();
    }
}

/**
 * ==================================================================================
 * Helper functions.
 */

function checkRequiresParams_ToEncrypt() {
    return input_1.value != "" && key.value != ""
}

function checkRequiresParams_ToDecrypt() {
    return input_2.value != "" && key.value != ""
}

/**
 * Copies into user's clipboard text.
 * @param { String } text_to_copy The text to copy into user's clipboard.
 */
function copy_text_to_clipboard(text_to_copy) {
    var dummy = document.createElement("textarea");
    document.body.appendChild(dummy);
    dummy.value = text_to_copy;
    dummy.select();
    document.execCommand("copy");
    document.body.removeChild(dummy);
    message_posted_alert();
}

/**
 * ==================================================================================
 * --- SweetAlert 2 functions.
 */

// Shows a message alert when copy to clipboard button was pressed.
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
        title: 'Copied to clipboard'
    })
}

/**
 * ==================================================================================
 * Displayable error functions
 */

// If service is not available, error is rendered in HTML.
function serviceNotAvailable_renderHTMLError() {
    aes256Content.innerHTML = `
    <div class="alert alert-danger" role="alert">
        Error 503 - Service unavailable. Sorry about that! Report here: <a href="../../../send-message">Send a message</a>
    </div>
    `;
}