var canvas, stage, chat, wrapper, pane, canvasData;
var update = true;
var boardW, boardH, sqW, sqH, canvW, canvH;
var leftpad = 15;
var toppad = 15;
var characters = [new Character("Ms. Scarlet", "msscarlet.png", "msscarlet-grayscale.png", null, "#DC143C"),
    new Character("Col. Mustard", "colmustard.png", "colmustard-grayscale.png", null, "#FFA500"),
    new Character("Mrs. White", "mrswhite.png", "mrswhite-grayscale.png", null, "#DEB887"),
    new Character("Mr. Green", "mrgreen.png", "mrgreen-grayscale.png", null, "#008000"),
    new Character("Mrs. Peacock", "mrspeacock.png", "mrspeacock-grayscale.png", null, "#0000FF"),
    new Character("Prof. Plum", "profplum.png", "profplum-grayscale.png", null, "#800080")]

    //[{ name: "Ms. Scarlet", img: "msscarlet.png", grayscale: "msscarlet-grayscale.png", client: null, color: "#DC143C" },
    //              {name: "Col. Mustard", img: "colmustard.png", grayscale: "colmustard-grayscale.png", client: null, color: "#FFA500"},
    //              {name: "Mrs. White", img: "mrswhite.png", grayscale: "mrswhite-grayscale.png", client: null, color: "#DEB887"},
    //              {name: "Mr. Green", img: "mrgreen.png", grayscale: "mrgreen-grayscale.png", client: null, color: "#008000"},
    //              {name: "Mrs. Peacock", img: "mrspeacock.png", grayscale: "mrspeacock-grayscale.png", client: null, color: "#0000FF"},
    //              {name: "Prof. Plum", img: "profplum.png", grayscale: "profplum-grayscale.png", client: null, color: "#800080"}];

var people = [{name: "Ms. Scarlet", img: "img/people/msscarlet.png", grayscale: "img/people/msscarlet-grayscale.png", type: "Person"},
              {name: "Col. Mustard", img: "img/people/colmustard.png", grayscale: "img/people/colmustard-grayscale.png", type: "Person"},
              {name: "Mrs. White", img: "img/people/mrswhite.png", grayscale: "img/people/mrswhite-grayscale.png", type: "Person"},
              {name: "Mr. Green", img: "img/people/mrgreen.png", grayscale: "img/people/mrgreen-grayscale.png", type: "Person"},
              {name: "Mrs. Peacock", img: "img/people/mrspeacock.png", grayscale: "img/people/mrspeacock-grayscale.png", type: "Person"},
              {name: "Prof. Plum", img: "img/people/profplum.png", grayscale: "img/people/profplum-grayscale.png", type: "Person"}];

var weapons = [{name: "Candlestick", img: "img/weapons/candlestick.png", grayscale: "img/weapons/candlestick-grayscale.png", type: "Weapon"},
               {name: "Knife", img: "img/weapons/knife.png", grayscale: "img/weapons/knife-grayscale.png", type: "Weapon"},
               {name: "Lead Pipe", img: "img/weapons/leadpipe.png", grayscale: "img/weapons/leadpipe-grayscale.png", type: "Weapon"},
               {name: "Revolver", img: "img/weapons/revolver.png", grayscale: "img/weapons/revolver-grayscale.png", type: "Weapon"},
               {name: "Rope", img: "img/weapons/rope.png", grayscale: "img/weapons/rope-grayscale.png", type: "Weapon"},
               {name: "Wrench", img: "img/weapons/wrench.png", grayscale: "img/weapons/wrench-grayscale.png", type: "Weapon"}];

var rooms = [{name: "Ballroom", img: "img/rooms/ballroom.png", grayscale: "img/rooms/ballroom-grayscale.png", type: "Room", doors: ["space1916", "space1614", "space1609", "space1907"]},
             {name: "Billiard Room", img: "img/rooms/billiardroom.png", grayscale: "img/rooms/billiardroom-grayscale.png", type: "Room", doors: ["space1506", "space1101"]},
             {name: "Conservatory", img: "img/rooms/conservatory.png", grayscale: "img/rooms/conservatory-grayscale.png", type: "Room", doors: ["space1905"]},
             {name: "Dining Room", img: "img/rooms/diningroom.png", grayscale: "img/rooms/diningroom-grayscale.png", type: "Room", doors: ["space0817", "space1215"]},
             {name: "Hall", img: "img/rooms/hall.png", grayscale: "img/rooms/hall-grayscale.png", type: "Room", doors: ["space0408", "space0711", "space0712"]},
             {name: "Kitchen", img: "img/rooms/kitchen.png", grayscale: "img/rooms/kitchen-grayscale.png", type: "Room", doors: ["space1719"]},
             {name: "Library", img: "img/rooms/library.png", grayscale: "img/rooms/library-grayscale.png", type: "Room", doors: ["space1103", "space0807"]},
             {name: "Lounge", img: "img/rooms/lounge.png", grayscale: "img/rooms/lounge-grayscale.png", type: "Room", doors: ["space0617"]},
             {name: "Study", img: "img/rooms/study.png", grayscale: "img/rooms/study-grayscale.png", type: "Room", doors: ["space0406"]}];

var selectedCharacter = {name: 'Spectator', color: "#000000"};
var username = '';
var currSpace, currRoom;
var currNotesColor = '#E88C78';
var hand = [];
var accuseTextList = [];
var finalTextList = [];
var handTextList = [];
var isHost = false;
var isTurn = false;
var wasCalled = false;
var noteBoxImages = [];
var diceImages = [];
var roll = 0;
var hasMoved = false;
var hasAccused = false;
var isPassage = false;
var isObjecting = false;
var isLooking = false;
var isBlocked = false;
var outOfGame = false;
var accusation = [];
var music, selectmusic, victorymusic;
var availtimer, playbuttontimer;
var lettersUsed = [];
var letteridx = 1;
var path = [];
var doors = ["space0406", "space0408", "space0711", "space0712", "space0617", "space0817", "space1215", "space1719",
             "space1916", "space1614", "space1609", "space1907", "space1905", "space1506", "space1101", "space1103", "space0807"];

$( document ).ready(function() {
    canvas = document.getElementById('canvas'),
            context = canvas.getContext('2d');
    canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);
    chat = $('#chatwrap');
    wrapper = $('#wrapper');
    pane = $('#chatpane');
    wrapper.height(window.innerHeight);
    wrapper.width(window.innerWidth -20);
    canvW = canvas.width;
    canvH = canvas.height;
    var boxheight = $('#userbox').height();
    var boxwidth = wrapper.width()*0.2;
    $('#userbox').css({width: boxwidth, top: (wrapper.height()- boxheight)*0.2,  left: (wrapper.width()-boxwidth)/2});

    $('#sendbox').css({width: pane.width()});
    $('#canvasWrap').css({height: wrapper.height(), width: wrapper.width()-200});
    chat.css({right: $('#canvasWrap').width()});

    // resize the canvas to fill browser window dynamically
    //window.addEventListener('resize', resizeCanvas, false);
    $("#sendbox").keydown(function(key) {
      if(key.which==13) { //enter
        var msg =  $("#sendbox").val();
        var user = socket.username;
        Player.prototype.sendMessage(user, msg, selectedCharacter.color, selectedCharacter.name);
      }
    });
    $('#submit').click(function () {
        UserInput.prototype.enterusername();
      //enterusername();
    });
    $('#usernamebox').keydown(function(key) {
      if(key.which==13) { //enter
        enterusername();
      }
    });
    $('#usernamebox').focus();
    availtimer = setInterval(function(){
                      socket.emit('checkAvailableCharacters', characters);
                    }, 100);
    playbuttontimer = setInterval(function(){
                      socket.emit('checkPlayEnable', null);
                    }, 100);
    preloadNotesImages();
    preloadDice();
});

function resizeCanvas() {
  canvasData = canvas.getContext('2d').getImageData(0, 0, canvas.width, canvas.height);  //redraw after re-size
  wrapper.height(window.innerHeight);
  wrapper.width(window.innerWidth);
  //re-size
  chat.height(wrapper.height());
  canvas.width = wrapper.width() - 200;
  canvas.height = wrapper.height();
  var yscale = canvas.height/canvH;
  var xscale = canvas.width/canvW;
  canvW = canvas.width;
  canvH = canvas.height;
  canvas.getContext('2d').putImageData(canvasData,0, 0);
  //to be worked on later, has poor side effects on movement
  /*if(stage !=null){
    stage.scaleX = stage.scaleX*xscale;
    stage.scaleY = stage.scaleY*yscale;
  }*/
  update=true;
}

function sendMessage(user, msg, color, character){
    socket.emit('newmsg', {username: user, msg: msg, color: color, character: character} );
}

function sendServerMessage(data){
  var pane = $('#chatpane');
  pane.html($('#chatpane').html() + '<br>' + data);
  bottom = pane.prop('scrollHeight') - pane.height();
  pane.scrollTop(bottom);
}

function sendInfoMessage(msg){
  socket.emit('infomsg', {username: socket.username, msg: msg, color: selectedCharacter.color, character: selectedCharacter.name} );
}

function enterusername() {

    UserInput.prototype.enterusername();

    //if($('#usernamebox').val()!== ''){
    //  var usern = $('#usernamebox').val();
    //  socket.emit('setuser', {username: usern});
    //  socket.emit('newuserconnect', {username: usern});
    //  resizeCanvas();
    //  $('#chatwrap').removeClass('hidden');
    //  $('#canvas').addClass('white');
    //  $('#chatwrap').addClass('white');
    //  $('#wrapper').removeClass('hidden');
    //  $('#userbox').addClass('hidden');
    //  init();
    //} else {
    //  $('#errormsg').html('Please enter a valid user name!');
    //  $('#errormsg').removeClass('hidden');
    //}
}

function shadeColor(color, percent) {
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

function clearSpace(spacename){
  var space = stage.getChildByName(spacename);
  space.hasPiece = false;
}

function clearRoom(rname, cname){
  var room = stage.getChildByName(rname);
  var character = stage.getChildByName(cname);
  room.players.splice(room.players.indexOf(character), 1);
}

function centerOnSpace(character, space, valid){
  character.x = space.x + leftpad + (space.width/2) - 5;
  character.y = space.y + toppad + (space.height/2) - 5;
  if(valid){
    if(currRoom!=null && character.name == selectedCharacter.name){
      clearRoom(currRoom.name, selectedCharacter.name);
      socket.emit('clearRoom', {'rname': currRoom.name, 'cname': selectedCharacter.name});
      currRoom=null;
      character.currRoom = null;
    }
    clearSpace(character.startSpace.name);
    socket.emit('clearSpace', character.startSpace.name);
    space.hasPiece=true;
    if(character.name == selectedCharacter.name){
      character.startSpace = currSpace;
      hasMoved = true;
      path=[character.startSpace];
    }
  }
}

function centerOnRoom(char, space, inc){
  if(char.name == selectedCharacter.name){
    currRoom = space;
    char.currRoom = space;
    if(path!=null){
      for(var i=0; i<path.length;i++){
        colorSpace(path[i], "Yellow");
      }
    }
    path=[null];
  }
  if(space.players.indexOf(char) < 0){
    space.players.push(char);
  }
  clearSpace(char.startSpace.name);
  socket.emit('clearSpace', char.startSpace.name);
  char.currSpace = null;
  currSpace=null;
  for(var i = 0; i <space.players.length; i++){
    var ch = space.players[i];
    ch.x = space.x + 20*i + leftpad*2;
    if(i < 3){
      ch.y = space.y + (space.image.height*space.scaleY + toppad - 20)/2;
    } else {
      ch.y = space.y + (space.image.height*space.scaleY + toppad + 10)/2;
      ch.x = space.x + 20*(i-3) + leftpad*2;
    }
    stage.setChildIndex(ch, stage.getNumChildren()-1);
  }
}

function colorSpace(space, color){
  if(space==null) return;
  space.graphics.clear();
  space.graphics.beginFill("Black").drawRect(0, 0, space.width, space.height);
  space.graphics.beginFill(color).drawRect(1, 1, space.width-2, space.height-2);
}

function colorPiece(piece, color){
  piece.graphics.clear();
  piece.graphics.beginFill("Black").drawCircle(0, 0, sqW/2 - 2);
  piece.graphics.beginFill(color).drawCircle(0, 0, sqW/2 - 4);
}

function isValidMove(start, next){
  if(path.indexOf(next)>-1)   return false;
  if(start.xidx == next.xidx){
    return (Math.abs(start.yidx-next.yidx)==1);
  } else if(start.yidx == next.yidx){
    return (Math.abs(start.xidx-next.xidx)==1);
  } else {
    return false;
  }
}

function checkHasPassage(room){
  if(room.passageroom!=null){
    isPassage=true;
    var passagepop  = stage.getChildByName('popupBox').getChildByName('popupPassage');
    passagepop.image = passagepop.activeImg;
    passagepop.cursor = 'pointer';
  }
}

function createCharacter(name, spacename, color){
  var character = new createjs.Shape();
  var space = stage.getChildByName(spacename);

  character.startSpace = space;
  character.currSpace = space;
  character.currRoom = null;
  centerOnSpace(character, space);
  character.name = name;
  if(character.name == selectedCharacter.name){
    path=[character.startSpace];
  }
  character.overColor = (color == "#FFFFFF") ? "#DEB887" : shadeColor(color, 0.6);
  character.defaultColor = color;
  colorPiece(character, color);
	character.cursor = "pointer";
  character.regX = 10; //required for circles
  character.regY = 10;
  character.scaleX = character.scaleY = character.scale = 1;

  character.on("mousedown", function (evt) {
		this.parent.addChild(this);
		this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
	});
  character.on("rollover", function(evt){
    var target = evt.target;
    colorPiece(target, target.overColor);
    update = true;
  });
  character.on("rollout", function(evt){
    var target = evt.target;
    colorPiece(target, target.defaultColor);
    update = true;
  });
  //movement logic  path[] variable
	character.on("pressmove", function (evt) {
    if(roll==0 || hasMoved || selectedCharacter.name != character.name) return;
		this.x = evt.stageX + this.offset.x;
		this.y = evt.stageY + this.offset.y;
    if(isPassage) return;
    var objs = stage.getObjectsUnderPoint(evt.stageX, evt.stageY);
    var drop = null;
    for(var i = 0; i < objs.length; i++){
      if(objs[i].type=="Space" || objs[i].type=="Room"){
        drop = objs[i];
        break;
      }
    }
    if(drop==null) return;
    if(objs.length > 1 && drop.type=="Space" && drop.hasPiece==false && drop!=character.currSpace){
      if(currRoom!=null && character.currSpace==null){
        if(drop.isDoor && drop.isNextTo==currRoom.name){
          path.push(drop);
          colorSpace(drop, "Orange");
          currSpace = drop;
          character.currSpace = drop;
        }
      } else if(path.length >= 1 && isValidMove(path[path.length-1], drop)){
        path.push(drop);
        colorSpace(drop, "Orange");
        currSpace = drop;
        character.currSpace = drop;
      }
    } else if(objs.length > 1 && drop.type == "Room" && drop.canEnter && path[path.length-1]!=null &&  path[path.length-1].isDoor && path.length<=roll && path[path.length-1].isNextTo==drop.name){
      character.currRoom = drop;
      if(currRoom!=null && currRoom!=character.currRoom){
        clearRoom(currRoom.name, selectedCharacter.name);
        socket.emit('clearRoom', {'rname': currRoom.name, 'cname': selectedCharacter.name});
      }
      currRoom = drop;
      currSpace = null;
      character.currSpace = null;
    }
		update = true;
	});
  character.on("pressup", function(evt) {
    if(selectedCharacter.name != character.name) return;
    var objs = stage.getObjectsUnderPoint(evt.stageX, evt.stageY);
    var drop = null;
    for(var i = 0; i < objs.length; i++){
      if(objs[i].type=="Space" || objs[i].type=="Room"){
        drop = objs[i];
        break;
      }
    }
    if(currSpace!=null && currSpace.hasPiece!=true && (path.length-1==roll)){
      colorSpace(currSpace, "Yellow");
      for(var i=0; i<path.length;i++){
        colorSpace(path[i], "Yellow");
      }
      centerOnSpace(character, currSpace, true);
      handleEndTurn();
      socket.emit('canvasMove', {'name': this.name, 'location' : character.startSpace.name});
    } else if(currRoom!=null &&  path[path.length-1]!=null && path[path.length-1].isDoor && path[path.length-1].isNextTo == currRoom.name && path.length<=roll && currRoom==drop && !hasAccused){
      showPopUp('accuse');
      centerOnRoom(character, currRoom, true);
      hasMoved = true;
      checkHasPassage(currRoom);
      socket.emit('canvasMove', {'name': this.name, 'location' : currRoom.name});
    } else {
      for(var i=0; i<path.length;i++){
        colorSpace(path[i], "Yellow");
      }
      if(currSpace!=null && character.currRoom==null){
        path=[character.startSpace];
        character.currSpace = character.startSpace;
        centerOnSpace(character, character.startSpace, false);
      } else if(currRoom!=null) {
        centerOnRoom(character, currRoom, false);
        character.currSpace = null;
        path=[null];
      }
      update=true;
      return;
    }
  });
  return character;
}

function createCharacters(){
  var msscarlet = createCharacter("Ms. Scarlet",  "space0016", "#DC143C");
  var colMustard = createCharacter("Col. Mustard", "space0723", "#FFA500");
  var mrsWhite = createCharacter("Mrs. White", "space2414", "#FFFFFF");
  var mrGreen = createCharacter("Mr. Green", "space2409", "#008000");
  var mrsPeacock = createCharacter("Mrs. Peacock", "space1800", "#0000FF");
  var profPlum = createCharacter("Prof. Plum", "space0500", "#800080");
  stage.addChild(msscarlet, colMustard, mrsWhite, mrGreen, mrsPeacock, profPlum);
}

function isDoor(spacename){
  return doors.indexOf(spacename)>-1;
}

function isNextToDoor(spacename){
  var ret = null;
  switch(spacename){
    case "space0406":
      ret = "Study";
      break;
    case "space0408":
    case "space0711":
    case "space0712":
      ret = "Hall";
      break;
    case "space0617":
      ret = "Lounge";
      break;
    case "space0817":
    case "space1215":
      ret = "Dining Room";
      break;
    case "space1719":
      ret = "Kitchen";
      break;
    case "space1916":
    case "space1614":
    case "space1609":
    case "space1907":
      ret = "Ballroom";
      break;
    case "space1905":
      ret = "Conservatory";
      break;
    case "space1506":
    case "space1101":
      ret = "Billiard Room";
      break;
    case "space1103":
    case "space0807":
      ret = "Library";
      break;
    default:
      ret = null;
  }
  return ret;
}

function createSquare(i, j, width, height, namex, namey){
  var square = new createjs.Shape();
  if(namex<10){
    namex = "0" + namex;
  }
  if(namey<10){
    namey = "0" + namey;
  }
  square.name = "space" + namey + namex;
  square.width = width;
  square.height = height;
  sqW = square.width;
  sqH = square.height;
  square.xidx = namex;
  square.yidx = namey;

  square.graphics.beginFill("Black").drawRect(0, 0, square.width, square.height);
	square.graphics.beginFill("Yellow").drawRect(1, 1, square.width-2, square.height-2);
	square.x = i;
	square.y = j;
  square.hasPiece = false;
  square.isDoor = isDoor(square.name);
  square.isNextTo = isNextToDoor(square.name);
  square.type = "Space";
  square.scaleX = square.scaleY = square.scale = 1;
  square.on("rollover", function(evt){
    var target = evt.target;
    target.graphics.clear();
    square.graphics.beginFill("Black").drawRect(0, 0, square.width, square.height);
  	square.graphics.beginFill("Orange").drawRect(1, 1, square.width-2, square.height-2);
    update = true;
  });
  square.on("rollout", function(evt){
    var target = evt.target;
    target.graphics.clear();
    square.graphics.beginFill("Black").drawRect(0, 0, square.width, square.height);
  	square.graphics.beginFill("Yellow").drawRect(1, 1, square.width-2, square.height-2);
    update = true;
  });
  return square;
}

function drawRoom(name, x, y, path, squaresX, squaresY, passageroom){
  var img = new Image();
  img.onload = function(){
    var room = new createjs.Bitmap(img);
    room.scaleX = (sqW*squaresX)/img.width;
    room.scaleY = (sqH*squaresY)/img.height;
    room.x = x + leftpad;
    room.y = y + toppad;
    room.name = name;
    room.type = "Room";
    room.passageroom = passageroom;
    room.players = [];
    room.canEnter = (name!="Stairwell");
    stage.addChild(room);
    update = true;
  };
  img.src = path;
}

function drawRooms(){
  drawRoom('Study', 0, 0, 'img/board/Study.png', 7, 4, "Kitchen");
  drawRoom('Hall', sqW*9, 0, 'img/board/Hall.png', 6, 7, null);
  drawRoom('Lounge', sqW*17, 0, 'img/board/Lounge.png', 7, 6, "Conservatory");
  drawRoom('Library', 0, sqH*6, 'img/board/Library.png', 7, 5, null);
  drawRoom('Stairwell', sqW*9, sqH*8, 'img/board/Stairwell.png', 5, 7, null);
  drawRoom('Dining Room', sqW*16, sqH*9, 'img/board/DiningRoom.png', 8, 7, null);
  drawRoom('Billiard Room', 0, sqH*12, 'img/board/BilliardRoom.png', 6, 5, null);
  drawRoom('Conservatory', 0, sqH*19, 'img/board/Conservatory.png', 6, 5, "Lounge");
  drawRoom('Ballroom', sqW*8, sqH*17, 'img/board/Ballroom.png', 8, 8, null);
  drawRoom('Kitchen', sqW*18, sqH*18, 'img/board/Kitchen.png', 6, 6, "Study");
}

function isSpace(i, j){
  //spaces:
    var rows = [[7, 16], [7, 8, 15, 16], [7, 8, 15, 16], [7, 8, 15, 16], [1, 2, 3, 4, 5, 6, 7, 8, 15, 16], [0, 1, 2, 3, 4, 5, 6, 7, 8, 15, 16], ];
    var rows2 = [[6, 7, 8, 15, 16, 17, 18, 19, 20, 21, 22], [7, 8, 9, 10 , 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23]];
    var rows3 = [[7, 8, 14, 15, 16, 17, 18, 19, 20, 21, 22], [7, 8, 14, 15], [6, 7, 8, 14, 15], [1, 2, 3, 4, 5, 6, 7, 8, 14, 15]];
    var rows4 = [[6, 7, 8, 14, 15], [6, 7, 8, 14, 15], [6, 7, 8, 14, 15], [6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]];
    var rows5 = [[6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22], [1, 2, 3, 4, 5, 6, 7, 16, 17, 18, 19, 20, 21, 22, 23]];
    var rows6 = [[0, 1, 2, 3, 4, 5, 6, 7, 16, 17], [5, 6, 7, 16, 17], [6, 7, 16, 17], [6, 7, 16, 17], [6, 7, 16, 17], [7, 8, 9, 14, 15, 16], [9, 14]];
    var xarr = rows.concat(rows2).concat(rows3).concat(rows4).concat(rows5).concat(rows6);
    var yarr = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24];
    for(n=0; n < xarr.length; n++){
      for(m=0; m < xarr[n].length; m++){
        if(n==j && xarr[n][m]==i){
          return true;
        }
      }
    }
  return false;
}

function preloadDice(){
  var img = new Image();
  var img2 = new Image();
  var img3 = new Image();
  var img4 = new Image();
  var img5 = new Image();
  var img6 = new Image();
  img.src = 'img/dice/1.png';
  img2.src = 'img/dice/2.png';
  img3.src = 'img/dice/3.png';
  img4.src = 'img/dice/4.png';
  img5.src = 'img/dice/5.png';
  img6.src = 'img/dice/6.png';
  diceImages.push(img, img2, img3, img4, img5, img6);
}

function rollDice(){
  var d1 = stage.getChildByName('popupBox').getChildByName('d1');
  var button = stage.getChildByName('popupBox').getChildByName('popupOK');
  var text = stage.getChildByName('popupBox').getChildByName('dietext');
  var i = Math.floor(Math.random()*diceImages.length);
  var timelength = 300;
  var rollTimer = setInterval(function(){
                    i = Math.floor(Math.random()*diceImages.length);
                    d1.image = diceImages[i];
                    d1.number = i+1;
                    timelength+=200;
                    update=true;
                    if(timelength > 2000){
                      clearInterval(rollTimer);
                      text.text = 'You rolled a ' + d1.number + '!';
                      sendInfoMessage(' rolled a <b>' + d1.number + '</b>!');
                      text.x = (canvas.width-text.swidth)/2 + (text.swidth - text.getMeasuredWidth())/2;
                      button.visible = true;
                      d1.rolled = true;
                      d1.isRolling = false;
                      d1.cursor = 'no-drop';
                    }
                  }, timelength);
}

function showPopUp(action){
  var popup = stage.getChildByName('popupBox');
  if(action == 'hand'){
    var acidx = 0;
    for(var i = 0; i < handTextList.length; i++){
        if(handTextList[i].type != null){
          handTextList[i].defaultVisible = accusation.indexOf(handTextList[i].text) > -1;
          if(handTextList[i].defaultVisible) {
            acidx++;
          }
          handTextList[i].x = (canvas.width-popup.width)/2 + (popup.width - handTextList[i].getMeasuredWidth())/2;
          handTextList[i].y = (canvas.height-popup.height)/2 + toppad + 35*acidx + handTextList[i].getMeasuredHeight();
        }
    }
  }
  for(var i = 0; i < popup.numChildren; i++){
    if(popup.children[i].action == action || popup.children[i].action == 'always'){
      popup.children[i].visible = popup.children[i].defaultVisible;
    } else {
      popup.children[i].visible = false;
    }
  }
  stage.setChildIndex(popup, stage.getNumChildren()-1); //bring to front
  popup.visible = true;
  update = true;
}

function handleInteraction(event) {
  if(event.target.type == null || event.target.selected==true) return;
  event.target.alpha = (event.type == "mouseover") ? 1 : 0.5;
  update = true;
}

function createHandText(t, fs, type){
  var text = new createjs.Text(t, fs +"px Marker", "Black");
  text.action = 'hand';
  text.name = 'hand' + t;
  text.defaultVisible = true;
  text.visible = true;
  text.type = type;
  text.cursor = (type!=null) ?  'pointer' : 'inherit';
  text.alpha = (type!=null) ?  0.5 : 1;
  text.selected = false;
  var hit = new createjs.Shape();
  hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
  text.hitArea = hit;
  text.on("mouseover", handleInteraction);
  text.on("mouseout", handleInteraction);
  text.on("mousedown", function(evt){
    if(text.type == null) return;
    var handok = evt.target.parent.getChildByName('handOk');
    for(var i = 0; i<handTextList.length; i++){
      if(handTextList[i].text!=evt.target.text && handTextList[i].alpha==1 && handTextList[i].type!=null){
        handTextList[i].alpha = 0.5;
        handTextList[i].selected = false;
        update=true;
      }
    }
    evt.target.alpha = (evt.target.alpha==1) ? 1 : 0.5;
    evt.target.selected = !evt.target.selected;
    if(evt.target.selected){
      handok.selection = evt.target.text;
      handok.image = handok.activeImg;
      handok.cursor = 'pointer';
      handok.canSend = true;
    } else {
      handok.selection = '';
      handok.image = handok.grayscale;
      handok.cursor = 'no-drop';
      handok.canSend = false;
    }
    update = true;
  });
  handTextList.push(text);
  return text;
}

function handleAllPass(){
  showPopUp('final');
}

function createFinalText(t, fs, type){
  var text = new createjs.Text(t, fs +"px Marker", "Black");
  text.action = 'final';
  text.name = t;
  text.defaultVisible = type==null;
  text.visible = true;
  text.cursor = (type!=null) ?  'pointer' : 'inherit';
  text.alpha = (type!=null) ?  0.5 : 1;
  text.type = type;
  text.selected = false;
  var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
	text.hitArea = hit;
  text.on("mouseover", handleInteraction);
  text.on("mouseout", handleInteraction);
  text.on("mousedown", function(evt){
    if(text.type == null) return;
    var finalok = evt.target.parent.getChildByName('finalOK');
    for(var i = 0; i<finalTextList.length; i++){
      if(finalTextList[i].text!=evt.target.text && finalTextList[i].type == evt.target.type && finalTextList[i].alpha==1){
        finalTextList[i].alpha = 0.5;
        finalTextList[i].selected = false;
        update=true;
      }
    }
    evt.target.alpha = (evt.target.alpha==1) ? 1 : 0.5;
    evt.target.selected = !evt.target.selected;
    if(evt.target.selected){
      if(evt.target.type == 'Person'){
        finalok.person = evt.target.text;
      } else if(evt.target.type == 'Weapon') {
        finalok.weapon = evt.target.text;
      } else{
        finalok.room = evt.target.text;
      }
    }
    var hasPerson = false;
    var hasWeapon = false;
    var hasRoom = false;
    for(i = 0; i<finalTextList.length; i++){
      if(finalTextList[i].selected && finalTextList[i].type=='Person'){
        hasPerson = true;
      }
      else if(finalTextList[i].selected && finalTextList[i].type=='Weapon'){
        hasWeapon = true;
      }
      else if(finalTextList[i].selected && finalTextList[i].type=='Room'){
        hasRoom = true;
      }
      if(hasPerson && hasWeapon && hasRoom) break;
    }
    if(hasPerson && hasWeapon && hasRoom){
      finalok.image = finalok.activeImg;
      finalok.cursor = 'pointer';
      finalok.canSend = true;
    } else {
      finalok.image = finalok.grayscale;
      finalok.cursor = 'no-drop';
      finalok.canSend = false;
    }
    update = true;
  });
  finalTextList.push(text);
  return text;
}

function createAccuseText(t, fs, type){
  var text = new createjs.Text(t, fs +"px Marker", "Black");
  text.action = 'accuse';
  text.name = t;
  text.defaultVisible = true;
  text.visible = true;
  text.cursor = (type!=null) ?  'pointer' : 'inherit';
  text.alpha = (type!=null) ?  0.5 : 1;
  text.type = type;
  text.selected = false;
  var hit = new createjs.Shape();
	hit.graphics.beginFill("#000").drawRect(0, 0, text.getMeasuredWidth(), text.getMeasuredHeight());
	text.hitArea = hit;
  text.on("mouseover", handleInteraction);
  text.on("mouseout", handleInteraction);
  text.on("mousedown", function(evt){
    if(text.type == null) return;
    var accuseok = evt.target.parent.getChildByName('accuseOK');
    for(var i = 0; i<accuseTextList.length; i++){
      if(accuseTextList[i].text!=evt.target.text && accuseTextList[i].type == evt.target.type && accuseTextList[i].alpha==1){
        accuseTextList[i].alpha = 0.5;
        accuseTextList[i].selected = false;
        update=true;
      }
    }
    evt.target.alpha = (evt.target.alpha==1) ? 1 : 0.5;
    evt.target.selected = !evt.target.selected;
    if(evt.target.selected){
      if(evt.target.type == 'Person'){
        accuseok.person = evt.target.text;
      } else {
        accuseok.weapon = evt.target.text;
      }
    }
    for(i = 0; i<accuseTextList.length; i++){
      if(accuseTextList[i].selected && accuseTextList[i].text!=evt.target.text && evt.target.selected){
        accuseok.image = accuseok.activeImg;
        accuseok.cursor = 'pointer';
        accuseok.canSend = true;
        break;
      } else {
        accuseok.image = accuseok.grayscale;
        accuseok.cursor = 'no-drop';
        accuseok.canSend = false;
      }
    }
    update = true;
  });
  accuseTextList.push(text);
  return text;
}

function showCard(cardname){
  var deck = weapons.concat(people).concat(rooms);
  var popup = stage.getChildByName('popupBox');
  var width = popup.width;
  var height = popup.height;
  var imgpath = '';
  for(var i = 0; i < deck.length; i++){
    if(deck[i].name == cardname){
      imgpath = deck[i].img;
      break;
    }
  }
  var img = new Image();
  img.onload = function(){
    var showncard =  new createjs.Bitmap(img);
    showncard.name = 'showncard';
    showncard.action = 'card';
    showncard.visible = true;
    showncard.defaultVisible = true;
    showncard.scaleX = showncard.scaleY = (height - popup.getChildByName('cardHeader').getMeasuredHeight() - popup.getChildByName('cardOk').image.height*popup.getChildByName('cardOk').scaleY - 40)/img.height;//((height - popup.getChildByName('cardHeader').getMeasuredHeight())/2)/img.width;
    showncard.x = (canvas.width-width)/2 + (width - showncard.scaleX*img.width)/2;
    showncard.y = (canvas.height-height)/2 + (height - showncard.scaleY*img.height - 20)/2;
    popup.addChild(showncard);
    update=true;
  };
  img.src = imgpath;
  showPopUp('card');
}

function createPopUp(){
  var text = new createjs.Text('It\'s your turn, click the die to roll!', "25px Marker", "Black");
  var width = Math.max(canvas.width*0.3, text.getMeasuredWidth() + 30);
  var height = Math.max((canvas.height - (boardH + toppad*3)) + toppad*2, text.getMeasuredHeight()*6 + toppad*6 + 100);
  var popup = new createjs.Container();
  popup.name = 'popupBox';
  popup.cursor = 'inherit';
  popup.visible = false;
  popup.width = width;
  popup.height = height;
  // need empty events so child doesnt trigger clicks
  popup.on("rollover", function(){});
  popup.on("mousedown", function(evt){
    this.parent.addChild(this);
  	this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
  });
  popup.on("rollout", function(){});
  popup.on("pressmove", function(evt){
    this.x = evt.stageX + this.offset.x;
    this.y = evt.stageY + this.offset.y;
    update = true;
  });

  var bggraphics = new createjs.Graphics().beginFill("White").drawRect((canvas.width-width)/2, (canvas.height-height)/2, width, height);
  var background = new createjs.Shape(bggraphics);
  background.action = 'always';
  background.defaultVisible = true;
  var bggraphics2 = new createjs.Graphics().beginFill("Black").drawRect((canvas.width-width-6)/2, (canvas.height-height-6)/2, width + 6,  height + 6);
  var backgroundBorder = new createjs.Shape(bggraphics2);
  backgroundBorder.action = 'always';
  backgroundBorder.defaultVisible = true;

  var d1 =  new createjs.Bitmap(diceImages[5]);
  d1.name = 'd1';
  d1.number = 6;
  d1.rolled = false;
  d1.action = 'roll';
  d1.defaultVisible = true;
  d1.cursor = 'pointer';
  d1.isRolling = false;
  d1.scaleX = d1.scaleY = (height/2)/diceImages[5].width;
  d1.x = (canvas.width-width)/2 + (width - d1.scaleX*diceImages[5].width)/2;
  d1.y = (canvas.height-height)/2 + (height - d1.scaleY*diceImages[5].height)/2;
  d1.on("mousedown", function (evt) {
    if(!d1.rolled && !d1.isRolling){
      d1.parent.getChildByName('popupStay').visible=false;
      d1.parent.getChildByName('popupPassage').visible=false;
      d1.isRolling = true;
      isPassage = false;
      var passagepop  = stage.getChildByName('popupBox').getChildByName('popupPassage');
      passagepop.image = passagepop.inactiveImg;
      passagepop.cursor = 'no-drop';
      wasCalled = false;
      var staypop  = stage.getChildByName('popupBox').getChildByName('popupStay');
      staypop.image = staypop.inactiveImg;
      staypop.cursor = 'no-drop';
      update=true;
      rollDice();
    }
  });

  text.name = 'dietext';
  text.swidth = width;
  text.action = 'roll';
  text.defaultVisible = true;
  text.x = (canvas.width-width)/2 + (width - text.getMeasuredWidth())/2;
  text.y = (canvas.height-height)/2 + text.getMeasuredHeight() + 5;

  var img = new Image();
  img.onload = function(){
    var okbutton = new createjs.Bitmap(img);
    okbutton.name = 'popupOK';
    okbutton.cursor = 'pointer';
    okbutton.action = 'roll';
    okbutton.defaultVisible = false;
    okbutton.scaleX = okbutton.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    okbutton.x = (canvas.width-width)/2 + (width - okbutton.scaleX*img.width)/2;
    okbutton.y = d1.y + d1.image.height*d1.scaleY + 10;
    okbutton.visible = false;
    okbutton.on("mousedown", function(){
      okbutton.parent.visible = false;
      roll = d1.number;
      update=true;
    });
    popup.addChild(okbutton);
  };
  img.src = 'img/buttons/ok.png';

  var img2 = new Image();
  var img3 = new Image();
  img3.src = 'img/buttons/stay.png';
  img2.onload = function(){
    var staybutton = new createjs.Bitmap(img2);
    staybutton.name = 'popupStay';
    staybutton.cursor = 'no-drop';
    staybutton.action = 'roll';
    staybutton.defaultVisible = true;
    staybutton.activeImg = img3;
    staybutton.inactiveImg = img2;
    staybutton.scaleX = staybutton.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY + 15)/2)/img2.height;
    staybutton.x = (canvas.width-width)/2 + (width - (staybutton.scaleX*img2.width) - (staybutton.scaleX*img2.width) - leftpad)/2;
    staybutton.y = d1.y + d1.image.height*d1.scaleY + 5;
    staybutton.on("mousedown", function(){
      if(wasCalled){
        staybutton.parent.visible = false;
        wasCalled = false;
        staybutton.image = staybutton.inactiveImg;
        staybutton.cursor = 'no-drop';
        update=true;
        showPopUp('accuse');
      }
    });
    popup.addChild(staybutton);
    update=true;
  };
  img2.src = 'img/buttons/stay-grayscale.png';

  var img4 = new Image();
  var img5 = new Image();
  img5.src = 'img/buttons/passage.png';
  img4.onload = function(){
    var passagebutton = new createjs.Bitmap(img4);
    passagebutton.name = 'popupPassage';
    passagebutton.cursor = 'no-drop';
    passagebutton.action = 'roll';
    passagebutton.defaultVisible = true;
    passagebutton.activeImg = img5;
    passagebutton.inactiveImg = img4;
    passagebutton.scaleX = passagebutton.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY + 15)/2)/img4.height;
    passagebutton.x = (canvas.width-width)/2 + (width - passagebutton.scaleX*img4.width + passagebutton.scaleX*img4.width)/2;
    passagebutton.y = d1.y + d1.image.height*d1.scaleY + 5;
    passagebutton.on("mousedown", function(){
      if(isPassage){
        passagebutton.parent.visible = false;
        sendInfoMessage(' has taken a secret passage to the <b>' + currRoom.passageroom + '</b>!');
        clearRoom(currRoom.name, selectedCharacter.name);
        socket.emit('clearRoom', {'rname': currRoom.name, 'cname': selectedCharacter.name});
        socket.emit('canvasMove', {'name': selectedCharacter.name, 'location' : currRoom.passageroom});
        centerOnRoom(stage.getChildByName(selectedCharacter.name), stage.getChildByName(currRoom.passageroom), true);
        hasMoved = true;
        showPopUp('accuse');
        update=true;
      }
    });
    popup.addChild(passagebutton);
    update=true;
  };
  img4.src = 'img/buttons/passage-grayscale.png';

  popup.addChild(backgroundBorder, background, d1, text);

  for(var i = 0; i < people.length; i++){
    var t = createAccuseText(people[i].name, 20, 'Person');
    t.x = (canvas.width-width)/2 + leftpad*4;
    t.y = (canvas.height-height)/2 + toppad*3 + 5 +  10*i + t.getMeasuredHeight()*i;
    popup.addChild(t);
  }
  for(i = 0; i < weapons.length; i++){
    var t2 = createAccuseText(weapons[i].name, 20, 'Weapon');
    t2.x = (canvas.width-width)/2 + leftpad + 230;
    t2.y = (canvas.height-height)/2 + toppad*3 + 5 +  10*i + t2.getMeasuredHeight()*i;
    popup.addChild(t2);
  }
  var header = createAccuseText('Make an accusation:', 20, null);
  header.x = (canvas.width-width)/2 + (width - header.getMeasuredWidth())/2;
  header.y = (canvas.height-height)/2 + header.getMeasuredHeight();

  var okimg = new Image();
  var okimg2 = new Image();
  okimg2.src = 'img/buttons/ok.png';
  okimg.onload = function(){
    var accuseok = new createjs.Bitmap(okimg);
    accuseok.name = 'accuseOK';
    accuseok.cursor = 'no-drop';
    accuseok.action = 'accuse';
    accuseok.grayscale = okimg;
    accuseok.activeImg = okimg2;
    accuseok.weapon = '';
    accuseok.person = '';
    accuseok.defaultVisible = true;
    accuseok.visible = false;
    accuseok.canSend = false;
    accuseok.scaleX = accuseok.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    accuseok.x = (canvas.width-width)/2 + (width - accuseok.scaleX*okimg.width)/2;
    accuseok.y = d1.y + d1.image.height*d1.scaleY + 10;
    accuseok.on("mousedown", function(){
      if(accuseok.canSend){
        accuseok.parent.visible = false;
        accuseok.image = accuseok.grayscale;
        accuseok.cursor = 'no-drop';
        accuseok.canSend = false;
        hasAccused = true;
        socket.emit('wasCalled', {'name': accuseok.person, 'accusor' : selectedCharacter.name, 'location': currRoom.name});
        setTimeout(function(){
          centerOnRoom(stage.getChildByName(accuseok.person), currRoom, true); //Fix to account for stays
          socket.emit('canvasMove', {'name': accuseok.person, 'location' : currRoom.name});
        }, 1000);
        sendInfoMessage(' has accused <b>' + accuseok.person + '</b> with the <b>' + accuseok.weapon + '</b> in the <b>' + currRoom.name + '</b>!');
        for(var i = 0; i<accuseTextList.length; i++){
          if(accuseTextList[i].type!=null){
            accuseTextList[i].alpha = 0.5;
            accuseTextList[i].selected = false;
          }
        }
        socket.emit('getObjections', {person: accuseok.person, weapon: accuseok.weapon, location: currRoom.name});
        update=true;
      }
    });
    popup.addChild(accuseok);
  };
  okimg.src = 'img/buttons/ok-grayscale.png';

  var handHeader = createHandText('Choose a card to show!', 20, null);
  handHeader.x = (canvas.width-width)/2 + (width - handHeader.getMeasuredWidth())/2;
  handHeader.y = (canvas.height-height)/2 + handHeader.getMeasuredHeight();

  for(var i = 0; i < hand.length; i++){
    var h = createHandText(hand[i].name, 20, hand[i].type);
    popup.addChild(h);
  }

  var handokimg = new Image();
  var handokimg2 = new Image();
  handokimg2.src = 'img/buttons/ok.png';
  handokimg.onload = function(){
    var handOk = new createjs.Bitmap(handokimg);
    handOk.name = 'handOk';
    handOk.cursor = 'no-drop';
    handOk.action = 'hand';
    handOk.grayscale = okimg;
    handOk.activeImg = okimg2;
    handOk.selection = '';
    handOk.defaultVisible = true;
    handOk.visible = false;
    handOk.canSend = false;
    handOk.scaleX = handOk.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    handOk.x = (canvas.width-width)/2 + (width - handOk.scaleX*handokimg.width)/2;
    handOk.y = d1.y + d1.image.height*d1.scaleY + 10;
    handOk.on("mousedown", function(){
      if(handOk.canSend){
        handOk.parent.visible = false;
        handOk.image = handOk.grayscale;
        handOk.cursor = 'no-drop';
        handOk.canSend = false;
        isObjecting = false;
        if(isTurn){
          handleNewTurn();
        }
        socket.emit('showCard', handOk.selection);
        for(var i = 0; i<handTextList.length; i++){
          if(handTextList[i].type!=null){
            handTextList[i].alpha = 0.5;
            handTextList[i].selected = false;
          }
        }
        update=true;
      }
    });
    popup.addChild(handOk);
  };
  handokimg.src = 'img/buttons/ok-grayscale.png';

  var finalHeader = createFinalText('Everyone has passed, make a final accusation?', 20, null);
  finalHeader.x = (canvas.width-width)/2 + (width - finalHeader.getMeasuredWidth())/2;
  finalHeader.y = (canvas.height-height)/2 + finalHeader.getMeasuredHeight();

  for(var i = 0; i < people.length; i++){
    var f = createFinalText(people[i].name, 20, 'Person');
    f.x = (canvas.width-width)/2 + leftpad*2;
    f.y = (canvas.height-height)/2 + toppad*3 + 5 +  10*i + f.getMeasuredHeight()*i;
    popup.addChild(f);
  }
  for(i = 0; i < weapons.length; i++){
    var f2 = createFinalText(weapons[i].name, 20, 'Weapon');
    f2.x = (canvas.width-width)/2 + leftpad + 170;
    f2.y = (canvas.height-height)/2 + toppad*3 + 5 +  10*i + f2.getMeasuredHeight()*i;
    popup.addChild(f2);
  }
  for(i = 0; i < rooms.length; i++){
    var f3 = createFinalText(rooms[i].name, 20, 'Room');
    f3.x = (canvas.width-width)/2 + leftpad + 300;
    f3.y = (canvas.height-height)/2 + toppad*3 + 5 +  10*i + f3.getMeasuredHeight()*i;
    popup.addChild(f3);
  }

  var finalokimg = new Image();
  var finalokimg2 = new Image();
  finalokimg2.src = 'img/buttons/ok.png';
  finalokimg.onload = function(){
    var finalok = new createjs.Bitmap(finalokimg);
    finalok.name = 'finalOK';
    finalok.cursor = 'no-drop';
    finalok.action = 'final';
    finalok.grayscale = okimg;
    finalok.activeImg = okimg2;
    finalok.weapon = '';
    finalok.person = '';
    finalok.room = '';
    finalok.defaultVisible = false;
    finalok.visible = false;
    finalok.canSend = false;
    finalok.scaleX = finalok.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    finalok.x = (canvas.width-width)/2 + (width - finalok.scaleX*okimg.width)/2;
    finalok.y = d1.y + d1.image.height*d1.scaleY + 10;
    finalok.on("mousedown", function(){
      if(finalok.canSend){
        finalok.parent.visible = false;
        finalok.image = finalok.grayscale;
        finalok.cursor = 'no-drop';
        finalok.canSend = false;
        socket.emit('finalAccuse', {'person': finalok.person, 'weapon': finalok.weapon, 'room' : finalok.room});
        centerOnRoom(stage.getChildByName(finalok.person), stage.getChildByName(finalok.room), true);
        socket.emit('canvasMove', {'name': finalok.person, 'location' : finalok.room});
        socket.emit('wasCalled', {'name': finalok.person, 'accusor' : selectedCharacter.name, 'location': finalok.room});
        sendInfoMessage(' has made a <b>final</b> accusation of: <b>' + finalok.person + '</b> with the <b>' + finalok.weapon + '</b> in the <b>' + currRoom.name + '</b>!');
        for(var i = 0; i<accuseTextList.length; i++){
          if(finalTextList[i].type!=null){
            finalTextList[i].alpha = 0.5;
            finalTextList[i].selected = false;
          }
        }
        update=true;
      }
    });
    popup.addChild(finalok);
  };
  finalokimg.src = 'img/buttons/ok-grayscale.png';

  var finalyesimg = new Image();
  finalyesimg.onload = function(){
    var finalYes = new createjs.Bitmap(finalyesimg);
    finalYes.name = 'finalYes';
    finalYes.scaleX = finalYes.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    finalYes.x =  (canvas.width-width)/2 + (width - finalYes.scaleX*finalyesimg.width - finalYes.scaleX*finalyesimg.width)/2;
    finalYes.y = (canvas.height-height)/2 + (height - finalYes.scaleY*finalyesimg.height)/2;
    finalYes.action = 'final';
    finalYes.defaultVisible = true;
    finalYes.visible = false;
    finalYes.cursor = 'pointer';
    finalYes.on("mousedown", function(){
      for(var i = 0; i < finalTextList.length; i++){
        finalTextList[i].visible = true;
      }
      popup.getChildByName('finalOK').visible = true;
      popup.getChildByName('finalNo').visible = false;
      finalYes.visible = false;
      var fheader = popup.getChildByName('Everyone has passed, make a final accusation?');
      fheader.text = 'Select a final accusation:';
      fheader.x = (canvas.width-width)/2 + (width - fheader.getMeasuredWidth())/2;
      fheader.y = (canvas.height-height)/2 + fheader.getMeasuredHeight();
      update = true;
    });
    popup.addChild(finalYes);
  };
  finalyesimg.src = 'img/buttons/yes.png';

  var finalnoimg = new Image();
  finalnoimg.onload = function(){
    var finalNo = new createjs.Bitmap(finalnoimg);
    finalNo.name = 'finalNo';
    finalNo.scaleX = finalNo.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    finalNo.x =  (canvas.width-width)/2 + (width - finalNo.scaleX*finalnoimg.width + finalNo.scaleX*finalnoimg.width)/2;
    finalNo.y = (canvas.height-height)/2 + (height - finalNo.scaleY*finalnoimg.height)/2;
    finalNo.action = 'final';
    finalNo.defaultVisible = true;
    finalNo.visible = false;
    finalNo.cursor = 'pointer';
    finalNo.on("mousedown", function(){
      finalNo.parent.visible = false;
      sendInfoMessage(' has <b>not</b> made a final accusation.');
      socket.emit('endTurn', null);
      update = true;
    });
    popup.addChild(finalNo);
  };
  finalnoimg.src = 'img/buttons/no.png';

  //(canvas.width-width)/2 + (width - (staybutton.scaleX*img2.width) - (staybutton.scaleX*img2.width) - leftpad)/2;

  var cardHeader = new createjs.Text('You were shown:', "20px Marker", "Black");
  cardHeader.action = 'card';
  cardHeader.name = 'cardHeader';
  cardHeader.defaultVisible = true;
  cardHeader.visible = false;
  cardHeader.x = (canvas.width-width)/2 + (width - cardHeader.getMeasuredWidth())/2;
  cardHeader.y = (canvas.height-height)/2 + cardHeader.getMeasuredHeight();

  var cardOkimg = new Image();
  cardOkimg.onload = function(){
    var cardOk = new createjs.Bitmap(cardOkimg);
    cardOk.name = 'cardOk';
    cardOk.cursor = 'pointer';
    cardOk.action = 'card';
    cardOk.defaultVisible = true;
    cardOk.visible = false;
    cardOk.scaleX = cardOk.scaleY = ((height - text.getMeasuredHeight() - d1.image.height*d1.scaleY - 5)/2)/img.height;
    cardOk.x = (canvas.width-width)/2 + (width - cardOk.scaleX*cardOkimg.width)/2;
    cardOk.y = d1.y + d1.image.height*d1.scaleY + 10;
    cardOk.on("mousedown", function(){
      cardOk.parent.visible = false;
      cardOk.parent.removeChild(cardOk.parent.getChildByName('showncard'));
      isLooking = false;
      if(isTurn){
        handleNewTurn();
      }
      update=true;
    });
    popup.addChild(cardOk);
  };
  cardOkimg.src = 'img/buttons/ok.png';

  popup.addChild(header, handHeader, cardHeader, finalHeader);
  stage.addChild(popup);
  update=true;
}

function createBoard(){
  //24x25 squares
  var whsize = Math.min(wrapper.width()*0.5, wrapper.height()*0.7);
  var height = whsize / 25;//(canvas.height - 50)/25;
  var width = height;
  var spaces = [];
  for(i=0; i < 24; i++){
    for(j=0; j < 25; j++){
      if(isSpace(i,j)){
        var sq = createSquare(i*width + leftpad, j*height + toppad, width, height, i, j);
        spaces.push(sq);
      }
    }
  }
  boardW = width*24;
  boardH = height*25;
  var bggraphics = new createjs.Graphics().beginFill("#cc6633").drawRect(0 + leftpad - 10, 0 + toppad - 10, boardW + 20, boardH + 20);
  var background = new createjs.Shape(bggraphics);
  var bggraphics2 = new createjs.Graphics().beginFill("Black").drawRect(0 + leftpad - 10 - 2, 0 + toppad - 10 - 2, boardW + 20 + 4, boardH + 20 + 4);
  var backgroundBorder = new createjs.Shape(bggraphics2);
  stage.addChild(backgroundBorder, background);
  drawRooms();
  for(var i = 0; i < spaces.length; i++){
    stage.addChild(spaces[i]);
    if(spaces[i].isDoor){
      createDoorText(spaces[i]);
    }
  }
  console.log(boardW + 'x' + boardH + ' game created');
  update=true;
}

function createCard(name, x, y, image, i){
  var img = new Image();
  img.onload = function(){
    var card = new createjs.Bitmap(img);
    card.scaleX = card.scaleY = (canvas.height - (boardH + toppad*3))/img.height;
    card.cursor = "pointer";
    card.x = x + i*(img.width*card.scaleX) + leftpad;
    card.y = y;
    card.on("mousedown", function (evt) {
			this.parent.addChild(this);
			this.offset = {x: this.x - evt.stageX, y: this.y - evt.stageY};
		});
		card.on("pressmove", function (evt) {
			this.x = evt.stageX + this.offset.x;
			this.y = evt.stageY + this.offset.y;
			update = true;
		});

    card.name = name;
    card.type = "Card";
    stage.addChild(card);
    update = true;
  };
  img.src = image;
}

function createCards(hand){
  for(var i=0; i<hand.length; i++){
      createCard(hand[i].name+'Card', leftpad, boardH + toppad*2, hand[i].img, i);
  }
}

function disableCard(card){
  card.image = card.grayscale;
  card.canSelect = false;
  card.cursor = 'no-drop';
}

function createNoteBox(i, j, width, height, namex, namey){
  var box = new createjs.Bitmap(noteBoxImages[0]);
  box.name = "box" + namey + namex;
  box.currImage = 0;
  box.scaleX = width/noteBoxImages[box.currImage].width;
  box.scaleY = height/noteBoxImages[box.currImage].height;
  box.cursor = 'pointer';
	box.x = boardW + leftpad*2 + i*width + 130;
	box.y = toppad + j*height + 15;
  if(j >= 6){
    box.y+=25;
  }
  if(j >= 12){
    box.y+=25;
  }
  box.on("mousedown", function(evt){
    box.currImage = (box.currImage + 1) % noteBoxImages.length;
    box.image = noteBoxImages[box.currImage];
    update = true;
  });
  return box;
}

function createDoorText(sq){
  var text = new createjs.Text('D', '20px Marker', "Black");
  text.maxWidth = sq.width;
  text.maxHeight = sq.height;
  text.x = sq.x + (sq.width - text.getMeasuredWidth())/2;
  text.y = sq.y + (sq.height - text.getMeasuredHeight())/2;
  stage.addChild(text);
  update = true;
}

function createNoteText(i, box){
  var idxText = 'NOT FOUND';
  if(i <= 5){
    idxText = people[i].name;
  } else if(i <= 11){
    idxText = weapons[i-6].name;
  } else{
    idxText = rooms[i-12].name;
  }
  var text = new createjs.Text(idxText, "20px Marker", "black");
  text.x = box.x - 120;
  text.y = box.y + sqH - text.getMeasuredHeight() -1;
  return text;
}

function createNoteUnderline(i, box){
  var graphics = new createjs.Graphics().beginFill("black").drawRect(box.x-120, box.y + sqH -1, 120, 2);
  var shape = new createjs.Shape(graphics);
  return shape;
}

function createNotesHeader(name, color, pos, container){
  var sub = '';
  if(name == '(You)'){
    sub = name;
  } else {
    sub = name.substr(0, letteridx);
    while(lettersUsed.indexOf(sub) > -1 && sub!=name){
      letteridx++;
      sub = name.substr(0, letteridx);
    }
    lettersUsed.push(sub);
    letteridx = 1;
  }
  var text = new createjs.Text(sub, "18px Marker", color);
  text.maxWidth = sqW;
  var locationbox = container.getChildByName('box0' + pos);
  if(text.getMeasuredWidth() >= text.maxWidth){
    text.x = locationbox.x;
  } else {
    text.x = locationbox.x + (sqW - text.getMeasuredWidth())/2;
  }
  text.y = locationbox.y - (sqH + text.getMeasuredHeight())/2;
  return text;
}

function createNotes(){
  var notesContainer = new createjs.Container();
  notesContainer.name = 'notesContainer';
  for(var i = 0; i < 7; i++){
    for(var j = 0;j < 21; j++){
      var box = createNoteBox(i, j, sqW, sqH, i, j);
      notesContainer.addChild(box);
      if(i==0){
        notesContainer.addChild(createNoteText(j, box));
        notesContainer.addChild(createNoteUnderline(j, box));
      }
    }
  }
  for(i = 0; i < characters.length; i++){
    if(characters[i].client!=null && characters[i].client.name!=selectedCharacter.name){
      notesContainer.addChild(createNotesHeader(characters[i].client.username.toUpperCase(), characters[i].client.color, characters[i].client.position, notesContainer));
    } else if(characters[i].client!=null && characters[i].client.name==selectedCharacter.name){
        notesContainer.addChild(createNotesHeader('(You)', characters[i].client.color, characters[i].client.position, notesContainer));
    }
  }
  stage.addChild(notesContainer);
  update = true;
}

function preloadNotesImages(){
  var img = new Image();  // -empty-
  var img2 = new Image(); // -
  var img3 = new Image(); // 2
  var img4 = new Image(); // 3
  var img5 = new Image(); // X
  img.src = 'img/notes/notesempty.png';
  img2.src = 'img/notes/notesdash.png';
  img3.src = 'img/notes/notes2.png';
  img4.src = 'img/notes/notes3.png';
  img5.src = 'img/notes/notesX.png';
  noteBoxImages.push(img, img2, img3, img4, img5);
}

function createSelectionText(t, card, color){
  var text = new createjs.Text(t, "45px Marker", color);
  text.name = 'selectionText' + t;
  text.maxWidth = (card.image.width*card.scaleX);
  if(text.getMeasuredWidth() >= text.maxWidth){
    text.x = card.x;
  } else {
    text.x = card.x + (card.image.width*card.scaleX - text.getMeasuredWidth())/2;
  }
  text.y = card.y + card.image.height*card.scaleY + toppad;
  if(stage.getChildByName(text.name)==null){
    stage.addChild(text);
  }
  update = true;
}

function showConfirm(card, box){
  if(box==null){
    var img = new Image();
    var img2 = new Image();
    img2.src = "img/buttons/confirm.png";
    img.onload = function(){
      var newbox = new createjs.Bitmap(img);
      newbox.name = "confirmBox";
      newbox.scaleX = newbox.scaleY = ((card.image.width*card.scaleX) - 10)/img.width;
      newbox.x = card.x + leftpad;
      newbox.y = card.y + card.image.height*card.scaleY + toppad;
      newbox.cursor = "pointer";
      newbox.selection = card;
      newbox.on('rollover', function(evt){
        newbox.image = img2;
        update=true;
      });
      newbox.on('rollout', function(evt){
        newbox.image = img;
        update=true;
      });
      newbox.on('mousedown', function(evt){
        var color = '';
        switch(evt.target.selection.name){
          case 'Ms. Scarlet':
            color = '#DC143C';
            break;
          case 'Col. Mustard':
            color = '#FFA500';
            break;
          case 'Mrs. White':
            color = '#DEB887';
            break;
          case 'Mr. Green':
            color = '#008000';
            break;
          case 'Mrs. Peacock':
            color = '#0000FF';
            break;
          case 'Prof. Plum':
            color = '#800080';
            break;
          default:
            color = '#0000FF';
        }
        socket.emit('characterSelected', {'name': newbox.selection.name, 'username': username, 'color': color});
        stage.removeChild(stage.getChildByName('confirmBox'));
        createSelectionText('(You)', newbox.selection, color);
        disableCard(evt.target.selection);
        update=true;

      });
      stage.addChild(newbox);
    };
    img.src = "img/buttons/confirm-grayscale.png";
  } else {
    box.selection = card;
    box.x = card.x + leftpad;
    box.y = card.y + card.image.height*card.scaleY + toppad;
    box.visible = true;
  }
  update=true;
}

function createChooseOption(name, image, grayscale, pos, character){
  var disabled = character.client!=null;
  var img2 = new Image();
  img2.src = grayscale;
  var img = new Image();
  img.onload = function(){
    var card = new createjs.Bitmap(img);
    var startbutton = stage.getChildByName('StartButton');
    card.scaleX = (canvas.width/6 - leftpad)/img.width;
    card.scaleY = (canvas.height*0.4 - toppad)/img.height; // - (startbutton.y - (startbutton.image.height * startbutton.scaleY))
    card.cursor = "pointer";
    card.x = leftpad + pos*(img.width*card.scaleX + 10);
    card.y = toppad + 50;
    card.name = name;
    card.type = "Card";
    card.grayscale = img2;
    card.canSelect = !disabled;
    if(disabled){
      card.image = card.grayscale;
      card.canSelect = false;
      card.cursor = 'no-drop';
      createSelectionText('('+ character.client.username +')', card, character.color);
    }
    card.on("mousedown", function(evt){
      if(!card.canSelect || selectedCharacter.name!='Spectator')
          return;
      if(stage.getChildByName('confirmBox')!=null){
        showConfirm(evt.target, stage.getChildByName('confirmBox'));
      } else {
        showConfirm(evt.target, null);
      }
    });
    stage.addChild(card);
    update = true;
  };
  img.src = image;
}

function updateCharacters(char){
  characters=char;
}

function createMenu(){
  //start button
  if(isHost){
    var img = new Image();
    img.onload = function(){
      var start = new createjs.Bitmap(img);
      start.scaleX = start.scaleY = (canvas.width*0.2)/img.width;
      start.cursor = "no-drop";
      start.inactiveImg = img;
      start.hasClicked = false;
      start.x = (canvas.width - (img.width*start.scaleX)) / 2;
      start.y = ((canvas.height - (img.height*start.scaleY)) / 2) + canvas.height*0.3;
      start.name = "StartButton";
      start.type = "Button";
      stage.addChild(start);
      update = true;
    };
    img.src = "img/buttons/startbutton-grayscale.png";
  }
  //text
  var text = new createjs.Text("Choose your character!", "45px Marker", "black");
  text.maxWidth = canvas.width*0.3;
  text.x = (canvas.width - text.getMeasuredWidth())/2;
  text.y = toppad;
  stage.addChild(text);
  //characters
  for(var i=0; i<characters.length; i++){
      createChooseOption(characters[i].name, "img/people/" + characters[i].img,
          "img/people/" + characters[i].img_grayscale, i, characters[i]);
  }
}

function playMusic(event){
  if(event.src == "music/charselectmusic.mp3"){
    selectmusic = createjs.Sound.play(event.src, {loop: -1, volume: 0.5});
  } else if (event.src == "music/backgroundmusic.mp3") {
    music = createjs.Sound.play(event.src, {loop: -1, volume: 0.5});
    music.stop();
  } else {
    victorymusic = createjs.Sound.play(event.src, {loop: -1, volume: 0.5});
    victorymusic.stop();
  }
}

function startGame(){
  stage.removeAllChildren();
  createBoard();
  createCharacters();
  createNotes();
  createPopUp();
  selectmusic.stop();
  clearInterval(availtimer);
  clearInterval(playbuttontimer);
  music.play({loop: -1, volume: 0.5});
}

function enablePlayButton(){
  if(stage==null ||  stage.getChildByName('StartButton')==null || stage.getChildByName('StartButton').hasClicked) return;
  var img2 = new Image();
  img2.onload = function(){
    var start = stage.getChildByName('StartButton');
    start.cursor = "pointer";
    start.activeImg = img2;
    start.on('mousedown', function(evt){
      if(!start.hasClicked){
        socket.emit('startGame', null);
        start.image = start.inactiveImg;
        start.cursor = 'no-drop';
        start.hasClicked = true;
        update = true;
      }
    });
    start.image = img2;
    update=true;
  };
  img2.src = "img/buttons/startbutton.png";
}

function mustPass(){
  if(currRoom==null){
    isBlocked = false;
    return false;
  }
  var ret = false;
  for(var i = 0; i < rooms.length; i++){
    if(rooms[i].name == currRoom.name && rooms[i].doors.length > 1){
      for(var j = 0; j < rooms[i].doors.length; j++){
        ret = ret && stage.getChildByName(rooms[i].doors[j]).hasPiece;
      }
      break;
    } else if(rooms[i].name == currRoom.name && rooms[i].doors.length <= 1){
        isBlocked = stage.getChildByName(rooms[i].doors[0]).hasPiece;
        break;
    }
  }
  return ret;
}

function handleEndTurn(){
  socket.emit('endTurn', null);
  isTurn = false;
}

function handleNewTurn(){
  if(outOfGame){
    sendInfoMessage(' is out of the game and their turn was skipped.');
    handleEndTurn();
    return;
  }
  if(mustPass()){
    if(!wasCalled){
      sendInfoMessage(' is blocked and <b>must pass</b> their turn!');
      handleEndTurn();
    } else {
      sendInfoMessage(' is blocked and <b>must</b> stay!');
      showPopUp('accuse');
    }
    return;
  }
  if(isObjecting || isLooking){
      return;
  }
  var d1 = stage.getChildByName('popupBox').getChildByName('d1');
  var text = stage.getChildByName('popupBox').getChildByName('dietext');
  if(!isBlocked){
    text.text = 'It\'s your turn, click the die to roll.';
    text.x = (canvas.width-text.swidth)/2 + (text.swidth - text.getMeasuredWidth())/2;
    d1.rolled = false;
    d1.isRolling = false;
    d1.cursor = 'pointer';
    d1.defaultVisible = true;
    roll=0;
  } else {
    d1.defaultVisible = false;
    text.text = 'You are blocked!';
    text.x = (canvas.width-text.swidth)/2 + (text.swidth - text.getMeasuredWidth())/2;
  }
  hasMoved = false;
  hasAccused = false;
  showPopUp('roll');
}

function init() {
	stage = new createjs.Stage("canvas");
	createjs.Touch.enable(stage); // enable touch interactions if supported on the current device:
	stage.enableMouseOver(10); // enabled mouse over / out events
	stage.mouseMoveOutside = true; // keep tracking the mouse even when it leaves the canvas
  createMenu();
  var audioPath = "music/";
  var sounds = [
      {id:"Music", src:"backgroundmusic.mp3"},
      {id:"Select Music", src:"charselectmusic.mp3"},
      {id:"Victory Music", src:"victory.mp3"}
  ];
  createjs.Sound.alternateExtensions = ["mp3"];
  createjs.Sound.addEventListener("fileload", playMusic);
  createjs.Sound.registerSounds(sounds, audioPath);
  createjs.Sound.alternateExtensions = ["mp3"];
	createjs.Ticker.setFPS(60);
  createjs.Ticker.addEventListener("tick", tick);
}

function tick(event) {
	// this set makes it so the stage only re-renders when an event handler indicates a change has happened.
	if (update) {
		update = false; // only update once
		stage.update(event);
	}
}
