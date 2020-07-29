class EventManager {

    constructor() {

        this.Initialize();
    }

    Initialize() {

        this.HandleSplashScreenEvents();
        this.HandleLobbyScreenEvents();
        console.log("setting up event listener...");
    }

    HandleSplashScreenEvents(em) {

        //splash screen username
        $(document).on('keydown', '#usernamebox', function (key) {
            if (key.which == 13) { //enter
                UserInput.prototype.EnterUsername();
            }
        });

        //splash screen password
        $(document).on('keydown', '#passwordbox', function (key) {
            if (key.which == 13) { //enter
                UserInput.prototype.EnterUsername();
            }
        });

        //splash screen login button
        $(document).on('click', '#loginbtn', function (e) {
            UserInput.prototype.EnterUsername();
        });
    }

    HandleLobbyScreenEvents(em) {

        //lobby screen create button
        $(document).on('click', '#newgamebtn', function (e) {
            socket.emit('creategame', socket.sessobj.name);
        });

        $(document).on('click', '#joingamebtn', function (e) {
            console.log(e.target);
            console.log(e.target.gameID);
            socket.emit('join_game', { id: e.target.gameID});
        });

        $(document).on('click', '#deletegamebtn', function (e) {
            console.log(e.target);
            console.log(e.target.gameID);
            socket.emit('delete_game', { id: e.target.gameID });
        });
    }

    //handle this instance of game manager events
    GameManagerListener(gm) {

        //successful login, show game lobby
        document.addEventListener('login_success', ev => {
            window.csession.lobbyscreen.Initialize();
        });

        //title card click
        document.addEventListener('title_card_clicked', function (e) { gm.TitleCardClicked(e.detail); });
    }
}
