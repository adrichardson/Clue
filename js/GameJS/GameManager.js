class GameManager {
    constructor(canvas) {
        this.canvas = canvas;
    }

    ShowCharacterSelect(){
        var canvas = this.canvas;
        //start button
        if(isHost){
            var img = new Image();
            img.onload = function(){
                var start = new createjs.Bitmap(img);
                start.scaleX = start.scaleY = (canvas.width*0.2)/img.width;
                start.cursor = "no-drop";
                start.inactiveImg = img;
                start.hasClicked = false;
                start.x = (canvas.width - (img.width*start.scaleX)) / 2;
                start.y = ((canvas.height - (img.height*start.scaleY)) / 2) + canvas.height*0.3;
                start.name = "StartButton";
                start.type = "Button";
                stage.addChild(start);
                update = true;
            };
            img.src = "img/buttons/startbutton-grayscale.png";
        }
        //text
        var text = new createjs.Text("Choose your character!", "45px Marker", "black");
        text.maxWidth = canvas.width*0.3;
        text.x = (canvas.width - text.getMeasuredWidth())/2;
        text.y = toppad;
        stage.addChild(text);
        //characters
        console.log(characters);
        for(var i=0; i<characters.length; i++){
            createChooseOption(characters[i].name, "img/people/" + characters[i].img,
                "img/people/" + characters[i].img_grayscale, i, characters[i]);
        }
    }
  
  }