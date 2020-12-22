// ------------------------------------------------------------------------------------
// Commission status origin and div tag capture.
// ------------------------------------------------------------------------------------
const url = "https://gist.githubusercontent.com/JustVice/bf4ac34de3694ba401daadcb9756ac57/raw/artcomstatus.txt";
const commission_status = document.getElementById("commission_status"); // Div tag id.

// ------------------------------------------------------------------------------------
// Content to show depending of commission's status.
// ------------------------------------------------------------------------------------
const comClosed_content = `
    <div class="center h1">
        Commissions status: <span style="color:red;">CLOSED</span>
    </div>
    <p class="center">
        At this moment <b>I am not accepting commissions</b>
        <br>
        However, you can still see the instructions, terms of service, and contract versions by <a href="art/">clicking here.</a>
        <br>
        <br>
        <b>You can still commission me if you are willing to pay extras.</b>
    </p>
`;

const comOpen_content = `
    <div class="center h1">
        Commissions status: <span style="color:lightgreen;">open</span>
    </div>
    <p class="center">
        At this moment I am accepting <b>art commissions</b>. <a href="art/">Click here</a> to see the instructions, terms of service, and the commission form.
    </p>
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
