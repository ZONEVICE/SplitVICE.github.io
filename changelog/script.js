function build(){
    let constructor = ''
    records.forEach(e => {
        constructor +=
        `
        <span class="changelog-title">${e.title}</span>
        <br>
        <span class="changelog-description">${e.desc}</span>
        <br><br>
        `
    })
    document.getElementById('content').innerHTML = constructor
}
const records =
    [
        {
            title: "2021/05/21 - v1.2.1",
            desc: `- SPLIT Patch:<br>
            - Several inner code has been improved.<br>
            - Website visual components are now loaded using JavaScript. No more AJAX.<br>
            - SEO improved on most pages.<br>
            - Now dark style is the default style.<br>
            - Dark mode bugs fixed.<br>
            - Art log 2018 image fixed.<br>
            - Head tags content updated and improved in most pages.<br>
            - Some grammar mistakes fixed.<br>
            - Redirection links updated.<br>
            - Several unused .html, .txt, and .js files deleted.`,
        },
        {
            title: "2021/05/06 - v1.2.0",
            desc: `- <a href="/blog/">Blogs</a> section added.`,
        },
        {
            title: "2021/04/26 - v1.1.0",
            desc: `- <a href="/technology/java/dossiers/">Dossiers</a> application added to Java software collection.`,
        },
        {
            title: "2021/04/18 - v1.0.0",
            desc: `- <a href="/comments/">Comments</a> section renovated.`,
        },
        {
            title: "2021/04/02",
            desc: `- <a href="/technology/web-software/remote-shell/">Remote Shell</a> web software launched.`,
        },
        {
            title: "2021/01/08 - V0.4.0",
            desc: `- Darkmode added.`,
        },
        {
            title: "2021/01/07",
            desc: `- Domain was bought and applied.`,
        },
        {
            title: "2021/01/05 - V0.3.0",
            desc: `- <a href="../technology/java/v-aesecrypt-2/">V-AESEcrypt-2</a> Java program added to program
            collection.`,
        },
        {
            title: "2020/12/21 - V0.1.0",
            desc: `- <a href="../aes256/">AES256</a> online encryption service added.
            <br>
            - Page version for the first time added.`,
        },
        {
            title: "2020/11/11",
            desc: `- <a href="../art/log/">Art log</a> section page has been added.`,
        },
        {
            title: "2020/10/08",
            desc: `- <a href="../comments/">Comments</a> section page has been added.`,
        },
        {
            title: "2020/09/16",
            desc: `- Python script Repositories Cloner & Puller was added to Python scripts collection.`,
        },
        {
            title: "2020/09/14",
            desc: `- NodeJS Email Sender web software added to Web Software's software collection.`,
        },
        {
            title: "2020/09/13",
            desc: `- Art Fundamentals page section has been created.`,
        },
        {
            title: "2020/09/07",
            desc: `- PDF Interface website software added to Web Software software collection.`,
        },
        {
            title: "2020/06/22",
            desc: `- Web User Manual HTML, CSS, Javascript web software added to Web Software software collection.`,
        },
        {
            title: "2020/06/07",
            desc: `- Movies Interface web software added to Web Software software collection.`,
        },
        {
            title: "2020/06/02",
            desc: `- URL routes changed. The “h” preceded by the actual route was removed.
            Example: SPLITVICE.github.io/h/links is now SPLITVICE.github.io/links`,
        },
        {
            title: "2020/05/16",
            desc: `- Some other inner code changes regarding Github Gists.`,
        },
        {
            title: "2020/04/23",
            desc: `- Clipboard board retired from program being developed. ElectronJS category and Shortcut Box program wip added.`,
        },
        {
            title: "2020/04/14",
            desc: `- Inner web page code changes and improvements. Home page’s animation removed.`,
        },
        {
            title: "2020/03/22",
            desc: `- Art Commission main page optimized (Google Forms form. Page minimized).`,
        },
        {
            title: "2020/03/16",
            desc: `- Passwords Stash Lite. C# program release. Added to C# programs collection.
            <br>
            - The Junk Stash - Videos page added.`,
        },
        {
            title: "2020/03/02",
            desc: `- V-ChatSpammer retired from public access.`,
        },
        {
            title: "2020/02/22",
            desc: `- Inner web page code changes and improvements.`,
        },
        {
            title: "2020/02/20",
            desc: `- AutoBackup release (Python script program).`,
        },
        {
            title: "2020/02/18",
            desc: `- Python page added.
            <br>
            - AutoBackup clickable links added to home and technology pages.`,
        },
        {
            title: "2020/02/13",
            desc: `- Passwords Stash Lite page grammar fixes and info added.`,
        },
        {
            title: "2020/02/09",
            desc: `- AutoSave 1.3: CTRL + A save option fixed, CTRL + Shift + S added.`,
        },
        {
            title: "2020/02/04",
            desc: `- About Me page was renamed to About.
            <br>
            - Credits page was deleted. All its content was transferred to the About page.
            <br>
            - Subtle changes in page design: About page, home page (About page description).
            <br>
            - Some inner code documentation changes (dev_notes.txt file).
            <br>
            - Grammar fixes: (About page).`,
        },
        {
            title: "2020/01/26",
            desc: `
            - Clipboard Board page is now accessible from the Technology homepage.
            <br>
            - Passwords Stash Lite page added.
            <br>
            - Clipboard Board page edits: placeholder description, img, and some minor text changes.
            <br>
            - Passwords Stash adds: disclaimer note added, description details, grammar mistakes.
            `,
        },
        {
            title: "2020/01/22",
            desc: `
            - Grammar fixes: V-ChatSpammer page.
            <br>
            - Changes on colors: background, breadcrumbs, and aside.
            <br>
            - Design changes: Aside Technology categories.
            <br>
            - Inner code changes (CSS file name changed).
            <br>
            - Animations added: Home page.
            <br>
            - Credits sources added: CSSGradient and AnimmateCSS.
            `,
        },
        {
            title: "2020/01/20",
            desc: `
            - Changelog page added.
            <br>
            - Grammar fixes on pages (Passwords Stash, V-WebPage S1, Credits, Technology, Aside)
            <br>
            - Home page changes and fixes (reduced description on technology and miscellaneous sections; Credits
            clickable link added; VICE’s Archive size changed; Changelog clickable link added)
            <br>
            - Art commission page content added (important note: some commissions order could be sent to spam
            inbox).
            `,
        },
        {
            title: "2020/01/19",
            desc: `
            - V-ChatSpammer page added.
            <br>
            - Credits page added.
            `,
        },
        {
            title: "2019/03/17 - 2020/01/18",
            desc: "- A lot of changes.",
        },
        {
            title: "2019/03/16",
            desc: "- SPLITVICE.github.io was born.",
        },
    ]
build()