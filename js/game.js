const WIN_CONDITIONS = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
  [1, 4, 7],
  [2, 5, 8],
  [3, 6, 9],
  [1, 5, 9],
  [3, 5, 7]
];

class Player {
  constructor(name) {
    this.name = name;
    this.totalMoves = [];
  }
  moves(playedNum) {
    this.totalMoves.push(playedNum);
  }
}

class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.turnPlayed = 0;
  }
  get currentPlayer() {
    return this.turnPlayed % 2 ? this.player1 : this.player2;
  }
  get nextPlayer() {
    return this.turnPlayed % 2 ? this.player2 : this.player1;
  }
  updateMove(cellId) {
    ++this.turnPlayed;
    this.currentPlayer.moves(+cellId);
  }
  status() {
    let status = `Current Turn: ${this.nextPlayer.name}`;
    let isWon = false;
    if (this.turnPlayed == 9) {
      status = 'GAME DRAW!!!';
    }
    if (this.isCurrentPlayerWon()) {
      isWon = true;
      status = '';
    }
    return {status, isWon};
  }
  isCurrentPlayerWon() {
    const currentPlayersMove = this.currentPlayer.totalMoves;
    const doesInclude = move => currentPlayersMove.includes(move);
    for (let i in WIN_CONDITIONS) {
      if (WIN_CONDITIONS[i].every(doesInclude)) return true;
    }
    return false;
  }
}
