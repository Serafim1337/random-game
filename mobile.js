document.addEventListener("touchstart", handleTouchStart, false);
document.addEventListener("touchmove", handleTouchMove, false);

var xDown = null;
var yDown = null;
let currentMove;
function getTouches(evt) {
  return evt.touches;
}

function handleTouchStart(evt) {
  const firstTouch = getTouches(evt)[0];
  xDown = firstTouch.clientX;
  yDown = firstTouch.clientY;
}

function handleTouchMove(evt) {
  if (!xDown || !yDown) {
    return;
  }

  var xUp = evt.touches[0].clientX;
  var yUp = evt.touches[0].clientY;

  var xDiff = xDown - xUp;
  var yDiff = yDown - yUp;

  if (Math.abs(xDiff) > Math.abs(yDiff)) {
    /*most significant*/
    if (xDiff > 0) {
      /* right swipe */
      currentMove = "right";
    } else {
      /* left swipe */
      currentMove = "left";
    }
  } else {
    if (yDiff > 0) {
      /* down swipe */
      currentMove = "down";
    } else {
      /* up swipe */
      currentMove = "up";
    }
  }

  let isFlipped = false;
  let isRotated = false;
  let isPlayed = true;

  switch (currentMove) {
    case "up":
      // do nothing
      break;
    case "down":
      grid = flipGrid(grid);
      isFlipped = true;
      break;
    case "left":
      grid = rotateGrid(grid);
      isRotated = true;
      break;
    case "right":
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
    }

    let gameWon = isGameWon();
    if (gameWon) {
      console.log("You win!");
    }
  }

  /* reset values */
  xDown = null;
  yDown = null;
}
