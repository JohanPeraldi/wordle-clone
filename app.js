const tileDisplay = document.querySelector(".tile-container");
const keyboard = document.querySelector(".key-container");
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

const word = "OVENS";
let currentRow = 0;
let currentTile = 0;

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
    console.log("Check if word is correct");
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

const addLetter = (letter) => {
  const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
  tile.textContent = letter;
  rows[currentRow][currentTile] = letter;
  tile.setAttribute("data", letter);
  currentTile++;
};

const deleteLetter = () => {
  currentTile--;
  const tile = document.getElementById(`row-${currentRow}-tile-${currentTile}`);
  tile.textContent = "";
  rows[currentRow][currentTile] = "";
  tile.setAttribute("data", "");
};
