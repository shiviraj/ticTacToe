class Game {
  constructor(player1, player2) {
    this.player1 = player1;
    this.player2 = player2;
    this.count = 0;
  }
  get currentPlayer() {
    return this.count % 2 ? this.player1 : this.player2;
  }
  get nextPlayer() {
    return this.count % 2 ? this.player2 : this.player1;
  }
  playMove(e) {
    if (e.toElement.id == 'game') return;
    ++this.count;
    return this.updateMove(e.toElement.id);
  }
  updateMove(cellId) {
    const cell = document.getElementById(cellId);
    this.currentPlayer.moves(+cellId);
    return cell;
  }
}
