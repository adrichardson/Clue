class SoundManager {

    constructor() {

        this.Initialize();
        console.log("initializing sound manager...");
    }

    Initialize() {
        var audioPath = "music/";
        var sounds = [
            { id: "Music", src: "backgroundmusic.mp3" },
            { id: "Select Music", src: "charselectmusic.mp3" },
            { id: "Victory Music", src: "victory.mp3" }
        ];
        createjs.Sound.alternateExtensions = ["mp3"];
        createjs.Sound.addEventListener("fileload", this.playMusic);
        createjs.Sound.registerSounds(sounds, audioPath);
        createjs.Sound.alternateExtensions = ["mp3"];
    }

    PlayMusic(event) {
        if (event.src == "music/charselectmusic.mp3") {
            selectmusic = createjs.Sound.play(event.src, { loop: -1, volume: 0.5 });
        } else if (event.src == "music/backgroundmusic.mp3") {
            music = createjs.Sound.play(event.src, { loop: -1, volume: 0.5 });
            music.stop();
        } else {
            victorymusic = createjs.Sound.play(event.src, { loop: -1, volume: 0.5 });
            victorymusic.stop();
        }
    }
}