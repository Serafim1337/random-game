let grid;
let score = 0;

function blankGrid() {
  return [
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
    [0, 0, 0, 0],
  ];
}

function addNumber() {
  let options = [];
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] === 0) {
        options.push({
          x: i,
          y: j,
        });
      }
    }
  }
  if (options.length > 0) {
    let spot = random(options);
    let randomNumber = random(1);
    grid[spot.x][spot.y] = randomNumber > 0.5 ? 2 : 4;
  }
}

function compare(a, b) {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (a[i][j] !== b[i][j]) {
        return true;
      }
    }
  }
  return false;
}

function copyGrid(grid) {
  let extraGrid = blankGrid();

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      extraGrid[i][j] = grid[i][j];
    }
  }
  return extraGrid;
}

function flipGrid(grid) {
  for (let i = 0; i < 4; i++) {
    grid[i].reverse();
  }
  return grid;
}

function rotateGrid(grid) {
  let newGrid = blankGrid();
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      newGrid[i][j] = grid[j][i];
    }
  }
  return newGrid;
}

function keyPressed() {
  let isFlipped = false;
  let isRotated = false;
  let isPlayed = true;

  switch (keyCode) {
    case DOWN_ARROW:
      // do nothing
      break;
    case UP_ARROW:
      grid = flipGrid(grid);
      isFlipped = true;
      break;
    case RIGHT_ARROW:
      grid = rotateGrid(grid);
      isRotated = true;
      break;
    case LEFT_ARROW:
      grid = rotateGrid(grid);
      grid = flipGrid(grid);
      isRotated = true;
      isFlipped = true;
      break;
    default:
      isPlayed = false;
  }

  if (isPlayed) {
    let past = copyGrid(grid);

    for (let i = 0; i < 4; i++) {
      grid[i] = operate(grid[i]);
    }

    let isChanged = compare(past, grid);

    if (isFlipped) {
      grid = flipGrid(grid);
    }

    if (isRotated) {
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
      grid = rotateGrid(grid);
    }

    if (isChanged) {
      addNumber();
    }
    updateCanvas();

    let gameOver = isGameOver();
    if (gameOver) {
      console.log("Game over");
      createModal("Game over! :(");
    }

    let gameWon = isGameWon();
    if (gameWon) {
      console.log("You win!");
      createModal("You win! :)");
    }
  }
}

function operate(row) {
  row = slide(row);
  row = combine(row);
  row = slide(row);
  return row;
}

function combine(row) {
  for (let i = 3; i >= 1; i--) {
    let currentCell = row[i];
    let previousCell = row[i - 1];
    if (currentCell == previousCell) {
      row[i] = currentCell + previousCell;
      score += row[i];
      row[i - 1] = 0;
    }
  }
  return row;
}

function slide(row) {
  let resultArray = row.filter((value) => value);
  let missingSpots = 4 - resultArray.length;
  let zeros = Array(missingSpots).fill(0);
  resultArray = zeros.concat(resultArray);
  return resultArray;
}
