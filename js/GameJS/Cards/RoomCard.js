var Card = require("./Card");

module.exports = class RoomCard extends Card {
    constructor(name, img, img_grayscale) {
        super(name, img, img_grayscale, "Room");
    }
}