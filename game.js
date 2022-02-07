function isGameOver() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 0) {
        return false;
      }

      if (i !== 3 && grid[i][j] === grid[i + 1][j]) {
        return false;
      }

      if (j !== 3 && grid[i][j] === grid[i][j + 1]) {
        return false;
      }
    }
  }
  return true;
}

function isGameWon() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j] == 2048) {
        return true;
      }
    }
  }
  return false;
}

function createModal(status) {
  const overlay = document.querySelector(".overlay");
  const modalStatus = document.querySelector("#status");
  modalStatus.textContent = status;
  overlay.style.display = "block";
}
