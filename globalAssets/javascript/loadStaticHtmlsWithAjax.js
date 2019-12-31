/* HTML FILES PATHS */
const headerPath = "/staticHtmls/header.html";
const footerPath = "/staticHtmls/footer.html";
const asidePath = "/staticHtmls/aside.html";
const MESSAGE_TO_ALL_PAGES_PATH = "/staticHtmls/messageToAllPages.html";

/* LOADS THE HEADER WITH AJAX */
function loadHeaderWithAjax() {
  AJAX("headerContentAjaxId",headerPath);
}

/* LOADS THE FOOTER WITH AJAX */
function loadFooterWithAjax() {
  AJAX("footerContentAjaxId",footerPath);
}

/* LOADS THE ASIDE WITH AJAX */
function loadAsideWithAjax() {
  AJAX("asideContentAjaxId",asidePath);
}

/* LOADS A MESSAGE THAT WILL BE DISPLAYED ON ALL PAGES WITH AJAX */
function loadMessageToAllPages() {
  AJAX("MESSAGE_TO_ALL_PAGES",MESSAGE_TO_ALL_PAGES_PATH);
}

/* AJAX METHOD */
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