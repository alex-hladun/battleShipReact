

/* eslint-disable no-fallthrough */
// const e = require("express");

/* eslint-disable no-undef */
// class Board {
//   constructor(name, boardSize) {
//     this.name = name;
//     this.boardSize = boardSize;
//     this.board = [];
//     this.resetBoard();
//     this.moveHistory = [];
//     this.playerTurn;
//     this.shipList = {
//       'Carrier': {
//         length: 5,
//         horizontal: true,
//         hitCount: 0
//       },
//       'Battleship': {
//         length: 4,
//         horizontal: true,
//         hitCount: 0
//       },
//       'Cruiser': {
//         length: 3,
//         horizontal: true,
//         hitCount: 0
//       },
//       'Submarine': {
//         length: 3,
//         horizontal: true,
//         hitCount: 0
//       },
//       'Destroyer': {
//         length: 2,
//         horizontal: true,
//         hitCount: 0
//       }
//     };
//     this.shotsPerTurn = 1;
//     this.difficulty = 0;
//     this.diffArray = ['easy', 'medium', 'hard', 'impossible'];
//     this.totalTargets = function() {
//       this.totalShipTargets = 0;
//       for (const ship in this.shipList) {
//         this.totalShipTargets += this.shipList[ship].length;
//       }
//     };
//     this.totalHits = 0;
//     this.potentialMoves = [];
//   }

//   getRandomCell() {
//     let randCell = "";
//     const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
//     let alpha = Math.round(Math.random() * (this.boardSize - 1));
//     let num = Math.ceil(Math.random() * (this.boardSize));
//     randCell += alphabet[alpha] + num;

//     return randCell;
//   }

//   checkEligible(cell, ship) {
//     const colID = this.convertColToNum(cell.slice(0, 1));
//     const rowID = cell.slice(1, cell.length) - 1;
//     const shipLen = ship.length;

//     if (ship.horizontal) {
//       for (let i = 0; i < shipLen; i++) {
//         if (this.board[rowID][colID + i] !== "O" || this.board[rowID][colID + i] === undefined) {
//           return false;
//         }
//       }
//       return true;
//     } else {
//       for (let i = 0; i < shipLen; i++) {
//         // Checks that cell exists and is open.
//         if (!this.board[rowID + i]) {
//           return false;
//         }
//         if (this.board[rowID + i][colID] !== "O" || this.board[rowID + i][colID] === undefined) {
//           return false;
//         }
//       }
//       return true;
//     }
//   }

//   randomizeBoard() {
//     for (const ship in this.shipList) {
//       const randHz = (Math.floor(Math.random() * 2) === 0);
//       this.shipList[ship].horizontal = randHz;
//       const shipLen = this.shipList[ship].length;
//       let cell = this.getRandomCell();
//       let validPlacement = this.checkEligible(cell, this.shipList[ship]);
//       while (!validPlacement) {
//         cell = this.getRandomCell();
//         validPlacement = this.checkEligible(cell, this.shipList[ship]);
//       }

//       const colID = this.convertColToNum(cell.slice(0, 1));
//       const rowID = cell.slice(1, 2) - 1;

//       if (this.shipList[ship].horizontal) {
//         for (let i = 0; i < shipLen; i++) {
//           this.board[rowID][colID + i] = ship;
//         }
//       } else {
//         for (let i = 0; i < shipLen; i++) {
//           this.board[rowID + i][colID] = ship;
//         }
//       }
//     }

//   }
  resetBoard() {
    this.board = [];
    for (const ship in this.shipList) {
      this.shipList[ship].hitCount = 0;
    }
    this.totalHits = 0;
    this.potentialMoves = [];
    // Generates the board with specified rows and columns
    let row = new Array();
    for (let i = 0; i < this.boardSize; i++) {
      row.push("O");
    }
    for (let i = 0; i < this.boardSize; i++) {
      const rowD = [...row];
      this.board.push(rowD);
    }
  }

  // generateComputerMoves(enemy) {
  //   const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];
  //   for (const row in enemy.board) {
  //     for (const col in enemy.board[row]) {
  //       if (enemy.board[row][col] !== 'O') {
  //         const colID = alphabet[col];
  //         const rowID = Number(row) + 1;
  //         this.potentialMoves.push(colID + rowID);
  //         switch (enemy.difficulty) {
  //         case 0:
  //           this.potentialMoves.push(this.getRandomCell());
  //         case 1:
  //           this.potentialMoves.push(this.getRandomCell());
  //           this.potentialMoves.push(this.getRandomCell());
  //         case 2:
  //           this.potentialMoves.push(this.getRandomCell());
  //           this.potentialMoves.push(this.getRandomCell());
  //           break;
  //         }
  //       }
  //     }
  //   }
  // }

//   convertColToNum(col) {
//     const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
//     return alphabet.indexOf(col.toLowerCase());
//   }

//   computerAttack(target) {
//     const randIndex = Math.round(Math.random() * (this.potentialMoves.length - 1));
//     const randMove = this.potentialMoves.splice(randIndex, 1);
//     let validShot = this.attack(target, randMove[0]);
//     while (!validShot) {
//       validShot = this.attack(target, this.getRandomCell());
//     }
//   }

//   attack(enemy, target) {
//     const colID = this.convertColToNum(target.slice(0, 1));
//     const rowID = target.slice(1, target.length) - 1;
//     const enemyShot = enemy.board[rowID][colID];

//     let logMessage;

//     switch (enemyShot) {
//     case 'O':
//       enemy.board[rowID][colID] = "M";
//       logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Miss!</b></span>`);
//       logMessage.appendTo($(`#game-log`));
//       $('#game-log').scrollTop(0);
//       $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-shot-miss hover-blue`);
//       $(`#${enemy.name}${target}`).unbind('mouseenter');
//       return true;
//     case 'X':
//       return false;
//     case "M":
//       console.log(this)
//       return false;
//     default:
//       // Adds red to ship indicator.
//       $(`#${enemy.name}${enemyShot}${enemy.shipList[enemyShot].hitCount}`).addClass('cell-ship-strike');
//       enemy.shipList[enemyShot].hitCount++;
//       this.totalHits ++;
//       enemy.board[rowID][colID] = "X";

//       logMessage = $(`<span>${this.name.toLocaleUpperCase()} fired at ${target.toLocaleUpperCase()}. <b>Hit!</b></span>`);
//       logMessage.appendTo($(`#game-log`));

//       // Sunk ship Message
//       if (enemy.shipList[enemyShot].hitCount === enemy.shipList[enemyShot].length) {
//         logMessage = $(`<span>${this.name.toLocaleUpperCase()} <b>SUNK</b> ${enemy.name.toLocaleUpperCase()}'s  <b>${enemyShot.toLocaleUpperCase()}!!</b></span>`);
//         logMessage.appendTo($(`#game-log`));
//       }
//       $('#game-log').scrollTop(0);

//       $(`#${enemy.name}${target}`).removeClass(`computer-cell game-cell`).addClass(`cell-ship-strike hover-red`);
//       $(`#${enemy.name}${target}`).unbind('mouseout');

//       if (this.totalHits === this.totalShipTargets) {
//         $('#game-over-banner').text(`${this.name.toLocaleUpperCase()} Wins!`);
//         $('#game-over-banner').addClass("show");
//         $(".computer-cell").unbind();
//         this.playerTurn = "game-over";
//       }
//       return true;
//     }
//   }
// }


let setUpGame = function (jQuery, data, options, element) {
  // Function runs on webpage load.
  const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

  

  const setUpGameContainer = () => {
    const pageBody = $("#page-body");
    const gameContainer = $(" <div id=\"game-container\" style=\"display: flex; flex-direction: column; \">");
    gameContainer.appendTo(pageBody);

    const upperInfo = $(`<div id="upper-info-bar"></div>`);
    upperInfo.appendTo(gameContainer);

    const newGame = $(`<div id="new-game-btn" class="info-banner info-box settings-button">New Game</div>`);
    newGame.appendTo(upperInfo);

    const infoBox = $(`<div id="turn-indicator" class="info-box info-banner">Player Turn!</div>`);
    infoBox.appendTo(upperInfo);
    
    const gameInfoBar = $(`<div id="game-info-bar">
    <div id="player-above-label">Player</div>
    <div id="cpu-above-label">Computer</div>
      </div>`);
    gameInfoBar.appendTo(gameContainer);

    const allInfoContainer = $(`<div id="all-info-container"></div>`);
    allInfoContainer.appendTo(gameContainer);


    const gamelog = $(`<div id="game-log" class="info-box"></div>`);
    gamelog.appendTo(gameContainer);
    const update = $(`<span><b>Welcome to BATTLESHIP!</b> Place your ships. Press 'R' to rotate.</span>`);
    update.appendTo($(`#game-log`));

    return allInfoContainer;
  };

  const drawGameBoard = (renderElement, identifier) => {
    // Renders the HTML elements required for the game board.
    const gameContainer = renderElement;
    const alphabet = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z'];

    const shipDashboard = $(`<div id="${identifier}-ship-dashboard"class="ship-dashboard"></div>`);
    shipDashboard.appendTo(gameContainer);

    for (const ship in player.shipList) {
      const shipRow = $(`<div class="ship-row"></div>`);
      shipRow.appendTo(shipDashboard);
      for (let i = 0; i < player.shipList[ship].length; i++) {
        const shipBlockIdentifier = $(`<div class="ship-blocks" id="${identifier}${ship + i}"></div>`);
        shipBlockIdentifier.appendTo(shipRow);
      }
    }

    const playerBoard = $(`<div id="${identifier}-board"></div>`);
    playerBoard.appendTo(gameContainer);

    const topRowLabel = $(`<div class="top-row-label" id="${identifier}-board-row-label">`);
    topRowLabel.appendTo(playerBoard);

    for (let i = 0; i < player.boardSize; i++) {
      const cellRowLabel = $(`<div class="cell-row-label">${alphabet[i].toLocaleUpperCase()}</div>`);
      cellRowLabel.appendTo(topRowLabel);
    }

    const middleContent = $(`<div class="middle-content">`);
    middleContent.appendTo(playerBoard);
    const leftColumnLabels = $(`<div class="left-column-label">`);
    leftColumnLabels.appendTo(middleContent);

    for (let i = 0; i < player.boardSize; i++) {
      const cellColumnLabel = $(`<div class="cell-row-label">${i + 1}</div>`);
      cellColumnLabel.appendTo(leftColumnLabels);
    }
    const playerGameBoard = $(`<div class="game-board">`);
    playerGameBoard.appendTo(middleContent);

    for (let i = 0; i < player.boardSize; i++) {
      const gameBoardRows = $(`<div class="board-row-label">`);
      gameBoardRows.appendTo(playerGameBoard);
      for (let j = 0; j < player.boardSize; j++) {
        const gameBoardCell = $(`<div class="game-cell ${identifier}-cell" id="${identifier + alphabet[j] + (i + 1)}"></div>`);
        gameBoardCell.appendTo(gameBoardRows);
      }
    }
  };

  const renderShips = (playerObj, identifier) => {
    // Render the players ships in dark green.
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    for (const row in playerObj.board) {
      for (const col in playerObj.board[row]) {
        if (playerObj.board[row][col] !== "O") {
          $(`#${identifier}${alphabet[col]}${Number(row) + 1}`).addClass("cell-ship-present");
        }
      }
    }
  };

  const player = new Board('player', 10);
  const computer = new Board('computer', 10);

  // const renderSettings = () => {
  //   const settingsRender = $(`<div id="game-container" style="display: flex; flex-direction: column;">
  // <article class="info-box info-banner">BATTLESHIP</article>
  // <article id="settings-box" class="info-box"><span class="settings-banner">SETTINGS</span>

  //   <div id="setting-row1" class="setting-row">
  //     <article class="table-container">
  //       <table id="settings-table" class="settings-table" style="width:50%">
  //         <tr class="settings-table-row">
  //           <th>Ship</th>
  //           <th></th>
  //           <th>Length</th>
  //           <th></th>
  //         </tr>
          
  //       </table>
  //       <div class="ticker-box-outer">
  //         <div id="setting-del-shp" class="ticker-box">
  //           -
  //         </div>
  //         <div id="setting-add-shp" class="ticker-box">
  //           +
  //         </div>
  //       </div>
  //     </article>

  //     <article id="settings-list">
  //       <article class="settings-box-right">
  //         <div class="">Shots Per Turn: </div>
  //         <span id="setting-spt" class="settings-number">${player.shotsPerTurn}</span>
  //       </article>
  //       <div class="ticker-box-outer">
  //         <div id="setting-del-spt" class="ticker-box">
  //           -
  //         </div>
  //         <div id="setting-add-spt"  class="ticker-box">
  //           +
  //         </div>
  //       </div>
  //       <article class="settings-box-right">
  //         <div class="">Board Size: </div>
  //         <span id="setting-bsi" class="settings-number">${player.boardSize}</span>
  //       </article>

  //       <div class="ticker-box-outer">
  //         <div id="setting-del-bsi" class="ticker-box">
  //           -
  //         </div>
  //         <div id="setting-add-bsi" class="ticker-box">
  //           +
  //         </div>
  //       </div>


  //       <article class="settings-box-right">
  //         <div class="">Difficulty: </div>
  //         <span id="setting-dif" class="settings-number">${player.diffArray[player.difficulty]}</span>
  //       </article>

  //       <div class="ticker-box-outer">
  //         <div id="setting-del-dif" class="ticker-box">
  //           -
  //         </div>
  //         <div id="setting-add-dif" class="ticker-box">
  //           +
  //         </div>
  //       </div>



  //     </article>

  //   </div>
  //   <div id="setting-row2" class="setting-row">
  //     <span class="info-banner info-box settings-button">Play Online With Friend</span>
  //     <span id="btn-play-cpu" class="info-banner info-box settings-button">Play Computer</span>
  //   </div>

  //   </div>`);

    const pageBody = $("#page-body");
    settingsRender.appendTo(pageBody);

    for (const ship in player.shipList) {
      const shipToRender = $(`
    <tr>
    <td>${ship}</td>
    <td id="setting-del-shl-${ship}" class="ticker-box">-</td>
    <td>${player.shipList[ship]['length']}</td>
    <td id="setting-add-shl-${ship}"  class="ticker-box">+</td>
  </tr>`);
      shipToRender.appendTo($('#settings-table'));
    }

  };


  const donePlacingStartGame = () => {
    computer.generateComputerMoves(player);
    renderShips(player, 'player');

    $(".computer-cell").hover(function () {
      $(this).addClass("cell-selected");
    }, function () {
      $(this).removeClass("cell-selected");
    });
  
    $(".computer-cell").click(function () {
      if (player.playerTurn) {
        if (player.attack(computer, $(this).attr("id").slice(8, 11))) {
          toggleTurn();
        }
      }
    });

      
    const toggleTurn = () => {
      if (player.playerTurn === "game-over" || computer.playerTurn === "game-over") {
        $(`#turn-indicator`).html(`Game Over`);
        console.log("game over");
      } else if (player.playerTurn) {
        player.playerTurn = false;
        $(`#turn-indicator`).html(`Computer Turn`);
        setTimeout(function () {
          computer.computerAttack(player);
          toggleTurn();
        }, 300);
      } else {
        $(`#turn-indicator`).html(`Player Turn`);
        player.playerTurn = true;
      }
    };

    player.playerTurn = (Math.floor(Math.random() * 2) === 0);
    if (player.playerTurn) {
      let logMessage = $(`<span>Randomizing start: Computer goes first.</span>`);
      logMessage.appendTo($(`#game-log`));
    } else {
      let logMessage = $(`<span>Randomizing start: Player goes first.</span>`);
      logMessage.appendTo($(`#game-log`));
    }
    player.totalTargets();
    computer.totalTargets();

    toggleTurn();

    const gameOverMessage = $(` <div id="game-over-banner">Game Over!</div>`);
    gameOverMessage.appendTo('#page-body');

  };

  

  const applySettingStyling = () => {
    // Starts set-up ship mode.
    $('#btn-play-cpu').click(function() {
      $('#game-container').remove();
      // DRAWS the HTML elements for the gamebaord.
      const gameContainer = setUpGameContainer();
      drawGameBoard(gameContainer, 'player');
      drawGameBoard(gameContainer, 'computer');
      player.resetBoard();
      computer.resetBoard();
      computer.randomizeBoard();
      // player.randomizeBoard();
      //Set up ships here
  
      $('#new-game-btn').click(function() {
        $('#game-container').remove();
        $('#game-over-banner').removeClass("show");
        shipIndex = 0;
        renderSettings();
        applySettingStyling();
      });
  
      const colorShipSelector = (ship) => {
        $(`#turn-indicator`).html(`Place your ${ship}`);
        $('.ship-blocks').removeClass("cell-selected");
        $(`[id^=player${ship}]`).addClass("cell-selected");
  
      };
  
      let shipIndex = 0;
      let shipArr = [];
      for (const ship in player.shipList) {
        shipArr.push(ship);
      }
      const shipCount = Object.keys(player.shipList).length;
      colorShipSelector(shipArr[shipIndex]);
  
      // Change color of all eligible spaces
      $(".player-cell").hover(function() {
        const cell = $(this).attr("id").slice(6, 10);
        const colID = player.convertColToNum(cell.slice(0, 1));
        const rowID = cell.slice(1, cell.length) - 1;
        const shipLen = player.shipList[shipArr[shipIndex]].length;
        
        if (player.checkEligible($(this).attr("id").slice(6, 10), player.shipList[shipArr[shipIndex]])) {
          $(this).addClass("cell-selected");
          if (player.shipList[shipArr[shipIndex]].horizontal) {
            for (let i = 0; i < shipLen; i++) {
              $(`#player${alphabet[colID + i]}${rowID + 1}`).addClass('cell-selected');
            }
          } else {
            for (let i = 0; i < shipLen; i++) {
              $(`#player${alphabet[colID]}${rowID + 1 + i}`).addClass('cell-selected');
            }
          }
        } else {
          $(this).addClass("cell-ship-strike");
          if (player.shipList[shipArr[shipIndex]].horizontal) {
            for (let i = 0; i < shipLen; i++) {
              $(`#player${alphabet[colID + i]}${rowID + 1}`).addClass('cell-ship-strike');
            }
          } else {
            for (let i = 0; i < shipLen; i++) {
              $(`#player${alphabet[colID]}${rowID + 1 + i}`).addClass('cell-ship-strike');
            }
          }
        }
      }, function() {
        $('.player-cell').removeClass("cell-selected");
        $('.player-cell').removeClass("cell-ship-strike");
      });
    
      $(".player-cell").click(function () {
        if (player.checkEligible($(this).attr("id").slice(6, 10), player.shipList[shipArr[shipIndex]])) {
          
          // place ship
          const cell = $(this).attr("id").slice(6, 10);
          const colID = player.convertColToNum(cell.slice(0, 1));
          const rowID = cell.slice(1, cell.length) - 1;
          const ship = shipArr[shipIndex];
          const shipLen = player.shipList[shipArr[shipIndex]].length;
  
          if (player.shipList[shipArr[shipIndex]].horizontal) {
            for (let i = 0; i < shipLen; i++) {
              player.board[rowID][colID + i] = ship;
            }
          } else {
            for (let i = 0; i < shipLen; i++) {
              player.board[rowID + i][colID] = ship;
            }
          }
          renderShips(player, 'player');
          shipIndex ++;
          if (shipIndex < shipCount) {
            colorShipSelector(shipArr[shipIndex]);
          } else {
            // unbind the hover
            $(".player-cell").unbind();
            $(".player-cell").removeClass("cell-selected");
            $(`[id^=player${ship}]`).removeClass("cell-selected");
            donePlacingStartGame();
          }
  
        }
      });
  
      // Rotate current ship
      $("body").keydown(function(event) {
        if (event.originalEvent.key === 'r') {
          player.shipList[shipArr[shipIndex]].horizontal = !player.shipList[shipArr[shipIndex]].horizontal;
        }
      });
    });


    // Code to set up settings.
    $(".ticker-box").click(function() {
      const id = $(this).attr('id');
      const method = id.slice(8,11);
      const methodID = id.slice(12,15);
      const ship = id.slice(16, 28);
      
      switch (method) {
      case 'add':
        switch (methodID) {
        case 'shl':
          if (player.shipList[ship].length < player.boardSize) {
            player.shipList[ship].length ++;
            computer.shipList[ship].length ++;
            $(this).prev().text(player.shipList[ship].length);
          }
          break;
        case 'spt':
          player.shotsPerTurn ++;
          $("#setting-spt").text(player.shotsPerTurn);
          break;
        case 'bsi':
          player.boardSize ++;
          computer.boardSize ++;
          $("#setting-bsi").text(player.boardSize);
          break;
        case 'dif':
          if (player.difficulty < player.diffArray.length) {
            player.difficulty ++;
            $('#setting-dif').text(player.diffArray[player.difficulty]);
          }
          break;
        }
        break;
      case 'del':
        switch (methodID) {
        case 'shl':
          if (player.shipList[ship].length > 1) {
            player.shipList[ship].length --;
            computer.shipList[ship].length --;
            $(this).next().text(player.shipList[ship].length);
          }
          break;
        case 'spt':
          if (player.shotsPerTurn > 1) {
            player.shotsPerTurn --;
            $("#setting-spt").text(player.shotsPerTurn);
          }
          break;
        case 'bsi':
          if (player.boardSize > 2) {
            player.boardSize --;
            computer.boardSize --;
            $("#setting-bsi").text(player.boardSize);
          }
          break;
        case 'dif':
          if (player.difficulty > 0) {
            player.difficulty --;
            $('#setting-dif').text(player.diffArray[player.difficulty]);
          }
          break;
        }
        break;
      }

    });

  };

  renderSettings();
  applySettingStyling();

};
