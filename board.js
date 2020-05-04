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

    this.rendered = false;
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
        let cell = new Cell(i, j);

        //set north wall to true if on the top row
        if (i === 0) cell.setWall('north');

        //set west wall to true if on the left most row
        if (j === 0) cell.setWall('west');

        //set south and east walls to true for all cells
        cell.setWall('east');
        cell.setWall('south');

        //put cell in row
        row[j] = cell;
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

  makeEntrance() {
      const startCell = this.board[0][0];
      startCell.clearWall('north');
  }
    
    makeExit() {
        const endCell = this.board[this.board.length - 1][this.board[0].length - 1];
        endCell.clearWall('south');
    }
}
