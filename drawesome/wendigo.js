const container_main_content = document.getElementById("container_main_content"),
    macGun_imgSource = "https://dl.dropboxusercontent.com/s/63awhfj57frr5vg/mac-gun.jpg?dl=0";

setInterval(() => {
    container_main_content.innerHTML =
        `<div class="embed-responsive embed-responsive-16by9">
            <img src="${macGun_imgSource}" alt="MAC GUN!" class="embed-responsive-item">
        </div>`;
}, 300000); // 5 minutes
