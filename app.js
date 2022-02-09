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

let wordle;
let currentRow = 0;
let currentTile = 0;
let isGameOver = false;

const getWordle = () => {
  // fetch(`http://localhost:${process.env.PORT}/word`) // This does not work
  fetch(`http://localhost:8080/word`)
    .then((response) => response.json())
    .then((json) => {
      console.log(json);
      wordle = json.toUpperCase();
    })
    .catch((err) => console.log(err));
};

getWordle(); // Should be part of an init function!

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
  setTimeout(() => {
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    messageDisplay.append(messageElement);
    setTimeout(() => messageDisplay.removeChild(messageElement), 5000);
  }, 2500);
};

// Color keyboard keys after user input check
const changeKeyColor = (keyLetter, color) => {
  const key = document.getElementById(keyLetter);
  key.classList.add(color);
};

const flipTile = () => {
  const rowTiles = document.getElementById(`row-${currentRow}`).childNodes;
  let checkWordle = wordle;
  const userInput = [];
  rowTiles.forEach((tile) => {
    userInput.push({
      letter: tile.getAttribute("data"),
      color: "overlay-letter-absent",
    });
  });
  userInput.forEach((userInput, index) => {
    if (userInput.letter === wordle[index]) {
      userInput.color = "overlay-letter-match";
      checkWordle = checkWordle.replace(userInput.letter, "");
    }
  });
  userInput.forEach((userInput) => {
    if (checkWordle.includes(userInput.letter)) {
      userInput.color = "overlay-letter-misplaced";
      checkWordle = checkWordle.replace(userInput.letter, "");
    }
  });
  rowTiles.forEach((tile, index) => {
    setTimeout(() => {
      tile.classList.add(userInput[index].color, "flip");
      changeKeyColor(userInput[index].letter, userInput[index].color);
    }, 500 * index);
  });
};
