class VICEMP3 {
    constructor(mp3_path, volume, loop) {
        this.is_playing = false;

        if (mp3_path != undefined) this.Audio = new Audio(mp3_path);
        else console.warn('MP3 path not set')

        if (volume != undefined) this.Audio.volume = volume;
        else console.warn('MP3 volume not set')

        if (loop != undefined) this.Audio.loop = loop;
        else this.Audio.loop = false
    }

    play() { if (!this.is_playing) this.Audio.play(); this.is_playing = true }

    stop() { if (this.is_playing) this.Audio.pause(); this.is_playing = false }

    toggle() { this.is_playing == true ? this.stop() : this.play() }

    setVolume(volume) { this.Audio.volume = volume }
}