/**
 TODO
    deviantArt, Twitch, Mega
 */

const app = new Vue({
    el: '#app',
    data: {
        links: []
    },
    methods: {
        // toggles dark or light mode link images when setting changed
        toggle_link_img_src() {
            let mode = 'dark';
            localStorage.getItem('darkmode') == 'on' ? mode = 'dark' : mode = 'light';
            for (let i = 0; i < this.links.length; i++) {
                if (mode == 'dark') {
                    this.links[i].img_src = this.links[i].img_dark;
                } else {
                    this.links[i].img_src = this.links[i].img_light;
                }
            }
        }
    },
    async created() {
        this.links.push({
            url: 'https://www.twitter.com/Splitvice_',
            name: 'Twitter',
            description: 'My favorite social media',
            img_light: 'https://dl.dropboxusercontent.com/s/fe4vsa6pbeffge7/twitter.png?dl=0',
            img_dark: 'https://dl.dropboxusercontent.com/s/fe4vsa6pbeffge7/twitter.png?dl=0',
            img_alt: 'twitter link'
        });
        this.links.push({
            url: 'https://www.twitch.tv/splitvice',
            name: 'Twitch',
            description: 'Coding streamings time to time',
            img_light: 'https://dl.dropboxusercontent.com/s/2w6qs2qeg7gjonq/twitch.png?dl=0',
            img_dark: 'https://dl.dropboxusercontent.com/s/2w6qs2qeg7gjonq/twitch.png?dl=0',
            img_alt: 'twitch link'
        });

        const req = await fetch(`${SERVER_HOST}/api/data/links`);
        const res = await req.json();
        const data = JSON.parse(res.content);
        if (data.length > 0) { data.forEach(e => { this.links.push(e); }); }

        this.toggle_link_img_src();
    }
});

// calls toggle_link_img_src function when dark mode checkbox changes its value
window.addEventListener('load', () => {
    document.getElementById('checkbox_darkmode').addEventListener('change', e => {
        app.toggle_link_img_src();
    });
});