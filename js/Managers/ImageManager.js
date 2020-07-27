class ImageManager {

    constructor() {
        this.PreloadImages();
    }

    PreloadImages() {
        this.PreloadPeopleCardImages();
        this.PreloadDiceImages();
        this.PreloadNotesImages();
        console.log("pre-loading images...");
    }

    PreloadNotesImages() {
        var img = new Image();  // -empty-
        var img2 = new Image(); // -
        var img3 = new Image(); // 2
        var img4 = new Image(); // 3
        var img5 = new Image(); // X
        img.src = 'img/notes/notesempty.png';
        img2.src = 'img/notes/notesdash.png';
        img3.src = 'img/notes/notes2.png';
        img4.src = 'img/notes/notes3.png';
        img5.src = 'img/notes/notesX.png';
    }

    PreloadDiceImages() {
        var img = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        img.src = 'img/dice/1.png';
        img2.src = 'img/dice/2.png';
        img3.src = 'img/dice/3.png';
        img4.src = 'img/dice/4.png';
        img5.src = 'img/dice/5.png';
        img6.src = 'img/dice/6.png';
    }

    PreloadPeopleCardImages() {
        var img = new Image();
        var img2 = new Image();
        var img3 = new Image();
        var img4 = new Image();
        var img5 = new Image();
        var img6 = new Image();
        img.src = 'img/people/msscarlet.png';
        img2.src = 'img/people/colmustard.png';
        img3.src = 'img/people/mrswhite.png';
        img4.src = 'img/people/mrgreen.png';
        img5.src = 'img/people/mrspeacock.png';
        img6.src = 'img/people/profplum.png';
    }
}
