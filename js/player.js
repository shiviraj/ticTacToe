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
  isWon() {
    for (let i in WIN_CONDITIONS) {
      const isInclude = move => this.totalMoves.includes(move);
      if (WIN_CONDITIONS[i].every(isInclude)) return true;
    }
    return false;
  }
}
