module.exports = function (sio, client) {
    client.on('newmsg', function (data) {
        sio.sockets.emit('newmsg', data);
    });
    client.on('infomsg', function (data) {
        sio.sockets.emit('infomsg', data);
    });
};