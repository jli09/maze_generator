class Cell{
    constructor(i, j) {
        this.visited = false;
        this.previous = null;
        this.location = [i, j];
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
        this.width = x;
        this.height = y;
        this.grid = [];
    }

    makeBoard() {
        for (let i = 0; i < this.height; i++) {
            let row = [];

            for (let j = 0; j < this.width; j++) {
                row[j] = new Cell(i, j);
            }

            this.grid.push(row);
        }
    }

    getBoard() {
        return this.grid;
    }

    getCell(i, j) {
        if (i >= 0 && j < this.grid.length) {
            if (this.grid[i][j]) {
                return this.grid[i][j];
            }
            else return undefined;
        }
    }
}

