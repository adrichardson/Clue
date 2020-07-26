class TitleCard extends Card{
    constructor(name, x, y, scalex, scaley, img, img_grayscale, enabled) {
        super(name, img, img_grayscale, "Title");
        this.scaleX = scalex;
        this.scaleY = scaley;
        this.cursor = "pointer";
        this.x = x;
        this.y = y;
        this.name = name;
        this.canSelect = enabled;
        this.on("mousedown", function(evt) {this.onMouseDown(evt)});
    }

    SetGrayScale(){
        this.image = this.img_grayscale;
    }

    DisableSelect(){
        this.canSelect = false;
    }

    SetCursor(style){
        this.cursor = style;
    }

    OnMouseDown(evt){
        if(!this.canSelect || selectedCharacter.name!='Spectator')
            return;
        if(stage.getChildByName('confirmBox')!=null){
          showConfirm(this, stage.getChildByName('confirmBox'));
        } else {
          showConfirm(this, null);
        }
    }

    Disable(){
        this.SetGrayScale();
        this.DisableSelect();
        this.SetCursor("no-drop");
      }    
}

/*
    card.scaleX = (canvas.width/6 - leftpad)/img.width;
    card.scaleY = (canvas.height*0.4 - toppad)/img.height; // - (startbutton.y - (startbutton.image.height * startbutton.scaleY))
    card.cursor = "pointer";
    card.x = leftpad + pos*(img.width*card.scaleX + 10);
    card.y = toppad + 50;
    card.name = name;
    card.type = "Card";
    card.grayscale = img2;
    card.canSelect = !disabled;

    card.on("mousedown", function(evt){
      console.log(card.ClassObj);
      if(!card.canSelect || selectedCharacter.name!='Spectator')
          return;
      if(stage.getChildByName('confirmBox')!=null){
        showConfirm(evt.target, stage.getChildByName('confirmBox'));
      } else {
        showConfirm(evt.target, null);
      }
    });

 */