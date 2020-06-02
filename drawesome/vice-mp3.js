var MP3_OBJECT = new Audio();

var MP3_URL_SETTLED = false;
var MP3_VOLUME_SETTLED = false;
var MP3_LOOP_STATE = false;

var IS_MP3_PLAYING = false;

function MP3_SET_URL(MP3_URL) {
    this.MP3_OBJECT = new Audio(MP3_URL);
    this.MP3_URL_SETTLED = true;
}

function MP3_SET_VOLUME(VOLUME) {
    this.MP3_OBJECT.volume = VOLUME;
    this.MP3_VOLUME_SETTLED = true;
}

function MP3_SET_LOOP_STATE(LOOP) {
    this.MP3_OBJECT.loop = LOOP;
    this.MP3_LOOP_STATE = true;
}

function MP3_PLAY() {
    if (this.MP3_URL_SETTLED && this.MP3_VOLUME_SETTLED && this.MP3_LOOP_STATE) {
        if(!this.IS_MP3_PLAYING){
            this.IS_MP3_PLAYING = true;
            this.MP3_OBJECT.play();
            
        }else{
            console.log("MP3 PLAYER IS ALREADY WORKING.");
        }
    }else{
        console.log("THERE ARE MISSING PARAMETERS FOR THE MP3 OBJECT.");
    }
}

function MP3_STOP(){
    if(this.IS_MP3_PLAYING){
        this.IS_MP3_PLAYING = false;
        this.MP3_OBJECT.pause();
    }else{
        console.log("MP3 PLAYER IS ALREADY STOPED.");
    }
}

function MP3_TOOGLE_PLAY_STOP_BUTTON_METHOD(){
    if(this.IS_MP3_PLAYING){
        MP3_STOP();
    }else{
        MP3_PLAY();
    }
}

/* QUICK PLAY MP3 METHOD */
function PLAY_MP3(PLAY_SONG, LOOP, VOLUME) {
    if (PLAY_SONG) {
        var MP3_URL = "https://dl.dropboxusercontent.com/s/ew5wuaqje4nibui/DOOM_MUSIC.mp3?dl=0";
        var MP3_OBJECT = new Audio(MP3_URL);
        MP3_OBJECT.loop = LOOP;
        MP3_OBJECT.volume = VOLUME;
        MP3_OBJECT.play();
    }
}