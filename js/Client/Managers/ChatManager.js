class ChatManager {

    constructor(){
        this.HandleClientMessages();
    }

    HandleClientMessages() {
        var selectedCharacter = { name: 'Spectator', color: "#000000" };
        $("#sendbox").keydown(function (key) {
            if (key.which == 13) { //enter
                var msg = $("#sendbox").val();
                var user = socket.username;
                Player.prototype.sendMessage(user, msg, selectedCharacter.color, selectedCharacter.name);
            }
        });
    }
}