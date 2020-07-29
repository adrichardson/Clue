var Game = require('././Game.js');
var Error = require('././Error.js');

module.exports = class Lobby {
    constructor() {
        this.games = [];
    }

    AddGame(title, clientid) {
        return new Promise(async (resolve, reject) => {
            if (this.GetGame(clientid) == null) {
                var game = new Game(title + "'s game", clientid);
                this.games.push(game);
                resolve("added game [" + game.GetID() + "]");
            } else {
                reject("Game already exists for user [" + clientid + "]");
            }
        });
    }

    GetGame(id) {
        for (var i = 0; i < this.games.length; i++)
        {
            var gameid = this.games[i].GetID();
            if (gameid == id) {
                return this.games[i];
            }
        }
        return null;
    }

    GetGameList() {
        return this.games;
    }

    ConnectToGame(id, client) {
        return new Promise(async (resolve, reject) => {
            try {
                var game = this.GetGame(id);
                if (game != null) {
                    var success = await game.AddClient(client);
                    resolve("Joined game: " + success);
                }
                reject("Unable to find game error.");
            }
            catch (error) {
                reject("Unable to join game error: " + error);
            }
        });
    }

    DeleteGame(id) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < this.games.length; i++) {
                if (this.games[i].GetID() == id) {
                    this.games.splice(i, 1);
                    resolve("Game [" + id + "] deleted!");
                }
            }
            reject("Unable to delete game ["+ id +"]");
        });
    }
}