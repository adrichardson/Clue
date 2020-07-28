class GameManager {

    constructor(em) {
        this.stage = new createjs.Stage("canvas");
        this.canvas = this.CreateCanvas();
        this.titleCards = this.CreateTitleCards();
        this.titleCardLoadCount = 0;
        this.stage.updateFrames = true;


        this.Init(this.stage);
        em.GameManagerListener(this);
        console.log("initializing game manager...");
    }

    CreateCanvas() {
        var chat = $('#chatwrap');
        var wrapper = $('#wrapper');
        var pane = $('#chatpane');

        wrapper.height(window.innerHeight);
        wrapper.width(window.innerWidth - 20);

        var boxheight = $('#userbox').height();
        var boxwidth = wrapper.width() * 0.2;

        $('#userbox').css({ width: boxwidth, top: (wrapper.height() - boxheight) * 0.2, left: (wrapper.width() - boxwidth) / 2 });

        $('#sendbox').css({ width: pane.width() });
        $('#canvasWrap').css({ height: wrapper.height(), width: wrapper.width() - 200 });
        chat.css({ right: $('#canvasWrap').width() });

      var canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');

        canvas.width = $('#canvasWrap').width();
        canvas.height = $('#canvasWrap').height();

        return canvas;
    }

    CreateTitleCards() {
        var titleCards = [new Piece("Ms. Scarlet", "msscarlet.png", "msscarlet-grayscale.png", null, "#DC143C"),
        new Piece("Col. Mustard", "colmustard.png", "colmustard-grayscale.png", null, "#FFA500"),
        new Piece("Mrs. White", "mrswhite.png", "mrswhite-grayscale.png", null, "#DEB887"),
        new Piece("Mr. Green", "mrgreen.png", "mrgreen-grayscale.png", null, "#008000"),
        new Piece("Mrs. Peacock", "mrspeacock.png", "mrspeacock-grayscale.png", null, "#0000FF"),
        new Piece("Prof. Plum", "profplum.png", "profplum-grayscale.png", null, "#800080")];

        console.log(titleCards);

        return titleCards;
    }

    TitleCardClicked(name) {
        console.log("game manager [" + name + "] card clicked");
    }

    NewGame() {
        console.log('new game starting...');
        new SplashScreen();
    }

    ShowCharacterSelect() {

        var toppad = 15;
        var canvas = this.canvas;

        //only way to call local method in ES6 is to use Arrow Functions
        const resize = () => { this.ResizeCanvas(canvas); };
        resize();

        $('#chatwrap').removeClass('hidden');
        $('#canvas').addClass('white');
        $('#chatwrap').addClass('white');
        $('#wrapper').removeClass('hidden');
        $('#loginbox').addClass('hidden');

        //start button
        //if(isHost){
            //var img = new Image();
            //img.onload = () => function(){
            //    var start = new createjs.Bitmap(img);
            //    start.scaleX = start.scaleY = (canvas.width*0.2)/img.width;
            //    start.cursor = "no-drop";
            //    start.inactiveImg = img;
            //    start.hasClicked = false;
            //    start.x = (canvas.width - (img.width*start.scaleX)) / 2;
            //    start.y = ((canvas.height - (img.height*start.scaleY)) / 2) + canvas.height*0.3;
            //    start.name = "StartButton";
            //    start.type = "Button";
            //    this.stage.addChild(start);
            //    this.stage.updateFrames = true;
            //};
            //img.src = "img/buttons/startbutton-grayscale.png";
        //}
        //text
        var text = new createjs.Text("Choose your character!", "45px Marker", "black");
        text.maxWidth = canvas.width*0.3;
        text.x = (canvas.width - text.getMeasuredWidth())/2;
        text.y = toppad;
        this.stage.addChild(text);

        //title cards
        const showtitlecards = () => { this.ShowTitleCards(); };
        showtitlecards();
    }

    ResizeCanvas(canvas) {

        var chat = $('#chatwrap');
        var wrapper = $('#wrapper');

        var canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);  //redraw after re-size
        wrapper.height(window.innerHeight);
        wrapper.width(window.innerWidth);
        //re-size
        chat.height(wrapper.height());
        canvas.width = wrapper.width() - 200;
        canvas.height = wrapper.height();
        //var yscale = canvas.height / canvH;
        //var xscale = canvas.width / canvW;

        canvas.getContext('2d').putImageData(canvasData, 0, 0);
        //to be worked on later, has poor side effects on movement
        /*if(stage !=null){
          stage.scaleX = stage.scaleX*xscale;
          stage.scaleY = stage.scaleY*yscale;
        }*/
        this.stage.updateFrames = true;
    }
    
    Init(stage) {

        createjs.Touch.enable(stage); // enable touch interactions if supported on the current device:
        stage.enableMouseOver(10); // enabled mouse over / out events
        stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas

        createjs.Ticker.setFPS(60);
        createjs.Ticker.addEventListener("tick", ev => {
            if (stage.updateFrames) {
                stage.updateFrames = false; // only update once
                stage.update(event);
            }
        });
    }

    tick(event) {
        // this set makes it so the stage only re-renders when an event handler indicates a change has happened.
        if (this.update) {
            this.update = false; // only update once
            stage.update(event);
        }
    }

    ShowTitleCards() {
        var cards = this.titleCards;
        //characters
        console.log(cards);
        for (var i = 0; i < cards.length; i++) {
            this.createChooseOption(cards[i].name, i, cards[i], canvas);
        }
    }

    createChooseOption(name, pos, character, canvas) {
        var leftpad = 15;
        var toppad = 15;
        var disabled = character.client != null;
        var img = character.img;
        var img2 = character.img_grayscale;
        var scaleX = (canvas.width / 6 - leftpad) / img.width;
        var scaleY = (canvas.height * 0.4 - toppad) / img.height; // - (startbutton.y - (startbutton.image.height * startbutton.scaleY))
        var x = leftpad + pos * (img.width * scaleX + 10);
        var y = toppad + 50;
        
        var card = new TitleCard(name, x, y, scaleX, scaleY, img, img2, !disabled);//createjs.Bitmap(img);    
        if (disabled) {
            card.disable();
            createSelectionText('(' + character.client.username + ')', card, character.color);
        }

        this.stage.addChild(card);
        this.stage.updateFrames = true;
    }
  
  }