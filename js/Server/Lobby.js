module.exports = class Lobby {
    constructor() {
        this.games = [];
    }

    AddGame(game) {
        console.log("added game [" + game.GetID() + "]");
        this.games.push(game);
    }

    GetGame(id) {
        for (var i = 0; i < this.games.lenth; i++)
        {
            if (this.games[i].GetID() == id) {
                return this.games[i];
            }
        }
        return null;
    }

    GetGameList() {
        return this.games;
    }
}