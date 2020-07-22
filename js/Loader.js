dynamicallyLoadScript("js/GameJS/Cards/Card.js");
dynamicallyLoadScript("js/GameJS/Cards/PersonCard.js");
dynamicallyLoadScript("js/GameJS/Cards/RoomCard.js");
dynamicallyLoadScript("js/GameJS/Cards/WeaponCard.js");
dynamicallyLoadScript("js/GameJS/Cards/Deck.js");
dynamicallyLoadScript("js/GameJS/Character.js");
dynamicallyLoadScript("js/GameJS/Board.js");
dynamicallyLoadScript("js/UserInput.js");
dynamicallyLoadScript("js/Player.js");
dynamicallyLoadScript("js/onload.js");
dynamicallyLoadScript("js/client.js");


function dynamicallyLoadScript(url) {
    var script = document.createElement("script");  // create a script DOM node
    script.src = url;  // set its src to the provided URL

    document.head.appendChild(script);  // add it to the end of the head section of the page (could change 'head' to 'body' to add it to the end of the body section instead)
}