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

const findNeighbor = (grid, cell) => {
    shuffle(directions);

    const [i0, j0] = cell.getLocation();

    for (let i = 0; i < directions.length; i++) {
        let k = i0 + directions[i][0];
        let m = j0 + directions[i][1];

        if (grid[k] && grid[k][m]) {
            let neighbor = grid[k][m];

            if (!neighbor.getVisited()) {
                return neighbor;
            }
        }
    }

    return null;
}

const reverseBacktrack = (grid, cell) => {
    if (!cell) {
        cell = grid[0][0];
    }

    cell.isVisited();

    // console.log('current cell: ', cell);

    let neighbor = findNeighbor(grid, cell);

    // console.log('neighbor: ', neighbor);

    if (neighbor) {
        neighbor.setPrevious(cell);
        reverseBacktrack(grid, neighbor);
    } else {
        let previous = cell.getPrevious();

        // console.log('previous: ', previous);

        if (previous) {
            reverseBacktrack(grid, previous);
        }
    }
}