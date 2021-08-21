var app = new Vue({
    el: '#app',
    data: { blogs: undefined },
    methods: {
        async load_blogs() {
            const req = await fetch(`${SERVER_HOST}/api/blog`);
            const res = await req.json();
            if (res.status == 'success' && res.description == 'blogs retrieved')
                this.blogs = res.blogs.reverse();
            else
                this.blogs = undefined;
        },
        // Uses moment.js to render formatted date
        render_date(date) {
            return moment(date).format('MMMM DD, YYYY')
        },
        linkify(inputText) {
            // Source: https://stackoverflow.com/questions/49634850/javascript-convert-plain-text-links-to-clickable-links
            // Version 1.0
            let replacedText, replacePattern1, replacePattern2, replacePattern3, replacePattern4;

            //URLs starting with http://, https://, or ftp://
            replacePattern1 = /(\b(https?|ftp):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/gim;
            replacedText = inputText.replace(replacePattern1, '<a href="$1" target="_blank">$1</a>');

            //URLs starting with "www." (without // before it, or it'd re-link the ones done above).
            replacePattern2 = /(^|[^\/])(www\.[\S]+(\b|$))/gim;
            replacedText = replacedText.replace(replacePattern2, '$1<a href="http://$2" target="_blank">$2</a>');

            //Change email addresses to mailto:: links.
            replacePattern3 = /(([a-zA-Z0-9\-\_\.])+@[a-zA-Z\_]+?(\.[a-zA-Z]{2,6})+)/gim;
            replacedText = replacedText.replace(replacePattern3, '<a href="mailto:$1">$1</a>');

            //Change img addresses to <img> tag.
            replacePattern4 = /(?<=>)(https?:\/\/\S+(?:png|jpe?g|gif)[^<]*)/g;
            replacedText = replacedText.replace(replacePattern4, '<img src="$1" class="blog-img">');

            return replacedText;
        }
    },
    created() {
        this.load_blogs();
    }
})
