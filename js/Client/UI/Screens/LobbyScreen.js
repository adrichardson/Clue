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

        //var joinbtn = document.createElement("button");
        //joinbtn.id = "joinbtn";
        //joinbtn.className = "loginbtn";
        //joinbtn.textContent = "Join";

        var gametable = document.createElement("table");
        gametable.id = "gametable";
        var body = gametable.createTBody();
        body.id = "gametablebody";

        gamelistbox.append(gameboxtitle);
        gamelistbox.append(gametable);
        //gamelistbox.append(joinbtn);
        gamelistbox.append(createbtn);

        this.RefreshGamesList();
    }

    RefreshGamesList() {
        console.log("searching for games...");
        socket.emit('get_games_list');
    }

    SetGameList(list) {
        this.gameslist = list;
        this.Refresh();
    }

    Refresh() {
        console.log(this.gameslist);
        var tablebody = $('#gametablebody');
        tablebody.empty();

        if(this.gameslist.length == 0) {
            var newRow = gametable.insertRow();
            var newCell = newRow.insertCell(0);
            var title = document.createTextNode("No available games...wait for some to become available or create one yourself!");
            newCell.appendChild(title);
        }
        else{
            for (var i = 0; i < this.gameslist.length; i++) {
                var newRow = gametable.insertRow();
                newRow.gameID = this.gameslist[i].ID;
                var newCell = newRow.insertCell(0);
                var title = document.createTextNode(this.gameslist[i].title);
                newCell.appendChild(title);
    
                var playercountCell = newRow.insertCell(1);
                var count = this.gameslist[i].clientIds.length;
                console.log(count + " players found");
                var counttext = document.createTextNode(count + "/6 players");
                playercountCell.appendChild(counttext);
    
                var buttoncell = newRow.insertCell(2);
                var btn = document.createElement("button");
                btn.gameID = newRow.gameID;
                btn.className = "loginbtn";
                if (newRow.gameID == window.csession.ssid) {
                    btn.id = "deletegamebtn";
                    btn.textContent = "Delete";
                }
                else {
                    btn.id = "joingamebtn";
                    btn.textContent = "Join";
                }
                buttoncell.appendChild(btn);
            }
        }
    }
}