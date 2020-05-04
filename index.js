//setting up canvas
const ctx = canvas.getContext('2d');

console.log('canvas: ', canvas);
console.log('context: ', ctx);

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
    ctx.fillStyle = 'rgb(220, 220, 220)';
    ctx.fillRect(x + 1, y + 1, this.cellWidth, this.wallHeight);

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

    //adjustment for edges
    // if (cell.address[1] === 0) x = x - 1;
    // if (cell.address[0] === 0) y = y - 1;

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

  drawWall(start, end) {
    ctx.beginPath();
    ctx.moveTo(start[0], start[1]);
    ctx.lineTo(end[0], end[1]);
    ctx.stroke();
    ctx.closePath();
  }

  //shading cells based on changes
  isVisited(cell) {
    const [x, y] = cell.location;
    const [i, j] = cell.address;
    let k, m, start, dir;

    if (cell.visited) {
      if (cell.rendered || cell.next.length === 0) {
        ctx.fillStyle = 'rgb(255, 255, 255)';
      } else {
        ctx.fillStyle = 'rgb(225, 140, 0)';
        cell.rendered = true;
      }
      ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight);
      this.clearWall(cell, dir);
    }

    if (cell.previous) {
      const { previous } = cell;
      [k, m] = previous.address;

      if (i > k && j === m) {
        this.clearWall(previous, 'south');
      }

      if (i === k && j > m) {
        this.clearWall(previous, 'east');
      }

      if (i === k && j < m) {
        this.clearWall(previous, 'west');
      }

      if (i < k && j === m) {
        this.clearWall(previous, 'north');
      }
    }
  }

  // isNeighbor(cell) {
  //   const [x, y] = cell.location;

  //   ctx.fillStyle = 'rgb(255, 215, 0)';
  //   ctx.fillRect(x + 1, y + 1, this.cellWidth - 1, this.cellHeight - 1);
  // }

  clearWall(cell, dir) {
    const [x, y] = cell.location;

    switch (dir) {
      case 'north':
        ctx.fillRect(
          x + 1,
          y + 1,
          this.cellWidth,
          this.cellHeight * -1
        );
        break;
      case 'east':
        ctx.fillRect(x + 1, y + 1, this.cellWidth * 2 + 1, this.cellHeight);
        break;
      case 'west':
        ctx.fillRect(
          x + 1,
          y + 1,
          (this.cellWidth) * -1,
          this.cellHeight
        );
        break;
      case 'south':
        ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight * 2 + 1);
        break;
      default:
        ctx.fillRect(x + 1, y + 1, 0, 0);
    }

    // if (dir === 'east') {
    //   ctx.fillRect(x + 1, y + 1, this.cellWidth * 2 + 1, this.cellHeight);
    // } else {
    //   //dir === 'south'
    //   ctx.fillRect(x + 1, y + 1, this.cellWidth, this.cellHeight * 2 + 1);
    // }
  }
}

const mazeBoard = new Board(5, 5);

mazeBoard.makeBoard();
mazeBoard.makeEntrance();
mazeBoard.makeExit();

const maze = new CanvasBoard(canvas.width, canvas.height, mazeBoard);
maze.initBoard();

// canvas.addEventListener('visited', (e) => {
//   const cell = e.detail;
//   maze.isVisited(cell);
// });

// canvas.addEventListener('found neighbor', (e) => {
//   const cell = e.detail;
//   maze.isNeighbor(cell);
// })

// canvas.addEventListener('clear wall', (e) => {
//   const { cell, dir } = e.detail;
//   maze.clearWall(cell, dir);
// })

const path = reverseBacktrack(mazeBoard.board);

console.log(mazeBoard.board);

// for (let i = 0; i < path.length; i++) {
//   window.setTimeout(() => {
//     console.log(path[i]);
//   }, 3000);
// }

const printPath = (index) => {
  if (index < path.length) {
    // console.log(path[i]);
    const [i, j] = path[index];

    const cell = mazeBoard.getCell(i, j);
    // let neighbor = null;

    // if (index < path.length - 1) {
    //   let [k, m] = path[index + 1];

    //   neighbor = mazeBoard.getCell(k, m);

    //   let start = null;
    //   let dir = '';

    //   if (i > k && j === m) {
    //     start = neighbor;
    //     dir = 'south';
    //   }

    //   if (i === k && j > m) {
    //     start = neighbor;
    //     dir = 'east';
    //   }

    //   if (i === k && j < m) {
    //     start = cell;
    //     dir = 'east';
    //   }

    //   if (i < k && j === m) {
    //     start = cell;
    //     dir = 'south';
    //   }

    //   maze.clearWall(cell, dir);
    // }

    maze.isVisited(cell);

    index++;

    window.setTimeout(() => {
      printPath(index);
    }, 1000);
  }
};

printPath(0);

// testMaze.drawBoard();
