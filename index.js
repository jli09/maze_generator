function draw() {
  //setting up canvas
  const canvas = document.getElementById('tutorial');
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
      this.board = board.board;

      this.wallWidth = width / board.width;
      this.wallHeight = height / board.height;

      this.cellWidth = this.wallWidth - 2;
      this.cellHeight = this.wallHeight - 2;
    }

    initBoard() {
      const { board } = this;

      for (let i = 0; i < board.length; i++) {
        for (let j = 0; j < board[i].length; j++) {
          this.initCell(board[i][j]);
        }
      }
    }

    initCell(cell) {
      let [y, x] = cell.address;

      //set starting point, i.e. top left corner of cell on canvas *inside of walls*

      if (x === 0) x = 1;
      else x = x * this.wallWidth;

      if (y === 0) y = 1;
      else y = y * this.wallHeight;

      cell.location = [x, y];

      //get the wall keys from cell
      let wallKeys = Object.keys(cell.walls);

      for (let i = 0; i < wallKeys.length; i++) {
        let dir = wallKeys[i];

        //if the wall is set to true, draw the wall
        if (dir) this.makeWall(cell, dir);
      }
    }

    makeWall(cell, dir) {
      let start = [];
      let end = [];
      let [x, y] = cell.location;

      const { wallWidth, wallHeight } = this;

      //adjustment for edges
      if (cell.address[1] === 0) x = x - 1;
      if (cell.address[0] === 0) y = y - 1;

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
          end = [x + wallWidth, y + wallHeight]
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

    // makeTopWall(x, y) {
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(x + this.wallWidth, y);
    //   ctx.stroke();
    //   ctx.closePath();
    // }

    // makeLeftWall(x, y) {
    //   ctx.beginPath();
    //   ctx.moveTo(x, y);
    //   ctx.lineTo(x, y + this.wallHeight);
    //   ctx.stroke();
    //   ctx.closePath();
    // }

    // makeRightWall(x, y) {
    //   ctx.beginPath();
    //   ctx.moveTo(x + this.wallWidth, y);
    //   ctx.lineTo(x + this.wallWidth, y + this.wallHeight);
    //   ctx.stroke();
    //   ctx.closePath();
    // }

    // makeBottomWall(x, y) {
    //   ctx.beginPath();
    //   ctx.moveTo(x, y + this.wallHeight);
    //   ctx.lineTo(x + this.wallWidth, y + this.wallHeight);
    //   ctx.stroke();
    //   ctx.closePath();
    // }

    // drawBoard() {
    //   const { grid } = this;

    //   for (let i = 0; i < grid.length; i++) {
    //     let row = grid[i];

    //     for (let j = 0; j < row.length; j++) {
    //       let cell = grid[i][j];

    //       if (i === 0)
    //         this.makeTopWall(j * this.wallWidth, i * this.wallHeight);
    //       if (j === 0)
    //         this.makeLeftWall(j * this.wallWidth, i * this.wallHeight);

    //       if (j === grid[i].length - 1 || (grid[i][j + 1].previous !== cell && cell.previous !== grid[i][j + 1]))
    //         this.makeRightWall(j * this.wallWidth, i * this.wallHeight);

    //       if (i === grid.length - 1 || (grid[i + 1][j].previous !== cell && cell.previous !== grid[i+1][j]))
    //         this.makeBottomWall(j * this.wallWidth, i * this.wallHeight);
    //     }
    //   }
    // }
  }

  const testBoard = new Board(5, 5);

  testBoard.makeBoard();
  // reverseBacktrack(testBoard.board);

  console.log(testBoard.board);

  const testMaze = new CanvasBoard(canvas.width, canvas.height, testBoard);
  testMaze.initBoard();

  // testMaze.drawBoard();
}
