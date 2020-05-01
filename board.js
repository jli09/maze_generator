class Cell{
    constructor(x, y) {
        this.visited = false;
        this.previous = null;
        this.location = [x, y];
    }

    setPrevious(cell) {
        this.previous = cell;
    }

    getPrevious() {
        if (this.previous) {
            return this.previous;
        } else return undefined
    }

    getLocation() {
        if (this.location) {
            return this.location;
        } else return undefined;
    }

    getVisited() {
        return this.visited;
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
                row[j] = new Cell(i, j);
            }

            this.grid.push(row);
        }
    }

    getBoard() {
        return this.grid;
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
reverseBacktrack(testBoard.getBoard());

console.log(testBoard.getBoard());
