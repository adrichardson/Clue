var PersonCard = require("./PersonCard");
var WeaponCard = require("./WeaponCard");
var RoomCard = require("./RoomCard");

module.exports = class Deck {
    constructor() {
        this.InitializeDeck();
    }

    Shuffle() {
        var j, x, i;
        var a = this.cards;
        for (i = a.length; i; i--) {
            j = Math.floor(Math.random() * i);
            x = a[i - 1];
            a[i - 1] = a[j];
            a[j] = x;
        }
    }

    get cards{
        return this.cards;
    }

    InitializeDeck() {
        this.InitializePeople();
        this.InitializeWeapons();
        this.InitializeRooms();
        this.cards = this.people.concat(this.weapons).concat(this.rooms);
    }

    InitializePeople() {
        this.people = [
            new PersonCard("Ms. Scarlet", "img/people/msscarlet.png", "img/people/msscarlet-grayscale.png"),
            new PersonCard("Col. Mustard", "img/people/colmustard.png", "img/people/colmustard-grayscale.png"),
            new PersonCard("Mrs. White", "img/people/mrswhite.png", "img/people/mrswhite-grayscale.png"),
            new PersonCard("Mr. Green", "img/people/mrgreen.png", "img/people/mrgreen-grayscale.png"),
            new PersonCard("Mrs. Peacock", "img/people/mrspeacock.png", "img/people/mrspeacock-grayscale.png"),
            new PersonCard("Prof. Plum", "img/people/profplum.png", "img/people/profplum-grayscale.png")
        ];
    }

    InitializeWeapons() {
        this.weapons = [
            new WeaponCard("Candlestick", "img/weapons/candlestick.png", "img/weapons/candlestick-grayscale.png"),
            new WeaponCard("Knife", "img/weapons/knife.png", "img/weapons/knife-grayscale.png"),
            new WeaponCard("Lead Pipe", "img/weapons/leadpipe.png", "img/weapons/leadpipe-grayscale.png"),
            new WeaponCard("Revolver", "img/weapons/revolver.png", "img/weapons/revolver-grayscale.png"),
            new WeaponCard("Rope", "img/weapons/rope.png", "img/weapons/rope-grayscale.png"),
            new WeaponCard("Wrench", "img/weapons/wrench.png", "img/weapons/wrench-grayscale.png")
        ];
    }

    InitializeRooms() {
        this.rooms = [
            new RoomCard("Ballroom", "img/rooms/ballroom.png", "img/rooms/ballroom-grayscale.png"),
            new RoomCard("Billiard Room", "img/rooms/billiardroom.png", "img/rooms/billiardroom-grayscale.png"),
            new RoomCard("Conservatory", "img/rooms/conservatory.png", "img/rooms/conservatory-grayscale.png"),
            new RoomCard("Dining Room", "img/rooms/diningroom.png", "img/rooms/diningroom-grayscale.png"),
            new RoomCard("Hall", "img/rooms/hall.png", "img/rooms/hall-grayscale.png"),
            new RoomCard("Kitchen", "img/rooms/kitchen.png", "img/rooms/kitchen-grayscale.png"),
            new RoomCard("Library", "img/rooms/library.png", "img/rooms/library-grayscale.png"),
            new RoomCard("Lounge", "img/rooms/lounge.png", "img/rooms/lounge-grayscale.png"),
            new RoomCard("Study", "img/rooms/study.png", "img/rooms/study-grayscale.png")
        ];
    }
}


/*
 var people = [{name: "Ms. Scarlet", img: "img/people/msscarlet.png", grayscale: "img/people/msscarlet-grayscale.png", type: "Person"},
              {name: "Col. Mustard", img: "img/people/colmustard.png", grayscale: "img/people/colmustard-grayscale.png", type: "Person"},
              {name: "Mrs. White", img: "img/people/mrswhite.png", grayscale: "img/people/mrswhite-grayscale.png", type: "Person"},
              {name: "Mr. Green", img: "img/people/mrgreen.png", grayscale: "img/people/mrgreen-grayscale.png", type: "Person"},
              {name: "Mrs. Peacock", img: "img/people/mrspeacock.png", grayscale: "img/people/mrspeacock-grayscale.png", type: "Person"},
              {name: "Prof. Plum", img: "img/people/profplum.png", grayscale: "img/people/profplum-grayscale.png", type: "Person"}];

var weapons = [{name: "Candlestick", img: "img/weapons/candlestick.png", grayscale: "img/weapons/candlestick-grayscale.png", type: "Weapon"},
               {name: "Knife", img: "img/weapons/knife.png", grayscale: "img/weapons/knife-grayscale.png", type: "Weapon"},
               {name: "Lead Pipe", img: "img/weapons/leadpipe.png", grayscale: "img/weapons/leadpipe-grayscale.png", type: "Weapon"},
               {name: "Revolver", img: "img/weapons/revolver.png", grayscale: "img/weapons/revolver-grayscale.png", type: "Weapon"},
               {name: "Rope", img: "img/weapons/rope.png", grayscale: "img/weapons/rope-grayscale.png", type: "Weapon"},
               {name: "Wrench", img: "img/weapons/wrench.png", grayscale: "img/weapons/wrench-grayscale.png", type: "Weapon"}];

var rooms = [{name: "Ballroom", img: "img/rooms/ballroom.png", grayscale: "img/rooms/ballroom-grayscale.png", type: "Room"},
             {name: "Billiard Room", img: "img/rooms/billiardroom.png", grayscale: "img/rooms/billiardroom-grayscale.png", type: "Room"},
             {name: "Conservatory", img: "img/rooms/conservatory.png", grayscale: "img/rooms/conservatory-grayscale.png", type: "Room"},
             {name: "Dining Room", img: "img/rooms/diningroom.png", grayscale: "img/rooms/diningroom-grayscale.png", type: "Room"},
             {name: "Hall", img: "img/rooms/hall.png", grayscale: "img/rooms/hall-grayscale.png", type: "Room"},
             {name: "Kitchen", img: "img/rooms/kitchen.png", grayscale: "img/rooms/kitchen-grayscale.png", type: "Room"},
             {name: "Library", img: "img/rooms/library.png", grayscale: "img/rooms/library-grayscale.png", type: "Room"},
             {name: "Lounge", img: "img/rooms/lounge.png", grayscale: "img/rooms/lounge-grayscale.png", type: "Room"},
             {name: "Study", img: "img/rooms/study.png", grayscale: "img/rooms/study-grayscale.png", type: "Room"}];

 */