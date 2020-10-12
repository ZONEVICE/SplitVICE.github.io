// Function that responses HTML code and gives it to an element by id.
function AJAX(id, path) {
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function () {
      if (this.readyState == 4 && this.status == 200) {
        document.getElementById(id).innerHTML = this.responseText;
      }
    };
    xhttp.open("GET", path, true);
    xhttp.send();
  }