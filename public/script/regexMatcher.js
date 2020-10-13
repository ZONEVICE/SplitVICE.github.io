// This regex checks the current page route and will route the user
// to another route if match.
// currentUrl: current url and route where the user is.
// matcher: chunk of the current url to do the Regex match process.
// destinationRoute: route where the user will be redirected if regex has a match.
function regexMatcher_webpageRoutes(currentUrl, regexExpression, destinationRoute) {
    const regex = new RegExp(regexExpression, 'g');
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

// Checks if the given url is an image.
function regexMatcher_isURLAnImage(url) {
    const regex = new RegExp("/\.(jpeg|jpg|gif|png)$/", 'g');
    let m;
    while ((m = regex.exec(url)) !== null) {
        if (m.index === regex.lastIndex) {
            regex.lastIndex++;
        }
        m.forEach((match, groupIndex) => {
            return false;
        });
    }
    return true;
}

// Checks if the input_string contains an URL.
function regexMatcher_checkIfHasURL(input_string) {
    try {
        var urlRegex = /(https?:\/\/[^ ]*)/;
        var url = input_string.match(urlRegex)[1];
        return true;
    } catch (error) {
        return false;
    }
}

// Extracts URL from string. Returns the URL.
function regexMatcher_extractURL(input_string) {
    try {
        var urlRegex = /(https?:\/\/[^ ]*)/;
        var url = input_string.match(urlRegex)[1];
        return url;
    } catch (error) {
        return "No link given.";
    }
}

// Gets an input_string that contains an URL. Returns URL inside <a> tag.
function regexMatcher_convertURLIntoClickeableURL(input_string) {
    try {
        var urlRegex = /(https?:\/\/[^ ]*)/;
        str = "https://developer.mozilla.org/ degree deep https://developer.mozilla.org/";
        output = input_string.replace(urlRegex
            , `<a target="_blank" href="${input_string}">${input_string}</a>`);
        return output;
    } catch (error) {
        return "500 Error!";
    }

}
