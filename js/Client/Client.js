//Now we can listen for that event
socket.on('onconnected', function( data ) {
  //Note that the data is the object we sent from the server, as is. So we can assume its id exists.
  console.log( 'Connected successfully to the socket.io server. Server side ID is ' + data.id );
  $('#chatpane').html('Welcome to Online Clue! <hr>');
});

socket.on('newmsg', function(data) {
  var pane = $('#chatpane');
  pane.html($('#chatpane').html() + '<br><span style=\'color:' + data.color + '\'<b>'+ data.character + ' (<i>' + data.username + '</i>): </b></span>' +  data.msg);
  bottom = pane.prop('scrollHeight') - pane.height();
  pane.scrollTop(bottom);
  if(data.username==socket.username){
    $("#sendbox").val('');
  }
});

socket.on('loginsuccess', function () {
    console.log("successful login");
    document.dispatchEvent(new Event('login_success'));
});

socket.on('loginfailure', function (data) {
    //$('#errormsg').html('Please enter a valid user name!');
    //$('#errormsg').removeClass('hidden');
    errmsg.innerText = data.message;
    errmsg.classList.remove('hidden');
});



socket.on('infomsg', function(data) {
  var pane = $('#chatpane');
  pane.html($('#chatpane').html() + '<br><span style=\'color:' + data.color + '\'<b><i>'+ data.character + ' (' + data.username + ')' +  data.msg + '</i></b></span>');
  bottom = pane.prop('scrollHeight') - pane.height();
  pane.scrollTop(bottom);
});

socket.on('privatemsg', function(data) {
  var pane = $('#chatpane');
  pane.html($('#chatpane').html() + '<br><span style=\'color:' + selectedCharacter.color + '\'<i>' +  data.msg + '</i></span>');
  bottom = pane.prop('scrollHeight') - pane.height();
  pane.scrollTop(bottom);
});

socket.on('callinfomsg', function(data) {
  sendInfoMessage(data);
});

socket.on('sendServerMessage', function(data) {
  sendServerMessage(data);
});

socket.on('setuser', function(data) {
  socket.username =  data.username;
  username = data.username;
});

socket.on('updateHand', function(data){
  var checkBoardDrawn = setInterval(function(){
                          if(boardH > 0){
                            createCards(data.hand);
                            clearInterval(checkBoardDrawn);
                          }
                        }, 100);

  hand = data.hand;
});

socket.on('updateCharacter', function(data) {
  selectedCharacter = data;
});

socket.on('showCard', function(data) {
    isLooking = true;
    showCard(data);
});

socket.on('hasObjection', function(data) {
  accusation = [data.person, data.weapon, data.location];
  isObjecting = true;
  showPopUp('hand');
});

socket.on('checkAvailableCharacters', function(data) {
  updateCharacters(JSON.parse(data));
});

socket.on('isHost', function(data) {
  isHost=true;
});

socket.on('startGame', function(data) {
  startGame();
});

socket.on('newGame', function(data) {
  window.location.reload();
});

socket.on('newTurn', function(data){
  var turntimer = setInterval(function(){
                    if(isTurn){
                      clearInterval(turntimer);
                      handleNewTurn();
                    }
                    isTurn = true;
                  }, 1000);
});

socket.on('enablePlay', function(data){
  enablePlayButton();
});

socket.on('endTurn', function(data){
  if(data!=null){
    handleEndTurn();
  }
});

socket.on('victory', function(data){
  music.stop();
  victorymusic.play();
});

socket.on('allPass', function(data){
  handleAllPass(data);
});

socket.on('outOfGame', function(data){
  outOfGame = true;
});

socket.on('characterSelected', function(data) {
  if(stage==null) return;
  var selectedCard = stage.getChildByName(data.name);
  var box = stage.getChildByName('confirmBox');
  selectedCard.image = selectedCard.img_grayscale;
  selectedCard.canSelect = false;
  selectedCard.cursor = 'no-drop';
  createSelectionText('('+ data.username + ')', selectedCard, data.color);
  if(box!=null  && box.selection == selectedCard){
    box.visible = false;
  }
  update=true;
});

socket.on('clearSpace', function(data){
  clearSpace(data);
});

socket.on('clearRoom', function(data){
  clearRoom(data.rname, data.cname);
});

socket.on('wasCalled', function(data){
  var currcheck = true;
  if(currRoom!=null){
    currcheck = currRoom!=stage.getChildByName(data.location);
  }
  if(data.name == selectedCharacter.name && data.accusor!=selectedCharacter.name && currcheck){
    wasCalled = true;
    var staypop  = stage.getChildByName('popupBox').getChildByName('popupStay');
    currRoom = stage.getChildByName(data.location);
    staypop.image = staypop.activeImg;
    staypop.cursor = 'pointer';
    checkHasPassage(currRoom);
  }
});

socket.on('canvasMove', function(data) {
  if(stage==null) return;
  var char = stage.getChildByName(data.name);
  var loc = stage.getChildByName(data.location);
  if(loc.type=="Space"){
    centerOnSpace(char, loc, true);
  } else {
    centerOnRoom(char, loc, true);
  }
  update=true;
});
