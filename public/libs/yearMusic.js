let audio = undefined
const music =
{
    2021: '',
    2020: 'http://14300f7f-b37b-4f8a-9a8d-44b0b2db05cc.gearhostpreview.com/sound/The%20Batman%20Teaser%20Trailer%20Music%20Something%20In%20The%20Way.mp3',
    2019: 'http://14300f7f-b37b-4f8a-9a8d-44b0b2db05cc.gearhostpreview.com/sound/Roundheads%20%20Crocketts%20Theme%20Jan%20Hammer%20Cover%20Chillwave.mp3',
    2018: 'http://14300f7f-b37b-4f8a-9a8d-44b0b2db05cc.gearhostpreview.com/sound/Hacknet%20OST%20Tonspender%20%20Broken%20Boy.mp3',
}

function play_music(year) {
    function stopPlaying() { if (audio != undefined) audio.stop() }

    const ACTIONS = {
        2020: () => { stopPlaying(); audio = new VICEMP3(music[2020]); audio.play() },
        2019: () => { stopPlaying(); audio = new VICEMP3(music[2019]); audio.play() },
        2018: () => { stopPlaying(); audio = new VICEMP3(music[2018], 0.5); audio.play() }
    }

    if (year === '2020') ACTIONS[2020]()
    if (year === '2019') ACTIONS[2019]()
    if (year === '2018') ACTIONS[2018]()
}
