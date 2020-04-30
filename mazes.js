//directions
const directions = {
  top: [0, -1],
  left: [-1, 0],
  right: [1, 0],
  bottom: [0, 1],
};

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
  //select start at random
  console.log('grid', grid);

  let x = Math.floor(Math.random() * grid.length);
  let y = Math.floor(Math.random() * grid.length);

  //initialize path stack and push start

  const stack = [];
  const start = grid[x][y];
  let current = start;

  console.log('x, y, start: ', x, y, start);

  current.visited = true;
  stack.push(current);

  //while stack
  while (stack.length > 0) {
    let x = current.location[0];
    let y = current.location[1];

    console.log('x, y, current: ', x, y, current);
    console.log('stack: ', stack);

    //get neighbors
    let keys = Object.keys(directions);
    let selectedKey = '';
    shuffle(keys);

    console.log('directions: ', keys);

    let neighbor = null;

    //find random unvisited neighbor, if one exists
    for (let i = 0; i < keys.length; i++) {
      let k = x + directions[keys[i]][0];
      let m = y + directions[keys[i]][1];
      console.log('in loop ', k, m);

      if (grid[k] && grid[k][m]) {
        if (!grid[k][m].visited) {
          neighbor = grid[k][m];
          selectedKey = keys[i];
          break;
        }
      }
    }

    console.log('neighbor: ', neighbor);
    console.log('selectedKey: ', selectedKey)

    if (neighbor) {
      current.clearWall(selectedKey);
      current.fill();

      neighbor.visited = true;
      stack.push(neighbor);
      current = neighbor;
    } else {
      current = stack.pop();
      if (current === start) break;
    }
  }
}
