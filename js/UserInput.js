class UserInput {

    enterusername() {
        if ($('#usernamebox').val() !== '') {
            var usern = $('#usernamebox').val();
            socket.emit('setuser', { username: usern });
            socket.emit('newuserconnect', { username: usern });
            resizeCanvas();
            $('#chatwrap').removeClass('hidden');
            $('#canvas').addClass('white');
            $('#chatwrap').addClass('white');
            $('#wrapper').removeClass('hidden');
            $('#userbox').addClass('hidden');
            init();
        } else {
            $('#errormsg').html('Please enter a valid user name!');
            $('#errormsg').removeClass('hidden');
        }
    }
}
