var Game = require('././Game.js');

module.exports = class Lobby {
    constructor() {
        this.games = [];
    }

    AddGame(title, clientid) {
        return new Promise(async (resolve, reject) => {
            if (this.GetGame(clientid) == null) {
                var game = new Game(title + "'s game", clientid);
                this.games.push(game);
                return resolve("added game [" + game.GetID() + "]");
            } else {
                return reject("Game already exists for user [" + clientid + "]");
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
                    return resolve("Joined game: " + success);
                }
                return reject(new Error("Unable to find game error."));
            }
            catch (error) {
                return reject(new Error("Unable to join game error: " + error.message));
            }
        });
    }

    DeleteGame(id) {
        return new Promise((resolve, reject) => {
            for (var i = 0; i < this.games.length; i++) {
                if (this.games[i].GetID() == id) {
                    this.games.splice(i, 1);
                    return resolve("Game [" + id + "] deleted!");
                }
            }
            return reject("Unable to delete game ["+ id +"]");
        });
    }
}