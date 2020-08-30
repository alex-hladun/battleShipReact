import SocketMock from 'socket.io-mock';

// const io = require('./mockSocket')
// const  { serverSocket } = require('./mockSocket')



const { GameList } = require('../modules/GameList')
const { Player } = require('../modules/Player')
const { ComputerPlayer } = require('../modules/ComputerPlayer')
const { OnlineGame } = require('../modules/OnlineGame')
const { ComputerGame } = require('../modules/ComputerGame')

const shipList = [
  {
    name: 'Carrier',
    length: 5,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Battleship',
    length: 4,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Cruiser',
    length: 3,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Submarine',
    length: 3,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Destroyer',
    length: 2,
    horizontal: true,
    hitCount: 0
  }
]

const shortShipList = [
  {
    name: 'Carrier',
    length: 2,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Battleship',
    length: 1,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Cruiser',
    length: 1,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Submarine',
    length: 1,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Destroyer',
    length: 1,
    horizontal: true,
    hitCount: 0
  }
]
const duoShipList = [
  {
    name: 'Carrier',
    length: 2,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Battleship',
    length: 2,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Cruiser',
    length: 2,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Submarine',
    length: 2,
    horizontal: true,
    hitCount: 0
  },
  {
    name: 'Destroyer',
    length: 2,
    horizontal: true,
    hitCount: 0
  }
]

let socket;
beforeEach(() => {
  socket = new SocketMock()
})
describe('Backend class functions', () => {
  it('Should create a new game manager', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shipList, 0)
    expect(gameList.computerRoomList['test']).toBeTruthy()

    // console.log(gameList.computerRoomList['test'].opponent);
  })
  it('Should have less targets when initialized with a shorter ship list', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shortShipList, 0)
    expect(gameList.computerRoomList['test'].host.totalShipTargets).toEqual(6)
    expect(gameList.computerRoomList['test'].opponent.totalShipTargets).toEqual(6)
  })
  it('Should increase the total hits when a computer attacks 10 times, but not increase computer hits', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shortShipList, 0)

    gameList.computerRoomList['test'].host.board=[
      [1,1,'O','O','O','O'],
      [2,'O','O','O','O','O'],
      [3,'O','O','O','O','O'],
      [4,'O','O','O','O','O'],
      [5,'O','O','O','O','O'],
      ['O','O','O','O','O','O']
    ]
    // console.log(gameList.computerRoomList['test'].host.board)

    gameList.computerRoomList['test'].opponent.generateComputerMoves(gameList.computerRoomList['test'].host)
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')
    gameList.computerRoomList['test'].opponent.computerAttack(gameList.computerRoomList['test'].host, socket.broadcast, 'test')

    let cpuShipHits = 0
    let playerShipHits = 0

    for (const ship in gameList.computerRoomList['test'].opponent.shipList) {
      cpuShipHits += gameList.computerRoomList['test'].opponent.shipList[ship].hitCount;
    }
    for (const ship in gameList.computerRoomList['test'].host.shipList) {
      playerShipHits += gameList.computerRoomList['test'].host.shipList[ship].hitCount;
    }

    expect(cpuShipHits).toEqual(0);
    expect(playerShipHits).toBeGreaterThan(0);
  })

  it('Should have a shorter list of moves when difficulty is 3', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shortShipList, 3)

    gameList.computerRoomList['test'].host.board=[
      [1,1,'O','O','O','O'],
      [2,'O','O','O','O','O'],
      [3,'O','O','O','O','O'],
      [4,'O','O','O','O','O'],
      [5,'O','O','O','O','O'],
      ['O','O','O','O','O','O']
    ]
    gameList.computerRoomList['test'].opponent.generateComputerMoves(gameList.computerRoomList['test'].host)
    expect(gameList.computerRoomList['test'].opponent.potentialMoves.length).toEqual(gameList.computerRoomList['test'].opponent.totalShipTargets)
    
  })
  it('Should have a short list of moves when difficulty is 2', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shortShipList, 2)

    gameList.computerRoomList['test'].host.board=[
      [1,1,'O','O','O','O'],
      [2,'O','O','O','O','O'],
      [3,'O','O','O','O','O'],
      [4,'O','O','O','O','O'],
      [5,'O','O','O','O','O'],
      ['O','O','O','O','O','O']
    ]
    gameList.computerRoomList['test'].opponent.generateComputerMoves(gameList.computerRoomList['test'].host)
    expect(gameList.computerRoomList['test'].opponent.potentialMoves.length).toEqual(2 * gameList.computerRoomList['test'].opponent.totalShipTargets)

  })
  it('Should have a long list of moves when difficulty is 1', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', shortShipList, 1)

    gameList.computerRoomList['test'].host.board=[
      [1,1,'O','O','O','O'],
      [2,'O','O','O','O','O'],
      [3,'O','O','O','O','O'],
      [4,'O','O','O','O','O'],
      [5,'O','O','O','O','O'],
      ['O','O','O','O','O','O']
    ]
    gameList.computerRoomList['test'].opponent.generateComputerMoves(gameList.computerRoomList['test'].host)
    expect(gameList.computerRoomList['test'].opponent.potentialMoves.length).toEqual(3 * gameList.computerRoomList['test'].opponent.totalShipTargets)
  })
  it('Should have a longer list of moves when difficulty is 0', () => {
    const gameList = new GameList(socket)
    gameList.newComputerRoom('test', 6, 'Alex', duoShipList, 0)

    gameList.computerRoomList['test'].host.board=[
      [1,1,'O','O','O','O'],
      [2,2,'O','O','O','O'],
      [3,3,'O','O','O','O'],
      [4,4,'O','O','O','O'],
      [5,5,'O','O','O','O'],
      ['O','O','O','O','O','O']
    ]
    gameList.computerRoomList['test'].opponent.generateComputerMoves(gameList.computerRoomList['test'].host)
    expect(gameList.computerRoomList['test'].opponent.potentialMoves.length).toEqual(4 * gameList.computerRoomList['test'].opponent.totalShipTargets)
  })

})