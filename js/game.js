let COUNT = 0;
const PLAYERS = [];

const setStyle = function(cell) {
  cell.classList.add(`played`);
  cell.classList.add(`player${COUNT % 2}`);
  cell.disabled = true;
};

const currentPlayer = (num = 0) => PLAYERS[(COUNT + num) % 2];

const displayWon = function() {
  const game = document.getElementById('game');
  game.innerHTML = `<h2 id="win">Congratulations</h2>
  <h3 id="win">${currentPlayer(1).name} has won !!!<h3>`;
};

const updateStatus = function(isWon, player) {
  const statusElement = document.getElementById('game-status');
  let status = `Current Turn: ${player.name}`;
  if (COUNT == 9) {
    status = 'GAME DRAW!!!';
  }
  if (isWon) {
    displayWon();
    status = '';
  }
  statusElement.innerText = status;
};

const playMoves = function(cellId) {
  COUNT++;
  const cell = document.getElementById(cellId);
  setStyle(cell);
  const player = currentPlayer();
  player.moves(+cellId);
  updateStatus(player.isWon, player);
};

const playGame = function(e) {
  if (e.toElement.id == 'game') return;
  playMoves(e.toElement.id);
};

const createCell = function(grid, id) {
  const button = document.createElement('button');
  button.className = 'cell';
  button.id = id;
  button.innerText = id;
  grid.appendChild(button);
};

const createDisplay = function() {
  const game = document.getElementById('game');
  for (let id = 1; id < 10; id++) {
    createCell(game, id);
  }
};

const initStatus = function() {
  const statusElement = document.getElementById('game-status');
  statusElement.innerText = `Current Turn: ${currentPlayer().name}`;
};

const gameInit = function() {
  const name1 = prompt('Enter Player1 name', 'Player 1');
  const name2 = prompt('Enter Player2 name', 'Player 2');
  PLAYERS.push(new Player(name1));
  PLAYERS.push(new Player(name2));
  initStatus();
};

const main = function() {
  createDisplay();
  setTimeout(gameInit, 0);
};
