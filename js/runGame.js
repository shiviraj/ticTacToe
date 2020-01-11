const createCell = function(grid, id) {
  const button = document.createElement('button');
  button.className = 'cell';
  button.id = id;
  button.innerText = id;
  grid.appendChild(button);
};

const displayWon = function(player) {
  const game = document.getElementById('game');
  game.innerHTML = `<h2 id="win">Congratulations</h2>
  <h3 id="win">${player} has won !!!<h3>`;
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
  updateMove(game, cell) {
    this.setStyle(cell, game.count);
    let status = `Current Turn: ${game.nextPlayer.name}`;
    if (game.count == 9) {
      status = 'GAME DRAW!!!';
    }
    if (game.currentPlayer.isWon()) {
      displayWon(game.currentPlayer.name);
      status = '';
    }
    this.status.innerText = status;
  }
}

const initPlayers = function() {
  const name1 = prompt('Enter Player1 name', 'Player 1');
  const name2 = prompt('Enter Player2 name', 'Player 2');
  return [new Player(name1), new Player(name2)];
};

const playGame = (game, draw) => {
  const cell = game.playMove(event);
  draw.updateMove(game, cell);
};

const main = function() {
  const PLAYERS = initPlayers();
  const game = new Game(PLAYERS[0], PLAYERS[1]);
  const gameId = document.getElementById('game');
  const statusElement = document.getElementById('game-status');
  const draw = new Draw(gameId, statusElement);
  draw.setup(game);
  gameId.onclick = () => playGame(game, draw);
};
