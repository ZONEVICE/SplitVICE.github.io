function countDown(secs, elem) {
    var element = document.getElementById(elem);
    /* element.innerHTML = "Please wait for " + secs + " seconds"; */
    if (secs < 1) {
        clearTimeout(timer);
        element.innerHTML = "<img src='assets/wendy.jpg' alt='Missing image' width='300' height='200'>";
    }
    secs--;
    var timer = setTimeout('countDown(' + secs + ',"' + elem + '")', 1000);
}