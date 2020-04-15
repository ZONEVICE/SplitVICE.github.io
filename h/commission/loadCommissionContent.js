const STATUS = "https://dl.dropboxusercontent.com/s/34rxt9edvlo0p4i/art_com_status.txt?dl=0";
const COM_OPEN_HTML_PATH = "comopen.html";
const COM_CLOSED_HTML_PATH = "comclosed.html";
const DIV_ID = "commission_status";
var commission_value = "";


load_commission_status();
load_commissions_content();

//Loads if the txt file stored inside personal cloud says "open" or "closed"
function load_commission_status() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', STATUS, false);
    xmlhttp.send();
    commission_value = xmlhttp.responseText
    console.log("Value loaded: '" + commission_value + "'");
}

//Logic to decide what commission content to choose
function load_commissions_content() {
    if (commission_value.includes("open")) {
        console.log("Commissions open");
        AJAX(DIV_ID, COM_OPEN_HTML_PATH);
        console.log("Commissions open settled.");
    } else {
        console.log("Commissions closed");
        AJAX(DIV_ID, COM_CLOSED_HTML_PATH);
        console.log("Commissions closed settled.");
    }
}