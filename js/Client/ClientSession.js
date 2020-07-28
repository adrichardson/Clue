class ClientSession {
    constructor (){
        this.Initialize();
    }

    Initialize() {
        this.im = new ImageManager();
        this.em = new EventManager();
        this.sm = new SoundManager();
        this.cm = new ChatManager();
        this.gm = new GameManager(this.em);
        //gm.NewGame();
        this.splash = new SplashScreen();
        this.splash.Initialize();

        this.lobbyscreen = new LobbyScreen();
    }
}