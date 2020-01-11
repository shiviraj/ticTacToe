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
  setup(game) {
    for (let id = 1; id < 10; id++) {
      createCell(this.display, id);
    }
    this.status.innerText = `Current Turn: ${game.nextPlayer.name}`;
  }
  setStyle(cell, count) {
    cell.classList.add(`played`);
    cell.classList.add(`player${count % 2}`);
    cell.disabled = true;
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
    const game = document.getElementById('game');
    game.innerHTML = `<h2 id="win">Congratulations</h2>
    <h3 id="win">${player.name} has won !!!<h3>`;
  }
}

const initPlayers = function() {
  const name1 = prompt('Enter Player1 name', 'Player 1');
  const name2 = prompt('Enter Player2 name', 'Player 2');
  return [new Player(name1), new Player(name2)];
};

const playGame = (game, draw, event) => {
  const cellId = event.toElement.id;
  if (cellId !== GAME_ID) {
    game.updateMove(cellId);
    const cell = document.getElementById(cellId);
    draw.updateStatus(game, cell);
  }
};

const main = function() {
  const PLAYERS = initPlayers();
  const game = new Game(PLAYERS[0], PLAYERS[1]);
  const gameElement = getElement(GAME_ID);
  const statusElement = getElement(STATUS_ID);
  const draw = new Draw(gameElement, statusElement);
  draw.setup(game);
  gameElement.onclick = () => playGame(game, draw, event);
};
