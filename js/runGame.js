const GAME_ID = 'game';
const STATUS_ID = 'status';

const getElement = id => document.getElementById(id);

const createCell = function(grid, id) {
  const button = document.createElement('button');
  button.className = 'cell';
  button.id = id;
  button.innerText = id;
  grid.appendChild(button);
};

class Draw {
  constructor(display, status) {
    this.display = display;
    this.status = status;
  }
  setup() {
    for (let id = 1; id < 10; id++) {
      createCell(this.display, id);
    }
  }
  setStyle(cell, count) {
    cell.classList.add(`played`);
    let turn = 0;
    let text = 'X';
    if (count % 2 == 1) {
      turn = 1;
      text = 'O';
    }
    cell.classList.add(`player${turn}`);
    cell.innerText = text;
    cell.disabled = true;
  }
  initStatus(game) {
    this.status.innerText = `Current Turn: ${game.nextPlayer.name}`;
  }
  updateStatus(game, cell) {
    this.setStyle(cell, game.turnPlayed);
    const {status, isWon} = game.status();
    if (isWon) {
      this.displayWon(game.currentPlayer);
    }
    this.status.innerText = status;
  }
  displayWon(player) {
    let displayTag = '<h2 id="win">Congratulations</h2>';
    displayTag += `<h3 id="win">${player.name} has won !!!<h3>`;
    this.display.innerHTML = displayTag;
  }
}

const initPlayers = function() {
  const name1 = prompt('Enter Player1 name', 'Player 1');
  const name2 = prompt('Enter Player2 name', 'Player 2');
  return [name1, name2];
};

const playGame = (game, draw, event) => {
  const cellId = event.toElement.id;
  if (cellId !== GAME_ID) {
    game.updateMove(cellId);
    draw.updateStatus(game, getElement(cellId));
  }
};

const main = function() {
  const gameElement = getElement(GAME_ID);
  const statusElement = getElement(STATUS_ID);
  const draw = new Draw(gameElement, statusElement);
  draw.setup();
  const players = initPlayers();
  const game = new Game(players[0], players[1]);
  draw.initStatus(game);
  gameElement.onclick = () => playGame(game, draw, event);
};
