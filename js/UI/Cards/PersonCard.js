class PersonCard extends Card{
    constructor(name, img, img_grayscale) {
        super(name, img, img_grayscale, "Person");
        this.name = name;
        this.img = img;
        this.img_grayscale = img_grayscale;
    }
}