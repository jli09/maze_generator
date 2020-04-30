//directions
const directions = [
  [0, -1],
  [-1, 0],
  [1, 0],
  [0, 1],
];

//helper functions
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = arr[i];
    arr[i] = arr[j];
    arr[j] = temp;
  }
}


//main function
function recursiveBacktrack(grid) {
  //select start at random, if not given one
  console.log('grid, x, y: ', grid, x, y);

  if (!(x && y)) {
    x = Math.floor(Math.random() * grid.length);
    y = Math.floor(Math.random() * grid.length);
  }

  let start = grid[x][y];
  start.visited = true;

  console.log('x, y, start: ', x, y, start);

  //get neighbors
  shuffle(directions);
  console.log('directions: ', directions);

  let neighbor = null;

  //find random unvisited neighbor, if one exists
  for (let i = 0; i < directions.length; i++) {
    x += directions[i][0];
    y += directions[i][1];

    if (grid[x] && grid[x][y]) {
      if (!grid[x][y].visited) {
        neighbor = grid[x][y];
        break;
      }
    }
  }

  console.log('neighbors: ', neighbors);

  // //if unvisited neighbor exists, carve path and recurse
  // if (neighbors) {
  //   for (let i = 0; i < neighbors.length; i++) {
  //     let cell = neighbors[i];
  //     start.clearWall()
  //   }
  // }
  // if (neighbor) {
  //   start.clearWall([x, y]);
  //   recursiveBacktrack(grid, x, y);
  // }
}
