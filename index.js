/*jshint esversion: 6 */
var deck = require('././js/GameJS/Cards/Deck');
var http = require('http');
var express = require('express');
var app = express();
var server = http.createServer(app);
var port = 3000;
var io = require('socket.io');
//socket.io
var sio = io.listen(server);
var UUID = require('node-uuid');

app.use(express.static(__dirname + '/')); //for external stylesheet

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

app.use(function (req, res, next) {
    res.status(404).sendFile(__dirname + '/404.html');
});

server.listen(port, "0.0.0.0", (err) => {
    if (err) {
        return console.log('Something bad happened!', err);
    }
    console.log(`server is listening on ${port}`);
});

var connectedCount = 0;
var connectedClients = [];

var Indexcharacters = [{name: "Ms. Scarlet", img: "msscarlet.png", grayscale: "msscarlet-grayscale.png", client: null, color: "#DC143C"},
                  {name: "Col. Mustard", img: "colmustard.png", grayscale: "colmustard-grayscale.png", client: null, color: "#FFA500"},
                  {name: "Mrs. White", img: "mrswhite.png", grayscale: "mrswhite-grayscale.png", client: null, color: "#DEB887"},
                  {name: "Mr. Green", img: "mrgreen.png", grayscale: "mrgreen-grayscale.png", client: null, color: "#008000"},
                  {name: "Mrs. Peacock", img: "mrspeacock.png", grayscale: "mrspeacock-grayscale.png", client: null, color: "#0000FF"},
                  {name: "Prof. Plum", img: "profplum.png", grayscale: "profplum-grayscale.png", client: null, color: "#800080"}];

//var people = [{name: "Ms. Scarlet", img: "img/people/msscarlet.png", grayscale: "img/people/msscarlet-grayscale.png", type: "Person"},
//              {name: "Col. Mustard", img: "img/people/colmustard.png", grayscale: "img/people/colmustard-grayscale.png", type: "Person"},
//              {name: "Mrs. White", img: "img/people/mrswhite.png", grayscale: "img/people/mrswhite-grayscale.png", type: "Person"},
//              {name: "Mr. Green", img: "img/people/mrgreen.png", grayscale: "img/people/mrgreen-grayscale.png", type: "Person"},
//              {name: "Mrs. Peacock", img: "img/people/mrspeacock.png", grayscale: "img/people/mrspeacock-grayscale.png", type: "Person"},
//              {name: "Prof. Plum", img: "img/people/profplum.png", grayscale: "img/people/profplum-grayscale.png", type: "Person"}];

//var weapons = [{name: "Candlestick", img: "img/weapons/candlestick.png", grayscale: "img/weapons/candlestick-grayscale.png", type: "Weapon"},
//               {name: "Knife", img: "img/weapons/knife.png", grayscale: "img/weapons/knife-grayscale.png", type: "Weapon"},
//               {name: "Lead Pipe", img: "img/weapons/leadpipe.png", grayscale: "img/weapons/leadpipe-grayscale.png", type: "Weapon"},
//               {name: "Revolver", img: "img/weapons/revolver.png", grayscale: "img/weapons/revolver-grayscale.png", type: "Weapon"},
//               {name: "Rope", img: "img/weapons/rope.png", grayscale: "img/weapons/rope-grayscale.png", type: "Weapon"},
//               {name: "Wrench", img: "img/weapons/wrench.png", grayscale: "img/weapons/wrench-grayscale.png", type: "Weapon"}];

//var rooms = [{name: "Ballroom", img: "img/rooms/ballroom.png", grayscale: "img/rooms/ballroom-grayscale.png", type: "Room"},
//             {name: "Billiard Room", img: "img/rooms/billiardroom.png", grayscale: "img/rooms/billiardroom-grayscale.png", type: "Room"},
//             {name: "Conservatory", img: "img/rooms/conservatory.png", grayscale: "img/rooms/conservatory-grayscale.png", type: "Room"},
//             {name: "Dining Room", img: "img/rooms/diningroom.png", grayscale: "img/rooms/diningroom-grayscale.png", type: "Room"},
//             {name: "Hall", img: "img/rooms/hall.png", grayscale: "img/rooms/hall-grayscale.png", type: "Room"},
//             {name: "Kitchen", img: "img/rooms/kitchen.png", grayscale: "img/rooms/kitchen-grayscale.png", type: "Room"},
//             {name: "Library", img: "img/rooms/library.png", grayscale: "img/rooms/library-grayscale.png", type: "Room"},
//             {name: "Lounge", img: "img/rooms/lounge.png", grayscale: "img/rooms/lounge-grayscale.png", type: "Room"},
//             {name: "Study", img: "img/rooms/study.png", grayscale: "img/rooms/study-grayscale.png", type: "Room"}];

//var deck = new deck();//people.concat(weapons).concat(rooms);
var hasPerson = false;
var hasWeapon = false;
var hasRoom = false;
var solution = [];
var players = []; // should contain {client: '', currSpace: '', hand: '', host: '', currTurn}
var host = null;
var needsShown = null;
var allPass = true;
var turn = 0;
var votestart = 0;

function dealHands(deck){
  var numplayers = players.length;
  shuffle(deck);
  while(deck.length > 0){
    var i = Math.floor(Math.random()*deck.length);
    var card = deck[i];
    var currPlayer = players[deck.length%numplayers];
    currPlayer.hand.push(card);
    deck.splice(i, 1);
  }
  for(var j= 0; j < players.length; j++){
    players[j].client.emit('updateHand', {'hand': players[j].hand});
  }
}

function restartGame(){
  deck = people.concat(weapons).concat(rooms);
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }
}

function createMurder(deck){
  while(hasPerson==false || hasWeapon==false || hasRoom==false){
    var i = -1;
    while(deck[i]==null){
      i = Math.floor((Math.random()*deck.length));
    }
    if(deck[i].type=='Person' && !hasPerson){
      hasPerson=true;
      solution.push(deck[i]);
      deck.splice(i, 1);
      continue;
    }
    else if(deck[i].type=='Weapon' && !hasWeapon){
      hasWeapon=true;
      solution.push(deck[i]);
      deck.splice(i, 1);
      continue;
    }
    else if(deck[i].type=='Room' && !hasRoom){
      hasRoom=true;
      solution.push(deck[i]);
      deck.splice(i, 1);
      continue;
    }
  }
  //console.log(solution);
}


sio.sockets.on('connection', function (client) {
    /*
      all user emit: sio.sockets.emit
      ONLY client emit: client.emit
      all BUT client: client.broadcast.emit
    */
    connectedCount++;
    client.userid = UUID();
    connectedClients.push(client.userid);
    client.username = null;
    client.character = null;
  //  if(connectedCount == 1){
      client.emit('isHost', null);
    //  host = client;
  //  }

    client.emit('onconnected', { id: client.userid, usercount: connectedCount});
    //console.log('\t socket.io:: player ' + client.userid + ' connected');
    client.on('disconnect', function () {
        //console.log('\t socket.io:: client disconnected ' + client.userid );
        connectedClients.splice(connectedClients.indexOf(client), 1);
        connectedCount--;
        //console.log('Current connections: ' + connectedCount);
        sio.sockets.emit('sendServerMessage', '<i><b>'+ client.username + '</b> has left the game.</i>');
    });
    client.on('newmsg', function (data) {
        sio.sockets.emit('newmsg', data);
    });
    client.on('infomsg', function (data) {
        sio.sockets.emit('infomsg', data);
    });
    client.on('checkPlayEnable', function (data) {
      if(players.length >=3){
        client.emit('enablePlay', null);
      }
    });
    client.on('characterSelected', function (data) {
      for(var i = 0; i < Indexcharacters.length; i ++){
        if(Indexcharacters[i].name == data.name){
          client.broadcast.emit('characterSelected', data);
          client.emit('updateCharacter', {name: Indexcharacters[i].name, color: Indexcharacters[i].color});
          players.push({'client': client, 'hand': [], 'character' : Indexcharacters[i].name, 'color': Indexcharacters[i].color});
          if(Indexcharacters[i].name == 'Ms. Scarlet' && players.length > 1){
            var tmp = players[players.length-1];
            players[players.length-1] = players[0];
            players[0] = tmp;
          }
          Indexcharacters[i].client = {'name': data.name, 'username': data.username, 'color': data.color, position: players.length-1};
        }
      }
    });
    client.on('startGame', function(data){
      votestart++;
      client.emit('callinfomsg', ' has voted to start the game.');
        if (votestart == players.length) {
            deck = new deck();
            deck.prototype.Shuffle();
        //shuffle(deck);
        createMurder(deck.cards);
        dealHands(deck.cards);
        sio.sockets.emit('startGame', data);
        players[0].client.emit('newTurn', data);
        turn++;
      } else {
        sio.sockets.emit('sendServerMessage', '<b>' + (players.length - votestart) + '</b> votes required to start.');
      }
    });
    client.on('setuser', function (data) {
        client.emit('setuser', data);
    });
    client.on('endTurn', function (data) {
      players[turn%players.length].client.emit('newTurn', data);
      turn++;
      client.emit('endTurn', null);
    });
    client.on('checkAvailableCharacters', function (data) {
        client.emit('checkAvailableCharacters', JSON.stringify(Indexcharacters));
    });
    client.on('canvasMove', function (data) {
        client.broadcast.emit('canvasMove', data);
    });
    client.on('wasCalled', function (data) {
        client.broadcast.emit('wasCalled', data);
    });
    client.on('clearSpace', function (data) {
        client.broadcast.emit('clearSpace', data);
    });
    client.on('clearRoom', function (data) {
        client.broadcast.emit('clearRoom', data);
    });
    client.on('newuserconnect', function (data) {
        client.username = data.username;
        client.broadcast.emit('sendServerMessage', '<i><b>'+ data.username + '</b> has joined the game.</i>');
    });
    client.on('showCard', function (data) {
        needsShown.emit('showCard', data);
        needsShown.emit('privatemsg', {msg: 'You have been shown the <b>' + data + '</b>.'});
    });
    client.on('getObjections', function (data) {
        needsShown = client;
        allPass = true;
        var numguesses = 0;
        for(var i=turn%players.length; i<players.length; i++){
          var hasObjection = false;
          var pl = players[i];
          if(numguesses>=players.length){
            break;
          }
          numguesses++;
          if(pl.client == client) { continue; }
          for(var j = 0; j < pl.hand.length; j++){
            if(pl.hand[j].name == data.person || pl.hand[j].name == data.weapon || pl.hand[j].name == data.location){
              hasObjection = true;
              allPass = false;
              break;
            }
          }
          if(hasObjection){
            pl.client.emit('hasObjection', data);
            pl.client.emit('callinfomsg', ' has <b>objected</b> to the accusation!');
            client.emit('endTurn', data);
            break;
          } else {
            pl.client.emit('callinfomsg', ' has <b>passed</b>.');
          }
          if(i>=players.length-1){
            i = -1;
          }
        }
        if(allPass){
          setTimeout(function(){ //need timeout for server lag
            client.emit('allPass', data);
            sio.sockets.emit('sendServerMessage', '<b>Everyone</b> has <b>passed</b>!');
          }, 2000);
        }
    });
    client.on('finalAccuse', function (data) {
      var correctPerson = false;
      var correctWeapon = false;
      var correctRoom = false;
        for(i = 0; i < solution.length; i++){
          if(solution[i].type == 'Person' && solution[i].name == data.person){
            correctPerson = true;
          } else if(solution[i].type == 'Weapon' && solution[i].name == data.weapon){
            correctWeapon = true;
          } else if(solution[i].type == 'Room' && solution[i].name == data.room){
            correctRoom = true;
          }
        }
        if(correctPerson && correctWeapon && correctRoom){
          setTimeout(function(){
            client.emit('callinfomsg', ' has guessed correctly and won the game!');
            sio.sockets.emit('victory', null);
          }, 2000);
        } else {
          setTimeout(function(){
            client.emit('callinfomsg', ' has guessed <b>wrong</b> and is out of the game!');
            client.emit('outOfGame', null);
            client.emit('endTurn', {'final' : false});
          }, 2000);
        }
    });
});
