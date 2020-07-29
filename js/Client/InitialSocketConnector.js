var socket = io.connect('/', {
    reconnection: true,
    reconnectionDelay: 5000,
    reconnectionDelayMax: 5000,
    reconnectionAttempts: 10
});

socket.on('onconnected', function (data) {
    socket.ssid = data.id;
    //window.csession.ssid = data.id;
    console.log('Connected successfully to the socket.io server. Server side ID is ' + data.id);
});