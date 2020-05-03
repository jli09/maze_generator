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
  }

  const testBoard = new Board(5, 5);

  testBoard.makeBoard();
  testBoard.makeEntrance();
  testBoard.makeExit();

  // reverseBacktrack(testBoard.board);

  console.log(testBoard.board);

  const testMaze = new CanvasBoard(canvas.width, canvas.height, testBoard);
  testMaze.initBoard();

  // testMaze.drawBoard();
}
