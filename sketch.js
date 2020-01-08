const size = 100;
const grid = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0]
];
const gameColor = {
  2: { color: "#776E65", background: "#EEE4DA" },
  4: { color: "#776E65", background: "#EDE0C8" },
  8: { color: "#F9F6F2", background: "#F2B179" },
  16: { color: "#F9F6F2", background: "#F59563" },
  32: { color: "#F9F6F2", background: "#F67C5F" },
  64: { color: "#F9F6F2", background: "#F65E3B" },
  128: { color: "#F9F6F2", background: "#EDCF72" },
  256: { color: "#F9F6F2", background: "#EDCC61" },
  512: { color: "#F9F6F2", background: "#EDC850" },
  1024: { color: "#F9F6F2", background: "#EDC53F" },
  2048: { color: "#F9F6F2", background: "#EDC22E" }
};

function setup() {
  createCanvas(475, 475);
  background("#bbada0");
}

function draw() {
  create();
  noLoop();
  addNumber();
  addNumber();
  render();
}

function create() {
  const x = 15;
  const y = 15;
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      let sX = x + x * j + size * j;
      let sY = y + y * i + size * i;
      grid[i][j] = { x: sX, y: sY, number: 0 };
      noStroke();
      fill("#cdc1b4");
      square(sX, sY, size, 5);
    }
  }
}

function keyPressed() {
  if (keyCode === LEFT_ARROW) {
    moveLeft();
    render();
    addNumber();
    render();
  }
  if (keyCode === RIGHT_ARROW) {
    moveRight();
    render();
    addNumber();
    render();
  }
  if (keyCode === UP_ARROW) {
    moveUp();
    render();
    addNumber();
    render();
  }
  if (keyCode === DOWN_ARROW) {
    moveDown();
    render();
    addNumber();
    render();
  }
}

function moveDown() {
  for (let j = 0; j < 4; j++) {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if (grid[i][j].number !== 0) {
        arr.push(grid[i][j].number);
      }
    }
    if (arr.length != 4) {
      const missing = 4 - arr.length;
      const zeros = Array(missing).fill(0);
      arr = zeros.concat(arr);
    }
    for (let i = 0; i < 4; i++) {
      grid[i][j].number = arr[i];
    }
  }

  for (let j = 0; j < 4; j++) {
    for (let i = 3; i >= 1; i--) {
      if (grid[i][j].number === grid[i - 1][j].number) {
        grid[i][j].number *= 2;
        grid[i - 1][j].number = 0;
      }
      if (grid[i][j].number === 0 && grid[i - 1][j].number !== 0) {
        grid[i][j].number = grid[i - 1][j].number;
        grid[i - 1][j].number = 0;
      }
    }
  }
}

function moveUp() {
  for (let j = 0; j < 4; j++) {
    let arr = [];
    for (let i = 0; i < 4; i++) {
      if (grid[i][j].number !== 0) {
        arr.push(grid[i][j].number);
      }
    }
    if (arr.length != 4) {
      const missing = 4 - arr.length;
      const zeros = Array(missing).fill(0);
      arr = arr.concat(zeros);
    }
    for (let i = 0; i < 4; i++) {
      grid[i][j].number = arr[i];
    }
  }

  for (let j = 0; j < 4; j++) {
    for (let i = 0; i < 3; i++) {
      if (grid[i][j].number === grid[i + 1][j].number) {
        grid[i][j].number *= 2;
        grid[i + 1][j].number = 0;
      }
      if (grid[i][j].number === 0 && grid[i + 1][j].number !== 0) {
        grid[i][j].number = grid[i + 1][j].number;
        grid[i + 1][j].number = 0;
      }
    }
  }
}

function moveRight() {
  for (let i = 0; i < 4; i++) {
    let arr = [];
    grid[i].forEach(row => {
      if (row.number !== 0) {
        arr.push(row.number);
      }
    });
    if (arr.length != 4) {
      const missing = 4 - arr.length;
      const zeros = Array(missing).fill(0);
      arr = zeros.concat(arr);
    }
    for (let j = 0; j < 4; j++) {
      grid[i][j].number = arr[j];
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 3; j >= 1; j--) {
      if (grid[i][j].number === grid[i][j - 1].number) {
        grid[i][j].number *= 2;
        grid[i][j - 1].number = 0;
      }
      if (grid[i][j].number === 0 && grid[i][j - 1].number !== 0) {
        grid[i][j].number = grid[i][j - 1].number;
        grid[i][j - 1].number = 0;
      }
    }
  }
}

function moveLeft() {
  for (let i = 0; i < 4; i++) {
    let arr = [];
    grid[i].forEach(row => {
      if (row.number !== 0) {
        arr.push(row.number);
      }
    });
    if (arr.length != 4) {
      const missing = 4 - arr.length;
      const zeros = Array(missing).fill(0);
      arr = arr.concat(zeros);
    }
    for (let j = 0; j < 4; j++) {
      grid[i][j].number = arr[j];
    }
  }

  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 3; j++) {
      if (grid[i][j].number === grid[i][j + 1].number) {
        grid[i][j].number *= 2;
        grid[i][j + 1].number = 0;
      }
      if (grid[i][j].number === 0 && grid[i][j + 1].number !== 0) {
        grid[i][j].number = grid[i][j + 1].number;
        grid[i][j + 1].number = 0;
      }
    }
  }
}

function addNumber() {
  let spot = random(grid.flat());
  while (spot.number !== 0) {
    spot = random(grid.flat());
  }
  spot.number = random() > 0.5 ? 2 : 4;
}

function render() {
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      if (grid[i][j].number === 0) {
        noStroke();
        fill("#cdc1b4");
        square(grid[i][j].x, grid[i][j].y, size, 5);
      } else {
        noStroke();
        fill(gameColor[grid[i][j].number].background);
        square(grid[i][j].x, grid[i][j].y, size, 5);
        textAlign(CENTER, CENTER);
        fill(gameColor[grid[i][j].number].color);
        textSize(size / 2);
        if (grid[i][j].number > 1000) {
          textSize(size / 3);
        }
        textStyle(BOLD);
        text(
          grid[i][j].number,
          grid[i][j].x + size / 2,
          grid[i][j].y + size / 2
        );
      }
    }
  }
}
