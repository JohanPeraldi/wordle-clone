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

const handleClick = () => {
  console.log("clicked");
};

keys.forEach((key) => {
  const buttonElement = document.createElement("button");
  buttonElement.textContent = key;
  buttonElement.setAttribute("id", key);
  buttonElement.addEventListener("click", handleClick);
  keyboard.append(buttonElement);
});
