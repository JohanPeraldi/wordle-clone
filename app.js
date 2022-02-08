const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
const messageDisplay = document.querySelector(".message-container");
const keys = [
  "Q",
  "W",
  "E",
  "R",
  "T",
  "Y",
  "U",
  "I",
  "O",
  "P",
  "A",
  "S",
  "D",
  "F",
  "G",
  "H",
  "J",
  "K",
  "L",
  "ENTER",
  "Z",
  "X",
  "C",
  "V",
  "B",
  "N",
  "M",
  "⇤\n",
];

const wordle = "OVENS";
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const rows = [
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
  ["", "", "", "", ""],
];

rows.forEach((row, rowIndex) => {
  const rowElement = document.createElement("div");
  rowElement.setAttribute("id", "row-" + rowIndex);
  row.forEach((tile, tileIndex) => {
    const tileElement = document.createElement("div");
    tileElement.setAttribute("id", "row-" + rowIndex + "-tile-" + tileIndex);
    tileElement.classList.add("tile");
    rowElement.append(tileElement);
  });
  tileDisplay.append(rowElement);
});

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", () => handleClick(key));
  keyboard.append(buttonElement);
});

const handleClick = (letter) => {
  console.log("clicked", letter);
  if (letter === "ENTER") {
    if (currentTile > 4) {
      checkUserInput();
    }
  } else if (letter === "⇤\n") {
    if (currentTile > 0) {
      deleteLetter();
    }
  } else {
    if (currentTile < 5 && currentRow < 6) {
      addLetter(letter);
    }
  }
  console.log(rows);
};

// Clicking a letter button
const addLetter = (letter) => {
  const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
  tile.textContent = letter;
  rows[currentRow][currentTile] = letter;
  tile.setAttribute("data", letter);
  currentTile++;
};

// Clicking the backspace button
const deleteLetter = () => {
  currentTile--;
  const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
  tile.textContent = "";
  rows[currentRow][currentTile] = "";
  tile.setAttribute("data", "");
};

// Clicking the ENTER button
const checkUserInput = () => {
  const userInput = rows[currentRow].join("");
  flipTile();
  console.log(`User input is: ${userInput}\nWordle is: ${wordle}`);
  if (userInput === wordle) {
    showMessage("Well done!");
    isGameOver = true;
  } else {
    if (currentRow >= 5) {
      isGameOver = true;
      showMessage("Game over");
    }
    if (currentRow < 5) {
      currentRow++;
      currentTile = 0;
    }
  }
};

const showMessage = (message) => {
  const messageElement = document.createElement("p");
  messageElement.textContent = message;
  messageDisplay.append(messageElement);
  setTimeout(() => messageDisplay.removeChild(messageElement), 2000);
};

const flipTile = () => {
  const rowTiles = document.querySelector(`#row-${currentRow}`).childNodes;
  rowTiles.forEach((tile, index) => {
    const letterData = tile.getAttribute("data");
    if (letterData === wordle[index]) {
      tile.classList.add("overlay", "overlay-letter-match");
    } else if (wordle.includes(letterData)) {
      tile.classList.add("overlay", "overlay-letter-misplaced");
    } else {
      tile.classList.add("overlay", "overlay-letter-absent");
    }
  });
};
