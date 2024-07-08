const app = new Vue({
    el: '#app',
    data: { links: [] },
    methods: {},
    async created() {

        this.links.push({
            url: '/s/x/',
            name: 'X',
            description: 'Favorite social media.',
            img_src: 'https://seeklogo.com/images/T/twitter-x-logo-0339F999CF-seeklogo.com.png?v=638258077460000000',
            img_alt: 'x twitter',
            active: true
        });

        this.links.push({
            url: 'https://www.twitch.tv/ZONEVICE',
            name: 'Twitch',
            description: 'Doing streams when feeling like it.',
            img_src: 'https://dl.dropboxusercontent.com/s/2w6qs2qeg7gjonq/twitch.png?dl=0',
            img_alt: 'twitch',
            active: true
        });

        this.links.push({
            url: 'https://www.github.com/ZONEVICE',
            name: 'Github',
            description: 'Code no one cares.',
            img_src: 'https://dl.dropboxusercontent.com/scl/fi/gauotusuxg1tjpb3z8bv3/github.png?rlkey=xc43pf6y6o8lt4czfr0qiialv&st=xhg3eq1h&dl=0',
            img_alt: 'github',
            active: true
        });

    }
});
