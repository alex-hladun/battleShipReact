// socket.io-client.js
let EVENTS = {};
function emit(event, ...args) {
  EVENTS[event].forEach(func => func(...args));
}
const socket = {
  on(event, func) {
    if (EVENTS[event]) {
      return EVENTS[event].push(func);
    }
    EVENTS[event] = [func];
  },
  emit
};
export const io = { connect() { return socket; } };
// Additional helpers, not included in the real socket.io-client,just for out test.
// to emulate server emit.export const serverSocket = { emit }; // cleanup helperexport function cleanup() { EVENTS = {}}
export default io;