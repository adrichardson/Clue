class Player {
  constructor(name) {
    this.name = name;
  }

  set name(newName) {
    this.name = newName;
 }

 get name(){
   return this.name;
 }

sendMessage(user, msg, color, character) {
    socket.emit('newmsg', { username: user, msg: msg, color: color, character: character });
}

}
