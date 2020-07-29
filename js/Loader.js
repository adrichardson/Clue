const scripts = [
    "js/Client/InitialSocketConnector.js",
    "js/Client/Client_oop.js",
    "js/Client/UI/Cards/Card.js",
    "js/Client/UI/Cards/PersonCard.js",
    "js/Client/UI/Cards/RoomCard.js",
    "js/Client/UI/Cards/WeaponCard.js",
    "js/Client/UI/Cards/TitleCard.js",
    "js/Client/UI/Cards/Deck.js",
    "js/Client/UI/Piece.js",
    "js/Client/UI/Board.js",
    "js/Client/Managers/SoundManager.js",
    "js/Client/Managers/ChatManager.js",
    "js/Client/Managers/ImageManager.js",
    "js/Client/Managers/EventManager.js",
    "js/Client/Managers/UserInput.js",
    "js/Client/Player.js",
    "js/Client/UI/Screens/SplashScreen.js",
    "js/Client/UI/Screens/LobbyScreen.js",
    "js/Client/Managers/GameManager.js",
    "js/Client/ClientSession.js",
    "js/onload_oop.js"
];

const tasks = scripts[Symbol.iterator]();

function addScript(url) {
    return new Promise((resolve, reject) => {
        var script = document.createElement("script")
        //script.type = "text/javascript";
        script.onload = function () {
            console.log(`Downloaded (${url})`);
            resolve(1);
        };

        script.src = url;
        document.getElementsByTagName("head")[0].appendChild(script);
    });
}

function addAllScripts(callback) {
    const url = tasks.next().value;
    if (url) {
        addScript(url).then(() => { addAllScripts(callback); });
    } else {
        callback();
    }
};

addAllScripts(() => {
    console.log("Scripts Loaded");
});