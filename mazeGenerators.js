//directions
const canvas = document.getElementById('tutorial');

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

//main function

const reverseBacktrack = (board, cell, path = []) => {
  //if no cell given, start the path at the beginning of the board
  if (!cell) {
    cell = board[0][0];
  }

  //mark current cell as visited and dispatch to canvas
  cell.visited = true;

  // canvas.dispatchEvent(new CustomEvent('visited', { detail: cell }));

  //find an unvisited neighbor on the board
  const [neighbor, direction] = findNeighbor(board, cell);

  //if unvisited neighbor is found, proceed by starting with that neighbor
  //else, backtrack to the previous cell and proceed
  //if there is no previous cell, we've traversed the whole board so quit

  if (neighbor) {
    //dispatch to canvas
    // canvas.dispatchEvent(
    //   new CustomEvent('found neighbor', { detail: neighbor })
    // );

    //clear the wall between cell and the neighbor and dispatch
    //adjust for how the board is set up
    switch (direction) {
      case 'north':
        neighbor.clearWall('south');
        // canvas.dispatchEvent(
        //   new CustomEvent('clear wall', {
        //     detail: { cell: neighbor, dir: 'south' },
        //   })
        // );
        break;
      case 'west':
        neighbor.clearWall('east');
        // canvas.dispatchEvent(
        //   new CustomEvent('clear wall', {
        //     detail: { cell: neighbor, dir: 'east' },
        //   })
        // );
        break;
      default:
        cell.clearWall(direction);
        // canvas.dispatchEvent(
        //   new CustomEvent('clear wall', {
        //     detail: { cell, dir: direction },
        //   })
        // );
    }

    //establish path between this cell and the neighbor
    neighbor.setPrevious(cell);
    cell.addNext(neighbor);

    path.push(cell.address)

    return reverseBacktrack(board, neighbor, path);
  } else {
    let previous = cell.previous;
    path.push(cell.address);

    // console.log('previous: ', previous);

    if (previous) {
      return reverseBacktrack(board, previous, path);
    } else return path;
  }
};
