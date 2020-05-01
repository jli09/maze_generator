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

const findNeighbor = (board, cell) => {
    shuffle(directions);

    const [x, y] = cell.getLocation();

    for (let i = 0; i < directions.length; i++) {
        let k = x + directions[i][0];
        let m = y + directions[i][1];

        if (board[k] && board[k][m]) {
            let neighbor = board[k][m];

            if (!neighbor.getVisited()) {
                return neighbor;
            }
        }
    }

    return null;
}

const reverseBacktrack = (board, cell) => {
    if (!cell) {
        cell = board[0][0];
    }

    cell.isVisited();

    // console.log('current cell: ', cell);

    let neighbor = findNeighbor(board, cell);

    // console.log('neighbor: ', neighbor);

    if (neighbor) {
        neighbor.setPrevious(cell);
        reverseBacktrack(board, neighbor);
    } else {
        let previous = cell.getPrevious();

        // console.log('previous: ', previous);

        if (previous) {
            reverseBacktrack(board, previous);
        }
    }
}