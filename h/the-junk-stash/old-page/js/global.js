function load_header() {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById("header_content").innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", "/ajax/header.txt", true);
    xhttp.send();
  }