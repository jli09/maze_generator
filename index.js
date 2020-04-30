function draw() {
  //setting up canvas
  const canvas = document.getElementById('tutorial');
  const ctx = canvas.getContext('2d');

  console.log('canvas: ', canvas);
  console.log('context: ', ctx);

  ctx.strokeStyle = 'black';
  ctx.lineWidth = 1;

  class Cell {
    constructor(width, height, scale) {
      this.scale = scale;
      this.width = width * scale;
      this.height = height * scale;
      this.visited = false;
      this.location = null;
    }

    render() {
      const { width, height, scale } = this;

      ctx.beginPath();
      ctx.moveTo(width, height);
      ctx.lineTo(width + scale, height);
      ctx.stroke();
      ctx.lineTo(width + scale, height + scale);
      ctx.stroke();
      ctx.lineTo(width, height + scale);
      ctx.stroke();
      ctx.lineTo(width, height);
      ctx.stroke();
      ctx.closePath();
    }

    clearWall(dir) {
      const { width, height, scale } = this;

      ctx.clearRect(width + dir[0], height + dir[1], scale + dir[0], scale + dir[1]);

    //   switch (dir) {
    //     case 'top':
    //       ctx.clearRect(width + 1, height - 1, scale - 2, scale);
    //       break;
    //     case 'left':
    //       ctx.clearRect(width - 1, height + 1, scale, scale - 2);
    //       break;
    //     case 'right':
    //       ctx.clearRect(width + 1, height + 1, scale, scale - 2);
    //       break;
    //     case 'bottom':
    //       ctx.clearRect(width + 1, height + 1, scale - 2, scale);
    //       break;
    //     default:
    //       ctx.clearRect(0, 0, 0, 0);
    //   }
    }
  }

  class Board {
    constructor(x, y, size) {
      this.width = x;
      this.height = y;
      this.size = size;
      this.grid = [];
    }

    makeBoard() {
      const { width, height, size, grid } = this;
      const scale = size / width;

      for (let i = 0; i < width; i++) {
        let row = [];

        for (let j = 0; j < height; j++) {
          const newCell = new Cell(i, j, scale);
          newCell.location = [i, j];
          newCell.render();
          row.push(newCell);
        }

        grid.push(row);
      }
    }

    clear() {
      const { grid } = this;

      for (let i = 0; i < grid.length; i++) {
        let row = grid[i];

        for (let j = 0; j < row.length; j++) {
          row[j].visited = false;
        }
      }
    }
  }

  const testBoard = new Board(5, 5, 600);
  testBoard.makeBoard();

  console.log('test grid: ', testBoard);

  testBoard.clear();
  recursiveBacktrack(testBoard.grid);

  // let testCell = testGrid.cells[2][2];
  // testCell.clearWall([-1, 0]);
}
