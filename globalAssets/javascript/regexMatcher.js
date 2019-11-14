function regexMatcher_links_page(url){
    const regex = /links/gm;
    let m;
    
    while ((m = regex.exec(url)) !== null) {
        // This is necessary to avoid infinite loops with zero-width matches
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        
        // The result can be accessed through the `m`-variable.
        m.forEach((match, groupIndex) => {
            var url = "/h/links/";
    window.location.href = url;
        });
    }
}



