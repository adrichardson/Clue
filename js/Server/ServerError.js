module.exports = class ServerError{
    constructor(type, errmessage){
        this.type = type;
        this.errmessage = errmessage;
    }

    static SendClientError(client, err){
        client.emit('myerror', err);
    }

}