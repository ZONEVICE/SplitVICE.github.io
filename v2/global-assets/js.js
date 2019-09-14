function width_listener() {
    var win = window;
    var x = win.innerWidth || docElem.clientWidth || body.clientWidth;
    if (x < 1025) {
        document.getElementById("aside-id").style.display = "none";
    }else{
        document.getElementById("aside-id").style.display = "block";
    }
}

function show_hide_aside() {
    var value = document.getElementById("aside-id").style.display;
    if (value != "block") {
        document.getElementById("aside-id").style.display = "block";
    } else {
        document.getElementById("aside-id").style.display = "none";
    }
}