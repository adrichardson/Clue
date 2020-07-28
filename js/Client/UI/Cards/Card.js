class Card extends createjs.Bitmap {
    constructor(name, img, img_grayscale, type) {
        super(img);
        this.name = name;
        this.img = img;
        this.img_grayscale = img_grayscale;
        this.type = type;
    }
}