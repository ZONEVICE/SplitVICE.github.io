const serverHost = 'https://justvice-github-io-backend.herokuapp.com';

/**
 * =========================================================================================================
 * Dark mode.
 * =========================================================================================================
 */

// ----------------------------------------------------------------------------------------
// Darkmode's main.

// Checks if localStorage variable exists. If so and 'on', sets dark mode.
if (localStorage.getItem('darkmode')) { // Exists.
    if (localStorage.getItem('darkmode') == 'on') {
        setDark();
    }
} else {
    localStorage.setItem('darkmode', 'off');
}

// ----------------------------------------------------------------------------------------
// Darkmode checkbox control.

// Checkbox control to toggle dark and light mode.
let checkbox_darkmode = undefined;
function loadCheckboxControl() {
    try {
        checkbox_darkmode = document.getElementById('checkbox_darkmode');
        const setCheckboxChecked = () => { // Sets checkbox checked or unchecked.
            checkbox_darkmode.checked = localStorage.getItem('darkmode') == 'on' ? true : false;
        };
        setCheckboxChecked();
        checkbox_darkmode.addEventListener('click', () => { // Event when checkbox is clicked.
            toggleDarkMode();
            setCheckboxChecked();
        });
    } catch (error) {
        setTimeout(() => {
            loadCheckboxControl();
        }, 500);
    }
}
window.onload = () => {
    loadCheckboxControl();
}

// ----------------------------------------------------------------------------------------
// Functions.

// Toggles localStorage.darkmode value within 'on' or 'off'. String value.
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
function setLight() {
    document.getElementById('pagestyle').setAttribute('href', '/public/css/style.css');
}

// Sets base page style.css file to style.darkmode.css .
function setDark() {
    document.getElementById('pagestyle').setAttribute('href', '/public/css/style.darkmode.css');
}
