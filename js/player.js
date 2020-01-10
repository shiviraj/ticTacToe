class Player {
  constructor(name) {
    this.name = name;
    this.totalMoves = [];
  }
  moves(playedNum) {
    this.totalMoves.push(playedNum);
  }
  get isWon() {
    for (let i in WIN_CONDITIONS) {
      const isInclude = move => this.totalMoves.includes(move);
      if (WIN_CONDITIONS[i].every(isInclude)) return true;
    }
    return false;
  }
}
