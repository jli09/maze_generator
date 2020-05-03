//directions
const dirKeys = ['north', 'east', 'south', 'west'];

const directions = {
  north: [-1, 0],
  east: [0, 1],
  south: [1, 0],
  west: [0, -1],
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

const findNeighbor = (board, cell) => {
  shuffle(dirKeys);

  const [i0, j0] = cell.address;

  for (let i = 0; i < dirKeys.length; i++) {
    let dirKey = dirKeys[i];
    let k = i0 + directions[dirKey][0];
    let m = j0 + directions[dirKey][1];

    if (board[k] && board[k][m]) {
      let neighbor = board[k][m];

      if (!neighbor.visited) {
        return [neighbor, dirKey]; //return the neighbor and its direction relative to the cell
      }
    }
  }

  return [null, ''];
};

const reverseBacktrack = (board, cell) => {
  //if no cell given, start the path at the beginning of the board
  if (!cell) {
    cell = board[0][0];
  }

  //mark current cell as visited
  cell.visited = true;

  //find an unvisited neighbor on the board
    const [neighbor, direction] = findNeighbor(board, cell);

  //if unvisited neighbor is found, proceed by starting with that neighbor
  //else, backtrack to the previous cell and proceed
  //if there is no previous cell, we've traversed the whole board so quit

  if (neighbor) {
    //clear the wall between cell and the neighbor
    cell.clearWall(direction);

    //establish path between this cell and the neighbor
    neighbor.setPrevious(cell);
    cell.addNext(neighbor);

    reverseBacktrack(board, neighbor);
  } else {
    let previous = cell.previous;

    // console.log('previous: ', previous);

    if (previous) {
      reverseBacktrack(board, previous);
    }
  }
};
