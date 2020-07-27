$(document).ready(function () {
    var im = new ImageManager();
    var em = new EventManager();
    var sm = new SoundManager();
    var gm = new GameManager(em);

    gm.NewGame();
});