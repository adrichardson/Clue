class SplashScreen {

    constructor() {
        this.Initialize();
    }

    Initialize() {
        var wrapper = $('#wrapper');
        wrapper.height(window.innerHeight);
        wrapper.width(window.innerWidth - 20);

        var userbox = $('#userbox');
        var boxheight = userbox.height();
        var boxwidth = wrapper.width() * 0.2;
        userbox.css({ width: boxwidth, top: (wrapper.height() - boxheight) * 0.2, left: (wrapper.width() - boxwidth) / 2 });

        var usernamebox = document.createElement("input");  // create a script DOM node
        usernamebox.id = "usernamebox";
        usernamebox.type = "text";
        usernamebox.placeholder = "Enter a username to connect...";

        var submitbtn = document.createElement("button");
        submitbtn.id = "submit";
        submitbtn.className = "submit";
        submitbtn.textContent = "Submit";

        userbox.append(usernamebox);
        userbox.append(submitbtn);
        userbox.focus();
    }
}