module.exports = class Game {
    constructor(title, id) {
        this.clientIds = [];
        this.ID = id;
        this.title = title;
        console.log("created game " + this.title + " [" + id + "]");
    }

    AddClient(client) {
        return new Promise((resolve, reject) => {
            if (this.clientIds.indexOf(client.userid) > -1) {
                return reject(new Error("You already joined!"));
            }
            else if (this.clientIds.length < 6) {
                this.clientIds.push(client.userid);
                return resolve("Game now has [" + this.clientIds.length + "/6] users.");
            }
            else {
                return reject(new Error("Game is full!"));
            }
        });
    }

    GetClients() {
        return this.clientIds;
    }

    GetID() {
        return this.ID;
    }
}