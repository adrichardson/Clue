var Card = require("./Card");

module.exports = class PersonCard extends Card{
    constructor(name, img, img_grayscale) {
        super();
        this.name = name;
        this.img = img;
        this.img_grayscale = img_grayscale;
        this.type = "Person";
    }
}