function setup() {
  createCanvas(400, 400);
  noLoop();
  grid = blankGrid();
  addNumber();
  addNumber();
  updateCanvas();
}

function updateCanvas() {
  background(255);
  drawGrid();
  select("#score").html(score);
}

function drawGrid() {
  let w = 100;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let value = grid[i][j];

      strokeWeight(2);
      stroke(0);

      switch (value) {
        case 0:
          fill("#dce4f2");
          break;
        case 2:
          fill("#F2E205");
          break;
        case 4:
          fill("#F29F05");
          break;
        case 8:
          fill("#FF6F32");
          break;
        case 16:
          fill("#FF0500");
          break;
        case 32:
          fill("#1FE6DD");
          break;
        case 64:
          fill("#3C8BE6");
          break;
        case 128:
          fill("#1F54E6");
          break;
        case 256:
          fill("#12FFB1");
          break;
        case 512:
          fill("#34FF78");
          break;
        case 1024:
          fill("#007A10");
          break;
        case 2048:
          fill("#D473FA");
          break;
      }

      rect(i * w, j * w, w, w);

      if (grid[i][j] !== 0) {
        textAlign(CENTER, CENTER);

        if (value > 64) {
          textSize(40);
        } else if (value > 512) {
          textSize(30);
        } else {
          textSize(64);
        }
        textFont("Fredoka");
        fill(0);
        noStroke();
        text(value, i * w + w / 2, j * w + w / 2);
      }
    }
  }
}
