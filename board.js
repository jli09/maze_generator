class Cell {
  constructor(i, j) {
    this.address = [i, j]; //location in board array
    this.location = []; //location on canvas
    this.walls = {
      north: false,
      east: false,
      south: false,
      west: false,
    };
    this.visited = false;
    this.previous = null;
    this.next = [];
  }

  setPrevious(cell) {
    this.previous = cell;
  }

  addNext(cell) {
    this.next.push(cell);
  }

  setWall(dir) {
    this.walls[dir] = true;
  }

  clearWall(dir) {
    this.walls[dir] = false;
  }

  reset() {
    this.visited = false;
    this.previous = null;
    this.next = [];
  }
}

class Board {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.board = [];
  }

  makeBoard() {
    for (let i = 0; i < this.height; i++) {
      let row = [];

      for (let j = 0; j < this.width; j++) {
        row[j] = new Cell(i, j);
      }

      this.board.push(row);
    }
  }

  getCell(i, j) {
    if (i >= 0 && j < this.board.length) {
      if (this.board[i][j]) {
        return this.board[i][j];
      } else return undefined;
    }
  }
}
