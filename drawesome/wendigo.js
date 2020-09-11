const mainContent = document.getElementById("mainContent"); // All displayable content of this route.
const macGun_imgSource = "https://dl.dropboxusercontent.com/s/63awhfj57frr5vg/mac-gun.jpg?dl=0"; // Mac gun image.

// Timer before showing Mac Gun image.
setInterval(() => {
    mainContent.innerHTML =
        `<div class="embed-responsive embed-responsive-16by9">
            <img src="${macGun_imgSource}" alt="MAC GUN!" class="embed-responsive-item">
        </div>
`;
}, 300000); // Amount of milliseconds before showing Mac Gun. Default: 5 minutes -> 300000
