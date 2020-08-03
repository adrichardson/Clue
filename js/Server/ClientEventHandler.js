var ServerError = require('././ServerError.js');

module.exports = (sio, client) => {

    client.emit('onconnected', { id: client.userid });

    client.on('disconnect', () => {
        pos = sio.connectedClients.map((e) => { return e.uid; }).indexOf(client.userid);
        if (pos >= 0) {
            var disc = sio.connectedClients[pos];
            console.log(disc.name + ' [' + disc.uid +'] has left the server');
            sio.sockets.emit('sendServerMessage', '<i><b>' + client.name + '</b> has left the game.</i>');
            sio.connectedClients.splice(pos, 1);
        }
    });

    client.on('login_attempt', (data) => {
        var username = data.username;
        var password = data.password;

        //TODO-DB connection
        if (username == 'admin' && password == 'admin') {
            var sessobj = { name: username, uid: client.userid };
            client.emit('loginsuccess', sessobj);
            sio.connectedClients.push(sessobj);
        } else {
            var msg = '[' + username + '] is not a valid login, or the password is incorrect.';
            client.emit('loginfailure', { message: msg });
        }

    });

    client.on('get_games_list', () => {
        client.emit('return_games_list', sio.lobby.GetGameList());
    });

    client.on('creategame', async function (data) {
        //var game = new Game(data + "'s game", client.userid);
        try {
            var created = await sio.lobby.AddGame(data, client.userid);
            console.log(created);
            sio.sockets.emit('newgame_created');
        }
        catch (error) {
            console.log(error);
        }
    });

    client.on('join_game', async (data) => {
        try {
            var connect = await sio.lobby.ConnectToGame(data.id, client);
            console.log(connect);
            client.emit('joined_game', data.id);
            sio.sockets.emit('update_games_list', sio.lobby.games);
        }
        catch (error) {
            console.log(error.message);
            ServerError.SendClientError(client, error.message);      
        }
    });

    client.on('delete_game', async (data) => {
        try {
            await sio.lobby.DeleteGame(data.id);
            sio.sockets.emit('deleted_game', { deleted_id: data.id, remaining_list: sio.lobby.GetGameList() });
        }
        catch (error) {
            console.log(error);
        }

    });
};