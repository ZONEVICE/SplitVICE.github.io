const status_sttled_link = "https://dl.dropboxusercontent.com/s/34rxt9edvlo0p4i/art_com_status.txt?dl=0";
const open_com_html_path = "comopen.html";
const closed_com_html_path = "comclosed.html";
const div_id = "commission_status";
var commission_value = "";


load_commission_status();
load_commissions_content();

//Loads if the txt file stored inside personal cloud says "open" or "closed"
function load_commission_status() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', status_sttled_link, false);
    xmlhttp.send();
    commission_value = xmlhttp.responseText
    console.log("Value loaded: '" + commission_value + "'");
}

//Logic to decide what commission content to choose
function load_commissions_content() {
    if (commission_value.includes("open")) {
        console.log("Commissions open");
        loadDoc(div_id, open_com_html_path);
        console.log("Commissions open settled.");
    } else {
        console.log("Commissions closed");
        loadDoc(div_id, closed_com_html_path);
        console.log("Commissions closed settled.");
    }
}

//AJAX loads the HTML content.
function loadDoc(id, path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById(id).innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
}