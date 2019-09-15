const headerPath = "staticHtmls/header.html";
const footerPath = "staticHtmls/footer.html";
const asidePath = "staticHtmls/aside.html";

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
