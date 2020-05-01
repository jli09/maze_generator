class Cell{
    constructor() {
        this.visited = false;
        this.previous = null;
    }

    setPrevious(cell) {
        this.previous = cell;
    }

    isVisited() {
        this.visited = true;
    }

    reset() {
        this.visited = false;
        this.previous = null;
    }
}

class Board{
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.grid = [];
    }

    makeBoard() {
        for (let i = 0; i < this.x; i++) {
            let row = [];

            for (let j = 0; j < this.y; j++) {
                row[j] = new Cell();
            }

            this.grid.push(row);
        }
    }

    getCell(x, y) {
        if (x >= 0 && x < this.grid.length) {
            if (this.grid[x][y]) {
                return this.grid[x][y];
            }
            else return undefined;
        }
    }
}

const testBoard = new Board(5, 5);

testBoard.makeBoard();

console.log(testBoard);