

export default class Rooms {
  roomList: {};
  socketDirectory: {};

  constructor() {
    this.roomList = {};
    this.socketDirectory = {}
  }

  newRoom(name, topic, socketID, topic_id) {
    let r = new Room(name, topic, topic_id);
    this.roomList[r.name] = r;
    this.socketDirectory[socketID] = [r.name]
    return r;
  }

  delRoom(name) {
    // this.roomList[name] = null;
    // console.log('Deleting room ', name)
    // console.log('org roomList: ', this.roomList)
    delete this.roomList[name]
    // console.log('new roomList: ', this.roomList)
  }

  get allRooms() {
    return this.roomList;
  }
  // this could include summary stats like average score, etc. For simplicy, just the count for now
  get numberOfRooms() {
    return this.roomList.length;
  }

  sendRoomUpdate() {
    rLString = JSON.stringify(roomList.allRooms);
    io.to("lobby").emit("initialRoomList", rLString);
  }
}