function loadHTML() {
    document.getElementById("headerId").innerHTML = "<a href=\"#\">"
        + "<img class=\"header-img\" src=\"global-assets/img/header-img.png\" width=\"100px\" alt=\"missing logo!\">"
        + "</a>"
        + "<a href=\"#\" onclick=\"show_hide_aside()\">"
        + "<img class=\"navbar-button\" src=\"global-assets/img/nav-button.png\" width=\"30px\" alt=\"Missing navbar button!\">"
        + "</a>";
}