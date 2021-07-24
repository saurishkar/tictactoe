export function hasPlayerWon(arr) {
  // Checking rows
  for (var a = 0; a < arr.length; a++) {
    if (arr[a][0] === arr[a][1] && arr[a][1] === arr[a][2] && arr[a][0] != '') {
      // If a particular row has the winning move
      return [
        [a, 0],
        [a, 1],
        [a, 2],
      ];
    }

    if (arr[0][a] === arr[1][a] && arr[1][a] === arr[2][a] && arr[0][a] != '') {
      return [
        [0, a],
        [1, a],
        [2, a],
      ];
    }
  }
  // If a particular diagonal has the winning move
  if (arr[0][0] === arr[1][1] && arr[1][1] === arr[2][2] && arr[0][0] != '') {
    return [
      [0, 0],
      [1, 1],
      [2, 2],
    ];
  }
  if (arr[0][2] === arr[1][1] && arr[1][1] === arr[2][0] && arr[0][2] != '') {
    return [
      [0, 2],
      [1, 1],
      [2, 0],
    ];
  }
  return [];
}

export function getBestMove(state, player, opponent) {
  let best = -1000,
    pos = [],
    moveGrid = [...state];
  //assigning values of state into moveGrid

  //filling moveGrid with the optimal move values
  for (let a = 0; a < 3; a++) {
    for (let b = 0; b < 3; b++) {
      if (state[a][b] == '') {
        state[a][b] = opponent;
        moveGrid[a][b] = findOptimalMove(state, 1, 0, player, opponent);
        if (moveGrid[a][b] >= best) {
          best = moveGrid[a][b];
          pos = [a, b];
        }
        state[a][b] = '';
      }
    }
  }
  return pos;
}

export function isGridFull(arr) {
  var flag = 0;
  for (var a = 0; a < 3; a++) {
    for (var b = 0; b < 3; b++) {
      if (arr[a][b] == '') {
        flag = 1;
        break;
      }
    }
    if (flag == 1) break;
  }
  if (flag == 0) {
    return true;
  } else return false;
}

//recursive function that returns the grid with all the possible results for every move
function findOptimalMove(localState, isCpu, depth, player, opponent) {
  var best = isCpu == 1 ? -1000 : 1000;
  // console.log("current State and depth and isCpu", localState, depth, isCpu);
  if (hasPlayerWon(localState).length) {
    // console.log("value returned will be ", (isCpu == 1) ? 10 - depth : -10 - depth);
    // console.log('win state', localstate);
    return isCpu == 1 ? 10 - depth : -10 - depth;
  } else if (isFull(localState)) {
    // console.log('grid full', isCpu, depth);
    return isCpu == 1 ? 0 - depth : 0 - depth;
  }

  // moves = fetchPossibleMoves(localState);
  // console.log("possible moves", moves);
  for (var a = 0; a < 3; a++) {
    for (var b = 0; b < 3; b++) {
      if (localState[a][b] == '')
        localState[a][b] = isCpu == 1 ? player : opponent;
      else continue;

      if (isCpu == 1) {
        best = Math.max(
          best,
          findOptimalMove(localState, isCpu * -1, depth + 1, player, opponent),
        );
        // console.log('max' , best);
      } else {
        best = Math.min(
          best,
          findOptimalMove(localState, isCpu * -1, depth + 1, player, opponent),
        );
        // console.log('min', best);
      }

      localState[a][b] = '';
    }
  }
  // console.log('best', best);
  return best;
}

function isFull(arr) {
  var flag = 0;
  for (var a = 0; a < 3; a++) {
    for (var b = 0; b < 3; b++) {
      if (arr[a][b] === '') {
        flag = 1;
        break;
      }
    }
    if (flag === 1) {
      break;
    }
  }
  if (flag === 0) {
    return true;
  }
  return false;
}
