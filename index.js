//setting up canvas
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

// console.log('canvas: ', canvas);
// console.log('context: ', ctx);

ctx.strokeStyle = 'black';
// ctx.fillStyle = 'rgb(200, 0, 0)';
ctx.lineWidth = 1;

class CanvasBoard {
  constructor(width, height, board) {
    this.width = width;
    this.height = height;
    this.board = board;
    this.grid = board.board;

    this.wallWidth = width / board.width;
    this.wallHeight = height / board.height;

    this.cellWidth = this.wallWidth - 2;
    this.cellHeight = this.wallHeight - 2;
  }

  //initial board rendering

  initBoard() {
    const { grid } = this;

    for (let i = 0; i < grid.length; i++) {
      for (let j = 0; j < grid[i].length; j++) {
        this.initCell(grid[i][j]);
      }
    }
  }

  initCell(cell) {
    let [y, x] = cell.address;

    //set starting point, i.e. top left corner of cell on canvas *including walls*

    x = x * this.wallWidth;
    y = y * this.wallHeight;

    cell.location = [x, y];

    // //shade cell gray
    const color = 'rgb(220, 220, 220)';
    this.fillCell(x + 1, y + 1, this.cellWidth, this.wallHeight, color);

    //get the wall keys from cell
    let wallKeys = Object.keys(cell.walls);

    for (let i = 0; i < wallKeys.length; i++) {
      let dir = wallKeys[i];

      //if the wall is set to true, draw the wall
      if (cell.walls[dir]) {
        this.makeWall(cell, dir);
      }
    }
  }

  makeWall(cell, dir) {
    let start = [];
    let end = [];
    let [x, y] = cell.location;

    const { wallWidth, wallHeight } = this;

    switch (dir) {
      case 'north':
        start = [x, y];
        end = [x + wallWidth, y];
        break;
      case 'east':
        start = [x + wallWidth, y];
        end = [x + wallWidth, y + wallHeight];
        break;
      case 'west':
        start = [x, y];
        end = [x, y + wallHeight];
        break;
      case 'south':
        start = [x, y + wallHeight];
        end = [x + wallWidth, y + wallHeight];
        break;
      default:
        start = [x, y];
        end = [x, y];
    }

    this.drawWall(start, end);
  }

  fillCell(x, y, width, height, color) {
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
  }

  drawWall(start, end) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();
  }

  //shading cells based on changes
  visit(cell, preceding) {
    const [x, y] = cell.location;
    // const [i, j] = cell.address;

    this.fillCell(x + 1, y + 1, this.cellWidth, this.cellHeight, 'red');

    if (preceding) {
      const [x0, y0] = preceding.location;

      if (preceding.rendered || preceding.next.length === 0) {
        this.fillCell(x0 + 1, y0 + 1, this.cellWidth, this.cellHeight, 'white');
      } else {
        this.fillCell(x0 + 1, y0 + 1, this.cellWidth, this.cellHeight, 'blue');
        preceding.rendered = true;
      }
    }

    // let k, m, start, dir;

    // if (cell.visited) {
    //   if (cell.rendered || cell.next.length === 0) {
    //     ctx.fillStyle = 'rgb(255, 255, 255)';
    //   } else {
    //     ctx.fillStyle = 'rgb(225, 140, 0)';
    //     cell.rendered = true;
    //   }
    //   ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight);
    //   this.clearWall(cell, dir);
    // }

    // if (cell.previous) {
    //   const { previous } = cell;
    //   [k, m] = previous.address;

    //   if (i > k && j === m) {
    //     this.clearWall(previous, 'south');
    //   }

    //   if (i === k && j > m) {
    //     this.clearWall(previous, 'east');
    //   }

    //   if (i === k && j < m) {
    //     this.clearWall(previous, 'west');
    //   }

    //   if (i < k && j === m) {
    //     this.clearWall(previous, 'north');
    //   }
    // }
  }

  clearWall(cell, dir) {
    const [x, y] = cell.location;

    switch (dir) {
      case 'north':
        ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight * -1);
        break;
      case 'east':
        ctx.fillRect(x + 1, y + 1, this.cellWidth * 2 + 1, this.cellHeight);
        break;
      case 'west':
        ctx.fillRect(x + 1, y + 1, this.cellWidth * -1, this.cellHeight);
        break;
      case 'south':
        ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight * 2 + 1);
        break;
      default:
        ctx.fillRect(x + 1, y + 1, 0, 0);
    }
  }
}

const mazeBoard = new Board(10, 10);

mazeBoard.makeBoard();
mazeBoard.makeEntrance();
mazeBoard.makeExit();

const maze = new CanvasBoard(canvas.width, canvas.height, mazeBoard);
maze.initBoard();

const path = reverseBacktrack(mazeBoard.board);

const printPath = (index) => {
  if (index < path.length) {
    const [i, j] = path[index];

    const cell = mazeBoard.getCell(i, j);
    let preceding = null;

    if (index > 0) {
      const [k, m] = path[index - 1];
      preceding = mazeBoard.getCell(k, m);
    }

    maze.visit(cell, preceding);

    index++;

    window.setTimeout(() => {
      printPath(index);
    }, 250);
  }
};

printPath(0);
