/* HTML FILES PATHS */
const HEADER_PATH = "/public/html/header.html";
const FOOTER_PATH = "/public/html/footer.html";
const ASIDE_PATH = "/public/html/aside.html";
const MESSAGE_TO_ALL_PAGES_PATH = "/public/html/messageToAllPages.html";

/* LOADS THE HEADER WITH AJAX */
function load_header() {
  AJAX("header_content_id", HEADER_PATH);
}

/* LOADS THE FOOTER WITH AJAX */
function load_footer() {
  AJAX("footer_content_id", FOOTER_PATH);
}

/* LOADS THE ASIDE WITH AJAX */
function load_aside() {
  AJAX("aside_content_id", ASIDE_PATH);
}

/* LOADS A MESSAGE THAT WILL BE DISPLAYED ON ALL PAGES WITH AJAX */
function load_messageToAllPages() {
  AJAX("message_to_all_pages_content_id", MESSAGE_TO_ALL_PAGES_PATH);
}