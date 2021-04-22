// YouTube music add to HTML pages.
// Source: 
// https://stackoverflow.com/questions/11651454/play-youtube-video-on-click-custom-button
// https://stackoverflow.com/questions/42711959/play-youtube-video-on-click

// YouTube API syntax.
var tag = document.createElement('script');
tag.src = "https://www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

let players = new Array(), // Video players 
    buttons = new Array(), // Play and stop buttons.
    checkbox_PlayMusicAutomatically = document.getElementById("checkbox_PlayMusicAutomatically");

buttons[0] = document.getElementById("btn_player0");
buttons[1] = document.getElementById("btn_player1");
buttons[2] = document.getElementById("btn_player2");
buttons[3] = document.getElementById("btn_player3");

function onYouTubeIframeAPIReady() {
    players[3] = new YT.Player('player_2021', { // 2021
        height: '1',
        width: '1',
        videoId: 'cPH53hOU4pA',
        playerVars: {
            playlist: 'cPH53hOU4pA',
            loop: 1
        }
    });
    players[0] = new YT.Player('player_2020', { // 2020
        height: '1',
        width: '1',
        videoId: 'Y_PCjw5WKpo',
        playerVars: {
            playlist: 'Y_PCjw5WKpo',
            loop: 1
        }
    });
    players[1] = new YT.Player('player_2019', { // 2019
        height: '1',
        width: '1',
        videoId: '7AqTB30d-Mc',
        playerVars: {
            playlist: '7AqTB30d-Mc',
            loop: 1
        }
    });
    players[2] = new YT.Player('player_2018', { // 2018
        height: '1',
        width: '1',
        videoId: '-rIfNR2DDt4',
        playerVars: {
            playlist: '-rIfNR2DDt4',
            loop: 1
        }
    });
}

/**
 * Plays and stops players when needed.
 * @param { integer } player_index Player index user has requested
 * to perform an action (play or stop).
 */
function video_controller(player_index) {
    if (buttons[player_index].innerHTML === "Stop music")
        stop_all_players(players.length);
    else {
        stop_all_players(players.length);
        players[player_index].playVideo();
        buttons[player_index].classList.add("btn-danger");
        buttons[player_index].classList.remove("btn-success");
        buttons[player_index].innerHTML = "Stop music";
    }
}

/**
 * Stops all players. Necessary to prevent multiple players
 * to play.
 * @param { integer } player_length Number of existing players
 * to stop them with a for loop.
 */
function stop_all_players(player_length) {
    for (let i = 0; i < player_length; i++) {
        players[i].stopVideo();
        buttons[i].classList.remove("btn-danger");
        buttons[i].classList.add("btn-success");
        buttons[i].innerHTML = "Play music";
    }
}
