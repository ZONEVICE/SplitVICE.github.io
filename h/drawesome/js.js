function PLAY_MP3(loop) {
    var mp3 = new Audio('cj.mp3');
    mp3.loop = loop;
    mp3.play();
}