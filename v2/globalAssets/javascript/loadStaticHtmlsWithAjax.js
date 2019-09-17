/* HTML FILES PATHS */
const headerPath = "/v2/staticHtmls/header.html";
const footerPath = "/v2/staticHtmls/footer.html";
const asidePath = "/v2/staticHtmls/aside.html";

/* LOADS THE HEADER WITH AJAX */
function loadHeaderWithAjax() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("headerContentAjaxId").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", headerPath, true);
  xhttp.send();
}

/* LOADS THE FOOTER WITH AJAX */
function loadFooterWithAjax() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("footerContentAjaxId").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", footerPath, true);
  xhttp.send();
}

/* LOADS THE ASIDE WITH AJAX */
function loadAsideWithAjax() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      document.getElementById("asideContentAjaxId").innerHTML = this.responseText;
    }
  };
  xhttp.open("GET", asidePath, true);
  xhttp.send();
}
