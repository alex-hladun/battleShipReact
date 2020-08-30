// socket.io-client.js
let EVENTS = {};
function emit(event, args) {
  console.log(event)
}

function to(event) {
  function emit(event) {
    return true
  }
  return (() => emit())
  console.log(event)
}

// class FSocket {
//   constructor() {
//     this.name = 'socket'

//   }

//   to(event) {
//     emit2() => {
//       console.log(event)
//     }
//   }
// }
const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  to(gameID, event) {
    console.log('io.TO ', gameID)

    //  emit(event) : {
    //   return console.log('io event', event)
    // }
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit
};
export const io = { connect() { return socket; } };

// Additional helpers, not included in the real socket.io-client,just for out test.
// to emulate server emit.
export const serverSocket = { to }; 
// cleanup helper
export function cleanup() { EVENTS = {}}
export default io;