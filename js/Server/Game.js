module.exports = class Game {
    constructor(title, id) {
        this.clients = [];
        this.ID = id;
        this.title = title;
        console.log("created game " + this.title + " [" + id + "]");
    }

    AddClient(client) {
        this.clients.push(client);
    }

    GetClients() {
        return this.clients;
    }

    GetID() {
        return this.ID;
    }
}