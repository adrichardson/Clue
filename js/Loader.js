dynamicallyLoadScript("js/Client/UI/Cards/Card.js");
dynamicallyLoadScript("js/Client/UI/Cards/PersonCard.js");
dynamicallyLoadScript("js/Client/UI/Cards/RoomCard.js");
dynamicallyLoadScript("js/Client/UI/Cards/WeaponCard.js");
dynamicallyLoadScript("js/Client/UI/Cards/TitleCard.js");
dynamicallyLoadScript("js/Client/UI/Cards/Deck.js");
dynamicallyLoadScript("js/Client/UI/Piece.js");
dynamicallyLoadScript("js/Client/UI/Board.js");
dynamicallyLoadScript("js/Client/Managers/SoundManager.js");
dynamicallyLoadScript("js/Client/Managers/ChatManager.js");
dynamicallyLoadScript("js/Client/Managers/ImageManager.js");
dynamicallyLoadScript("js/Client/Managers/EventManager.js");
dynamicallyLoadScript("js/Client/Managers/UserInput.js");
dynamicallyLoadScript("js/Client/Player.js");
dynamicallyLoadScript("js/Client/UI/Screens/SplashScreen.js");
dynamicallyLoadScript("js/Client/UI/Screens/LobbyScreen.js");
dynamicallyLoadScript("js/Client/Managers/GameManager.js");
//dynamicallyLoadScript("js/onload.js");
dynamicallyLoadScript("js/Client/ClientSession.js");
dynamicallyLoadScript("js/onload_oop.js");
dynamicallyLoadScript("js/Client/Client_oop.js");


function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}
