const status_sttled_link = "https://dl.dropboxusercontent.com/s/q8kd0hrjxetcmgd/comstatus.txt?dl=0";
const div_id = "commission_status";
var com_status = "";

const COMOPEN_CONTENT = "<div class=\"center\" style=\"font-size:14px;\"><b>COMMISSIONS:</b> <b style=\"color:lightgreen;\">OPEN</b>";
const COMCLOSED_CONTENT = "<div class=\"center\" style=\"font-size:22px;\"><hr><b>COMMISSIONS:</b> <b style=\"color:red;\">CLOSED</b>"+
"<span style=\"font-size:15px;\"><p>You can still look at the commission process.<br>If you still want to commission, you must be willing to pay extras!<br>Either fill the form or send a message for more info.</p></span>";


load_commission_status();
load_commissions_content();

//Loads if the txt file stored inside personal cloud says "open" or "closed"
function load_commission_status() {
    var xmlhttp;
    xmlhttp = new XMLHttpRequest();
    xmlhttp.open('GET', status_sttled_link, false);
    xmlhttp.send();
    com_status = xmlhttp.responseText
    console.log("Loaded commission status: " + com_status);
}

//Logic to decide what commission content to choose
function load_commissions_content() {
    if (com_status == "open") {
        console.log("Commissions open");
        document.getElementById(div_id).innerHTML = COMOPEN_CONTENT;
    } else {
        console.log("Commissions closed");
        document.getElementById(div_id).innerHTML = COMCLOSED_CONTENT;
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