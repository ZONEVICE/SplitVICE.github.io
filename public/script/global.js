// ==================================================================================================
// Global variables
// ==================================================================================================
const SERVER_HOST = null;

// ==================================================================================================
// HTML content
// ==================================================================================================

const Header = /* html */`
    <a href="/">
        <img class="header-image" src="/public/img/header-image.png" alt="split vice logo">
    </a>
    <a href="javascript:void(0)" onclick="show_hide_aside()">
        <img class="headerNavbarButtonImage" src="/public/img/navbar-button.png" width="30px" alt="navbar button">
    </a>`;

const AsideLeft = /* html */`

<div class="asideBlock">
    <div class="asideListTitle">
        Main menu
    </div>
    <ul class="asideLiStyle">
        <li><a href="/">Home</a></li>
        <li><a href="/links/">Content links</a></li>
        <li><input type="checkbox" id="checkbox_darkmode"> Dark mode</li>
    </ul>
</div>

<!--
<div class="asideBlock">
    <div class="asideListTitle">
        Blog & Insights
    </div>
    <ul class="asideLiStyle">
        <li><a href="/bi/art/">Art</a></li>
    </ul>
</div>
-->

<!-- Block: Other. -->
<div class="asideBlock">
    <div class="asideListTitle">
        Other
    </div>
    <ul class="asideLiStyle">
        <li><a href="/changelog/">Changelog</a></li>
        <li><a href="/about/">About</a></li>
    </ul>
</div>
`;

const GlobalMessage = /* html */`<div class='center' style='color:gray;font-size:23px'><i>Website domain end of life at 20 may 2024</i></div>`;

const Footer = /* html */ ``;

// ==================================================================================================
// HTML content set
// ==================================================================================================

document.getElementById('div_header').innerHTML = Header;
document.getElementById('div_aside_left').innerHTML = AsideLeft;
document.getElementById('div_global_message').innerHTML = GlobalMessage;
document.getElementById('div_footer').innerHTML = Footer;

// ==================================================================================================
// Global functions
// ==================================================================================================

function show_hide_aside() { document.getElementById("div_aside_left").classList.toggle("aside-display-small-screen"); }

// =========================================================================================================
// Dark mode
// =========================================================================================================

// ----------------------------------------------------------------------------------------
// Darkmode's main.

// Checks if localStorage variable exists. If so and 'on', sets dark mode.
if (localStorage.getItem('darkmode') != null) {
    localStorage.getItem('darkmode') == 'on' ? setDark() : setLight();
} else localStorage.setItem('darkmode', 'off');

// ----------------------------------------------------------------------------------------
// Darkmode checkbox control.
const checkbox_darkmode = document.getElementById('checkbox_darkmode');
checkbox_darkmode.checked = localStorage.getItem('darkmode') == 'on' ? true : false;
checkbox_darkmode.addEventListener('click', () => {
    toggleDarkMode();
    checkbox_darkmode.checked = localStorage.getItem('darkmode') == 'on' ? true : false;
});

// ----------------------------------------------------------------------------------------
// Functions.

// Toggles localStorage.darkmode value within 'on' or 'off'
function toggleDarkMode() {
    if (localStorage.getItem('darkmode') == 'on') {
        localStorage.setItem('darkmode', 'off');
        setLight();
    }
    else {
        localStorage.setItem('darkmode', 'on');
        setDark();
    }
}

// Sets base page style.css file to style.css .
function setLight() { document.getElementById('div_style').innerHTML = `<link rel="stylesheet" href="/public/css/style.css">`; }

// Sets base page style.css file to style.darkmode.css .
function setDark() { document.getElementById('div_style').innerHTML = `<link rel="stylesheet" href="/public/css/style.darkmode.css">`; }
