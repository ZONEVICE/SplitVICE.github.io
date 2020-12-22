// ------------------------------------------------------------------------------------
// Commission status origin and div tag capture.
// ------------------------------------------------------------------------------------
const url = "https://gist.githubusercontent.com/JustVice/bf4ac34de3694ba401daadcb9756ac57/raw/artcomstatus.txt";
const commission_status = document.getElementById("commission_status");

// ------------------------------------------------------------------------------------
// Content to show depending of commission's status.
// ------------------------------------------------------------------------------------
const comOpen_content = `
<div class="center" style="font-size:14px;">
    <b>COMMISSIONS:</b> <b style="color:lightgreen;">OPEN</b>
</div>
`;

const comClosed_content = `
<div class="center" style="font-size:22px;">
    <hr>
    <b>COMMISSIONS:</b> <b style="color:red;">CLOSED</b>
    <span style="font-size:15px;">
        <p>
            You can still look at the commission process.
            <br>
            If you still want to commission, you must be willing to pay extras!
            <br>
            Either fill the form or <a href="/send-message">send a message</a> for more info.
        </p>
    </span>
</div>
`;

// ------------------------------------------------------------------------------------
// Loads current commission status. Sets content depending of result.
// ------------------------------------------------------------------------------------
async function loadStatus() {
    let request = await fetch(serverHost + "/api/pagesettings", {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    let response = await request.json();
    if (response[0].Settings.artCommissionStatus)
        commission_status.innerHTML = comOpen_content;
    else
        commission_status.innerHTML = comClosed_content;
}

loadStatus();