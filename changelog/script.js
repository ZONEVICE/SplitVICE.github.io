function load_changeLogContent() {
    const contentDiv_id = "changeLogDivContent_id";
    const contentULR = `https://gist.githubusercontent.com/JustVice/20af968f5c874cbdf605291145bf9295/raw/changelog.html`;
    AJAX(contentDiv_id, contentULR);
}