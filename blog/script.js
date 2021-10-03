var app = new Vue({
    el: '#app',
    data: {
        blogs: undefined, // holds blog registries as an array
        sorted: false // if data has been sorted by url query
    },
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
        render_blog_by_id(id) {
            for (let i = 0; i < this.blogs.length; i++) {
                if (this.blogs[i]._id == id) {
                    const a = [this.blogs[i]];
                    this.blogs = a;
                    this.sorted = true;
                    break;
                }
            }
        },
        render_blog_by_title(title) {
            for (let i = 0; i < this.blogs.length; i++) {
                if (this.blogs[i].Title.toLowerCase() == title.toLowerCase()) {
                    const a = [this.blogs[i]];
                    this.blogs = a;
                    this.sorted = true;
                    break;
                }
            }
        },
        // resets the view of blogs by redirecting to root route so all queries are cleaned
        reset_blog_view() {
            window.location.href = "/blog/";
        },
        // Copies onto clipboard the link URL
        share_link(title) {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = encodeURI(`https://split-vice.com/blog/?title=${title}`);
            dummy.select();
            document.execCommand('copy');
            document.body.removeChild(dummy);
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
    async created() {
        await this.load_blogs();
        const params = new URLSearchParams(window.location.search)
        if (params.has('id')) { this.render_blog_by_id(params.get('id')); return; }
        if (params.has('title')) { this.render_blog_by_title(params.get('title')); return; }
    }
})
