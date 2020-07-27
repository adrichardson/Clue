class EventManager {

    constructor() {

        this.Initialize();
    }

    Initialize() {

        this.HandleSplashScreenEvents();
        console.log("setting up event listener...");
    }

    HandleSplashScreenEvents(em) {

        //splash screen username
        $(document).on('keydown', '#usernamebox', function (key) {
            if (key.which == 13) { //enter
                UserInput.prototype.EnterUsername();
            }
        });

        //splash screen submit button
        $(document).on('click', '#submit', function (e) {
            UserInput.prototype.EnterUsername();
        });
    }

    //handle this instance of game manager events
    GameManagerListener(gm) {
        //successful login, show character select
        document.addEventListener('login_success', ev => { gm.ShowCharacterSelect(); });

        //title card click
        document.addEventListener('title_card_clicked', function (e) { gm.TitleCardClicked(e.detail); });
    }
}
