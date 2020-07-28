class LobbyScreen {

    constructor() {
        this.gameslist = [];
    }

    Initialize() {
        var wrapper = $('#wrapper');
        wrapper.height(window.innerHeight);
        wrapper.width(window.innerWidth - 20);

        var loginbox = $('#loginbox');
        loginbox.addClass('hidden');

        
        var gamelistbox = $('#gamelistbox');
        var boxheight = gamelistbox.height();
        var boxwidth = wrapper.width() * 0.6;

        gamelistbox.css({ width: boxwidth, top: (wrapper.height() - boxheight) * 0.2, left: (wrapper.width() - boxwidth) / 2 });
        gamelistbox.removeClass('hidden');

        var gameboxtitle = document.createElement("div");
        gameboxtitle.id = "gameboxtitle";
        gameboxtitle.innerText = "Select a game to join!";

        var createbtn = document.createElement("button");
        createbtn.id = "newgamebtn";
        createbtn.className = "loginbtn";
        createbtn.textContent = "Create";

        var joinbtn = document.createElement("button");
        joinbtn.id = "joinbtn";
        joinbtn.className = "loginbtn";
        joinbtn.textContent = "Join";

        var gametable = document.createElement("table");
        gametable.id = "gametable";

        gamelistbox.append(gameboxtitle);
        gamelistbox.append(gametable);
        gamelistbox.append(joinbtn);
        gamelistbox.append(createbtn);

        this.GetAvailableGamesList();
    }

    GetAvailableGamesList() {
        console.log("searching for games...");
        socket.emit('get_games_list');
    }

    SetGameList(list) {
        this.gameslist = list;
        this.Refresh();
    }

    Refresh() {
        console.log(this.gameslist);
        for (var i = 0; i < this.gameslist.length; i++) {
            var newRow = gametable.insertRow();
            var newCell = newRow.insertCell(0);
            var title = document.createTextNode(this.gameslist[i].title);
            newCell.appendChild(title);
        }
    }
}