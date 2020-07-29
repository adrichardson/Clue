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

socket.on('joined_game', function (data) {
    console.log("joining game: " + data);
});

socket.on('deleted_game', function (data) {
    console.log("[" + data.deleted_id + "] was deleted refreshing games list...");
    window.csession.lobbyscreen.SetGameList(data.remaining_list);
});

socket.on('newgame_created', function () {
    window.csession.lobbyscreen.RefreshGamesList();
});

socket.on('error', function (err) {
    window.alert(err.errmessage);
});

socket.on('update_games_list', function (data) {
    console.log("updating games list...");
    window.csession.lobbyscreen.SetGameList(data);
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