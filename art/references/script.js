// Checkbox and div with link capture.
const link_ReferencesFolder = document.getElementById("link_ReferencesFolder");
const checkBox_verifyAge = document.getElementById("checkBox_verifyAge");

// By default the link to references folder will be hidden.
link_ReferencesFolder.style.display = "none";

// Code to execute when checkbox value changes.
checkBox_verifyAge.addEventListener("change", function(){
    let status = checkBox_verifyAge.checked;
    showHide_linkReferencesfolder(status);
});

/**
 * Shows or hides the div container of the References Folder url.
 * @param {Boolean} status Controller of the div style display.
 */
function showHide_linkReferencesfolder(status){
    if(status){
        link_ReferencesFolder.style.display = "inline";
    }else{
        link_ReferencesFolder.style.display = "none";
    }
}