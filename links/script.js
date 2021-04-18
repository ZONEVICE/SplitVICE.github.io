async function load_settings() {
    let request = await fetch(serverHost + '/api/WebSiteSettings', {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });
    const settings = await request.json();
    settings.ShowNSFWLinks == true ? nsfwLinks_show() : nsfwLinks_hide();
};

function nsfwLinks_hide(){
    document.getElementById('nsfw_links').classList.add('invisible');
};

function nsfwLinks_show(){
    document.getElementById('nsfw_links').classList.remove('invisible');
};

load_settings();