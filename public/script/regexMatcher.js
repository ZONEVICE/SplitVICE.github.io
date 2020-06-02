// This regex checks the current page route and will route the user
// to another route.
// currentUrl: current url and route where the user is.
// matcher: chunk of the current url to do the Regex match process.
// destinationRoute: route where the user will be redirected if regex has
function regexMatcher_webpageRoutes(currentUrl, regexExpression, destinationRoute) {
    const regex = new RegExp(regexExpression,'g');
    let m;

    while ((m = regex.exec(currentUrl)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            // if entered here, there is a match.

            // User get redirected to the established route.
            window.location.href = destinationRoute;
        });
    }
}