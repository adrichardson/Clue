class WeaponCard extends Card {
    constructor(name, img, img_grayscale) {
        super(name, img, img_grayscale, "Weapon");
        this.name = name;
        this.img = img;
        this.img_grayscale = img_grayscale;
    }
}