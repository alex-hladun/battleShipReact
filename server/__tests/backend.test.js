const mockio = require('./mockSocket')
const {serverSocket, cleanUp } = require('./mockSocket')
const { GameList } = require('../modules/GameList')
const { Player } = require('../modules/Player')
const { ComputerPlayer } = require('../modules/ComputerPlayer')
const { OnlineGame } = require('../modules/OnlineGame')
const { ComputerGame } = require('../modules/ComputerGame')


let io
beforeEach(() => {
  io = new mockio

})
describe('Backend class functions', () => {
  it('Should create a new game manager', () => {
    const gameList = new GameList()
  })
  
})