/*jshint esversion: 6 */
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;

var io = require('socket.io');
var sio = io.listen(server);
sio.connectedClients = [];

var Lobby = require('././js/Server/Lobby.js');
sio.lobby = new Lobby();

var UUID = require('node-uuid');
const adminNamespace = sio.of('/admin');

app.use(express.static(__dirname + '/')); //for external stylesheet

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/404.html');
});

server.listen(port, "0.0.0.0", (err) => {
    if (err) {
        return console.log('Something bad happened!', err);
    }
    console.log(`server is listening on ${port}`);
});

adminNamespace.on('connection', function (socket) {
    console.log("admin user connected");
    //adminNamespace.emit('hi', 'hello admins');
});

sio.sockets.on('connection', function (client) {

    //unique user id
    client.userid = UUID();

    //External handlers
    require('././js/Server/ClientEventHandler.js')(sio, client);
    require('././js/Server/MessageEventHandler.js')(sio, client);

});