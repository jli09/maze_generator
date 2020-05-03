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
      // this.width = width;
      // this.height = height;
      this.grid = board.getBoard();
      this.wallWidth = width / board.width;
      this.wallHeight = height / board.height;
    }

    makeTopWall(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x + this.wallWidth, y);
      ctx.stroke();
      ctx.closePath();
    }

    makeLeftWall(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x, y + this.wallHeight);
      ctx.stroke();
      ctx.closePath();
    }

    makeRightWall(x, y) {
      ctx.beginPath();
      ctx.moveTo(x + this.wallWidth, y);
      ctx.lineTo(x + this.wallWidth, y + this.wallHeight);
      ctx.stroke();
      ctx.closePath();
    }

    makeBottomWall(x, y) {
      ctx.beginPath();
      ctx.moveTo(x, y + this.wallHeight);
      ctx.lineTo(x + this.wallWidth, y + this.wallHeight);
      ctx.stroke();
      ctx.closePath();
    }

    drawBoard() {
      const { grid } = this;

      for (let i = 0; i < grid.length; i++) {
        let row = grid[i];

        for (let j = 0; j < row.length; j++) {
          let cell = grid[i][j];

          if (i === 0)
            this.makeTopWall(j * this.wallWidth, i * this.wallHeight);
          if (j === 0)
            this.makeLeftWall(j * this.wallWidth, i * this.wallHeight);
          
          if (j === grid[i].length - 1 || (grid[i][j + 1].previous !== cell && cell.previous !== grid[i][j + 1])) 
            this.makeRightWall(j * this.wallWidth, i * this.wallHeight);
          
          if (i === grid.length - 1 || (grid[i + 1][j].previous !== cell && cell.previous !== grid[i+1][j]))
            this.makeBottomWall(j * this.wallWidth, i * this.wallHeight);
        }
      }
    }
  }

  const testBoard = new Board(5, 5);

  testBoard.makeBoard();
  reverseBacktrack(testBoard.board);

  console.log(testBoard.board);

  // const testMaze = new CanvasBoard(600, 600, testBoard);
  // testMaze.drawBoard();
}
