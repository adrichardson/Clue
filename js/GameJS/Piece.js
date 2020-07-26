class Piece {
    constructor(name, img, img_grayscale, client, color) {
        this.name = name;
        this.img = this.SetImage(img);
        this.img_grayscale = this.SetImage(img_grayscale);
        this.client = client;
        this.color = color;
    }

    SetImage(path)
    {
        var img = new Image();
        /*img.onload = function(){    
            var scaleX = (canvas.width/6 - leftpad)/img.width;
            var scaleY = (canvas.height*0.4 - toppad)/img.height; // - (startbutton.y - (startbutton.image.height * startbutton.scaleY))
            var x = leftpad + pos*(img.width*scaleX + 10);
            var y = toppad + 50;
            var card = new TitleCard(name, x, y, scaleX, scaleY, img, img2, !disabled);//createjs.Bitmap(img);    
            if(disabled){
              card.disable();
              createSelectionText('('+ character.client.username +')', card, character.color);
            }
            stage.addChild(card);
            update = true;
          };        */
        img.src = this.GetRelativePath(path);
        return img;
    }

    GetRelativePath(path)
    {
      return './img/people/' + path;
    }
};
//template
//{name: "Ms. Scarlet", img: "msscarlet.png", grayscale: "msscarlet-grayscale.png", client: null, color: "#DC143C"}
