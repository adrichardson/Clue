socket.on('onconnected', function (data) {
    socket.ssid = data.id;
    console.log('Connected successfully to the socket.io server. Server side ID is ' + data.id);
});

socket.on('loginsuccess', function (data) {
    $('#chatpane').html('Welcome to Online Clue! <hr>');
    socket.sessobj = data;
    console.log("welcome " + socket.sessobj.name);
    document.dispatchEvent(new Event('login_success'));
});

socket.on('loginfailure', function (data) {
    errmsg.innerText = data.message;
    errmsg.classList.remove('hidden');
});

socket.on('return_games_list', function (data) {
    console.log(data.length + ' games found!');
    window.csession.lobbyscreen.SetGameList(data);
});

socket.on('newgame_created', function () {
    window.csession.lobbyscreen.GetAvailableGamesList();
});

socket.on('newmsg', function (data) {
    var pane = $('#chatpane');
    pane.html($('#chatpane').html() + '<br><span style=\'color:' + data.color + '\'<b>' + data.character + ' (<i>' + data.username + '</i>): </b></span>' + data.msg);
    bottom = pane.prop('scrollHeight') - pane.height();
    pane.scrollTop(bottom);
    if (data.username == socket.username) {
        $("#sendbox").val('');
    }
});