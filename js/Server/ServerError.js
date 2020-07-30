module.exports = class Error{
    constructor(type, errmessage){
        this.type = type;
        this.errmessage = errmessage;
    }

    static SendClientError(client, err){
        client.emit('error', err);
    }

}