function demo_video_click_make_bigger() {
    let width = window.innerWidth;
    let video_iframe = document.getElementById("demo_video");
    if (width > 700) {
        video_iframe.style.width = "640px";
        video_iframe.style.height = "361px";
    } else if (width < 700 && width > 487) {
        video_iframe.style.width = "440px";
        video_iframe.style.height = "261px";
    } else {
        video_iframe.style.width = "auto";
        video_iframe.style.height = "auto";
    }
}

function demo_video_click_make_smaller() {
    let video_iframe = document.getElementById("demo_video");
    video_iframe.style.width = "auto";
    video_iframe.style.height = "auto";
}