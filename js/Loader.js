dynamicallyLoadScript("js/UI/Cards/Card.js");
dynamicallyLoadScript("js/UI/Cards/PersonCard.js");
dynamicallyLoadScript("js/UI/Cards/RoomCard.js");
dynamicallyLoadScript("js/UI/Cards/WeaponCard.js");
dynamicallyLoadScript("js/UI/Cards/TitleCard.js");
dynamicallyLoadScript("js/UI/Cards/Deck.js");
dynamicallyLoadScript("js/UI/Piece.js");
dynamicallyLoadScript("js/UI/Board.js");
dynamicallyLoadScript("js/Managers/SoundManager.js");
dynamicallyLoadScript("js/Managers/ImageManager.js");
dynamicallyLoadScript("js/Managers/EventManager.js");
dynamicallyLoadScript("js/Managers/UserInput.js");
dynamicallyLoadScript("js/Player.js");
dynamicallyLoadScript("js/UI/Screens/SplashScreen.js");
dynamicallyLoadScript("js/Managers/GameManager.js");
//dynamicallyLoadScript("js/onload.js");
dynamicallyLoadScript("js/onload_oop.js");
dynamicallyLoadScript("js/client.js");


function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
