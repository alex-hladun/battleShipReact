const { OnlineGame } = require('./OnlineGame')
const {ComputerGame} = require('./ComputerGame')

class Rooms {
  constructor(socket) {
    this.roomList = {};
    this.socketDirectory = {}
    this.io = socket;
  }

  newOnlineRoom(name, boardSize, host) {
    let r = new OnlineGame(name, boardSize, host);
    this.roomList[r.name] = r;
    this.socketDirectory[name] = [r.name]
    return r;
  }

  newComputerRoom(name, boardSize, host, difficulty) {
    let r = new ComputerGame(name, boardSize, host, difficulty);
    this.roomList[r.name] = r;
    this.socketDirectory[name] = [r.name]
    return r;
  }

  delRoom(name) {
    console.log('org roomList: ', this.roomList)
    delete this.roomList[name]
    console.log('new roomList: ', this.roomList)
  }

  sendRoomUpdate() {
    this.io.to("lobby").emit("initialRoomList", this.roomList);
  }
}

module.exports = {
  Rooms
}