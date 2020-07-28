var Game = require('././Game.js');

module.exports = function (sio, client) {

    client.emit('onconnected', { id: client.userid });

    client.on('disconnect', function () {
        pos = sio.connectedClients.map(function (e) { return e.uid; }).indexOf(client.userid);
        if (pos >= 0) {
            var disc = sio.connectedClients[pos];
            console.log(disc.name + ' [' + disc.uid +'] has left the server');
            sio.sockets.emit('sendServerMessage', '<i><b>' + client.name + '</b> has left the game.</i>');
            sio.connectedClients.splice(pos, 1);
        }
    });

    client.on('login_attempt', function (data) {
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

    client.on('get_games_list', function () {
        client.emit('return_games_list', sio.lobby.GetGameList());
    });

    client.on('creategame', function (data) {
        var game = new Game(data + "'s game", client.userid);
        sio.lobby.AddGame(game);
        sio.sockets.emit('newgame_created');
    });
};