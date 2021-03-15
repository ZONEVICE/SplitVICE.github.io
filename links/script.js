async function load_settings() {
    let request = await fetch(serverHost + '/api/pagesettings', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const response = await request.json();
    response[0].Settings.showNSFWLinks == true ? nsfwLinks_show() : nsfwLinks_hide();
};

function nsfwLinks_hide(){
    document.getElementById('nsfw_links').classList.add('invisible');
};

function nsfwLinks_show(){
    document.getElementById('nsfw_links').classList.remove('invisible');
};

load_settings();