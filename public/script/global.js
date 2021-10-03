// ==================================================================================================
// Global variables
// ==================================================================================================
const SERVER_HOST =
    //'http://localhost:2300' // dev backend host
    'https://split-vice-backend.herokuapp.com'; // production backend host

// ==================================================================================================
// HTML content
// ==================================================================================================

const Header = /* html */`
    <a href="/">
        <img class="header-image" src="/public/img/header-image.png" alt="split vice logo">
    </a>
    <a href="#" onclick="show_hide_aside()">
        <img class="headerNavbarButtonImage" src="/public/img/navbar-button.png" width="30px" alt="navbar button">
    </a>
`;

// Sets blog count to blog count indicator at the AsideLeft
(async () => {
    const req = await fetch(`${SERVER_HOST}/api/blog`);
    const res = await req.json();
    document.getElementById('blog_count').innerHTML =
        res.blogs.length != undefined ? res.blogs.length : 0;
})();

const AsideLeft = /* html */`
<!-- Block: Main menu. -->
<div class="asideBlock">
    <div class="asideListTitle">
        Main menu
    </div>
    <ul class="asideLiStyle">
        <li><a href="/">Home</a></li>
        <li><span id="blog_count" class="badge bg-light text-dark"> ... </span> <a href="/blog/">Blog</a></li>
        <li><a href="/links/">Content links</a></li>
        <li><a href="/send-message/">Send a Message</a></li>
        <li><a href="/comments/">Comments</a></li>
        <li><input type="checkbox" id="checkbox_darkmode"> Dark mode</li>
    </ul>
</div>

<!-- Block: Art. -->
<div class="asideBlock">
    <div class="asideListTitle">
        Art
    </div>
    <ul class="asideLiStyle">
        <li><a href="/art/fundamentals/">Art Fundamentals</a></li>
        <li><a href="/commission/">Commission</a></li>
    </ul>
</div>

<!-- Block: technology. -->
<div class="asideBlock">
    <div class="asideListTitle">
        Technology
    </div>

    <!-- Category: No named. -->
    <ul class="asideLiStyle">
        <li> <a href="/technology/">Technology home page</a> </li>
        <li> <a href="/technology/services/aes256/">AES256 encryption</a></li>
        <li><a href="/commission/">Commission</a></li>
    </ul>
    <hr>

    <!-- Category: Web Software. -->
    <div class="ASIDE_CATEGORIES">Web Software</div>
    <ul>
        <li>
            <span class="badge bg-warning text-dark">New</span>
            <a href="/technology/web-software/bit-frisbee/">Bit Frisbee</a>
        </li>
        <li>
            <span class="badge bg-primary text-dark">Update</span>
            <a href="/technology/web-software/movies-interface/">Movies Interface</a>
        </li>
        <li> <a
                href="/technology/web-software/remote-shell/">Remote Shell</a></li>
        <li>
            <a class="" href="/technology/web-software/nodejs-email-sender/">NodeJS Email Sender</a>
        </li>
        <li>
            <a class="" href="/technology/web-software/pdf-interface/">PDF Interface</a>
        </li>
        <li>
            <a href="/technology/web-software/online-notes/">Online Notes (beta)</a>
        </li>
        <li><a href="/technology/web-software/v-webpage-s1/">V-WebPage S1</a></li>
        <li><a href="/technology/web-software/web-user-manual/">Web User Manual</a></li>
    </ul>
    <hr>

    <!-- Category: Csharp. -->
    <div class="ASIDE_CATEGORIES">C#</div>
    <ul>
        <li> <a href="/technology/CSharp/passwords-stash-lite/">Passwords Stash Lite</a></li>
        <li><a href="/technology/CSharp/shutdown-after-input/">Shutdown After Input</a></li>
    </ul>
    <hr>

    <!-- Category: Java. -->
    <div class="ASIDE_CATEGORIES">Java</div>
    <ul>
        <li> <a href="/technology/java/dossiers/">Dossiers</a></li>
        <li> <a href="/technology/java/v-aesecrypt-2/">V-AESEcrypt-2</a></li>
        <li> <a href="/technology/java/passwords-stash/">Passwords Stash</a> </li>
        <li> <a href="/technology/java/auto-save/">Auto Save</a> </li>
        <li> <a href="/technology/java/timer-shutdown/">Timer Shutdown</a> </li>
        <li> <a href="/technology/java/id-generator/">IDGenerator</a> </li>
        <li> <a href="/technology/java/text-encryptor/">Text Encryptor</a></li>
        <li><a href="/technology/java/v-chatspammer/">V-ChatSpammer</a></li>
    </ul>
    <hr>

    <!-- Category: Python. -->
    <div class="ASIDE_CATEGORIES">Python scripts</div>
    <ul>
        <li>
            <a href="/technology/python/repos-cloner-puller/">Repos Cloner & Puller</a>
        </li>
        <li><a href="/technology/python/auto-backup/">Auto Backup</a></li>
    </ul>

</div>

<!-- Block: Miscellaneous. -->
<div class="asideBlock">
    <div class="asideListTitle">
        Miscellaneous
    </div>
    <ul class="asideLiStyle">
        <li><a href="/the-junk-stash/">The junk stash</a></li>
        <li><a href="/changelog/">Changelog</a></li>
        <li><a href="/about/">About</a></li>
    </ul>
</div>
`;

const GlobalMessage = /* html */``;

const Footer = /* html */ `
    SPLIT VICE's Website. Proudly coded by hand and from scratch
`;

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
if (localStorage.getItem('darkmode')) {
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
