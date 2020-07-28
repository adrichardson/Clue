class UserInput {

    EnterUsername() {
        //TODO - DB Logic
        var usern = $('#usernamebox').val();
        var pass = $('#passwordbox').val();

        socket.emit('login_attempt', {username: usern, password: pass});

        //if ($('#usernamebox').val() !== '') {
        //    var usern = $('#usernamebox').val();
        //    socket.emit('setuser', { username: usern });
        //    socket.emit('newuserconnect', { username: usern });
        //    document.dispatchEvent(new Event('login_success'));
        //} else {
        //    $('#errormsg').html('Please enter a valid user name!');
        //    $('#errormsg').removeClass('hidden');
        //}
    }
}
