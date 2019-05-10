function load_friendly() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("friendly_users_content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "https://dl.dropboxusercontent.com/s/mmx9lfi1uvdjjal/Friendly-table.txt?dl=0", true);
    xhttp.send();
}

function load_mean() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("mean_users_content").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "https://dl.dropboxusercontent.com/s/4qz5n6fhs2myxmi/Mean-table.txt?dl=0", true);
    xhttp.send();
}

function load_date() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
        if (this.readyState == 4 && this.status == 200) {
            document.getElementById("date_update").innerHTML = this.responseText;
        }
    };
    xhttp.open("GET", "https://dl.dropboxusercontent.com/s/zt64evjuhr5ts22/date.txt?dl=0", true);
    xhttp.send();
}