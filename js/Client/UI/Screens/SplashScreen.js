class SplashScreen {

    constructor() {

    }

    Initialize() {
        var wrapper = $('#wrapper');
        wrapper.height(window.innerHeight);
        wrapper.width(window.innerWidth - 20);

        var loginbox = $('#loginbox');
        var boxheight = loginbox.height();
        var boxwidth = wrapper.width() * 0.2;
        loginbox.css({ width: boxwidth, top: (wrapper.height() - boxheight) * 0.2, left: (wrapper.width() - boxwidth) / 2 });

        var logintitle = document.createElement("div");
        logintitle.id = "logintitle";
        logintitle.innerText = "Login to Clue Online!";

        var errmsg = document.createElement("div");
        errmsg.id = "errmsg";
        errmsg.classList.add('hidden');
        errmsg.classList.add('errormsg');

        var usernamebox = document.createElement("input");
        usernamebox.id = "usernamebox";
        usernamebox.type = "text";
        usernamebox.placeholder = "Username";

        var passwordbox = document.createElement("input");
        passwordbox.id = "passwordbox";
        passwordbox.type = "password";
        passwordbox.placeholder = "Password";

        var submitbtn = document.createElement("button");
        submitbtn.id = "loginbtn";
        submitbtn.className = "loginbtn";
        submitbtn.textContent = "Login";

        loginbox.append(logintitle);
        loginbox.append(errmsg);
        loginbox.append(usernamebox);
        loginbox.append(passwordbox);
        loginbox.append(submitbtn);
        usernamebox.focus();
    }
}