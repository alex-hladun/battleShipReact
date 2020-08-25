import Board from "./Board";


describe("Board Class", () => {
  const testPlayer = new Board('testPlayer', 10);

  it("Creates a new player of type Board", () => {
    expect( typeof testPlayer).toEqual('object')

  })
  it("Creates a new player with board size of 10", () => {    
    expect(testPlayer.boardSize).toEqual(10)
  })
  it("Creates a new player of type Board - ShotsPerTurn should be a number", () => {
    expect( typeof testPlayer.shotsPerTurn).toEqual('number')
  })

  it("generates a random cell properly", () => {
    const cell = testPlayer.getRandomCell()
    expect( typeof cell).toEqual('string')
  })

})