const app = {
  // Initialize app
  init: function () {
    // Fetch the wordle with call to API
    app.getWordle();
    // Create game rows
    app.createRows();
    // Create keyboard
    app.createKeyboard();
    // Activate event listeners
    app.listenToEvents();
  },
  getWordle: function () {
    // fetch(`http://localhost:${process.env.PORT}/word`) // This does not work
    fetch(`http://localhost:8080/word`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        app.wordle = json.toUpperCase();
      })
      .catch((err) => console.log(err));
  },
  handleClick: function (letter) {
    if (!app.gameOver) {
      console.log("clicked", letter);
      if (letter === "ENTER") {
        if (app.currentTile > 4) {
          app.checkUserInput();
        }
      } else if (letter === "⇤\n") {
        if (app.currentTile > 0) {
          app.deleteLetter();
        }
      } else {
        if (app.currentTile < 5 && app.currentRow < 6) {
          app.addLetter(letter);
        }
      }
      console.log(app.rows);
    }
  },
  // Clicking a letter button
  addLetter: function (letter) {
    const tile = document.getElementById(
      `row-${app.currentRow}-tile-${app.currentTile}`
    );
    tile.textContent = letter;
    app.rows[app.currentRow][app.currentTile] = letter;
    tile.setAttribute("data", letter);
    app.currentTile++;
  },
  // Clicking the backspace button
  deleteLetter: function () {
    app.currentTile--;
    const tile = document.getElementById(
      `row-${app.currentRow}-tile-${app.currentTile}`
    );
    tile.textContent = "";
    app.rows[app.currentRow][app.currentTile] = "";
    tile.setAttribute("data", "");
  },
  // Clicking the ENTER button
  checkUserInput: function () {
    const userInput = app.rows[app.currentRow].join("");
    console.log(userInput);
    fetch(`http://localhost:8080/check/?word=${userInput}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        if (json === "Entry word not found") {
          app.showMessage("Not in word list");
        } else {
          app.flipTile();
          console.log(`User input is: ${userInput}\nWordle is: ${app.wordle}`);
          if (userInput === app.wordle) {
            // Add a switch to check on which row we are and display corresponding message
            // if on row 0, message = "Genius"
            // if on row 1, message = "Magnificent"
            // if on row 2, message = "Impressive"
            // if on row 3, message = "Splendid"
            // if on row 4, message = "Great"
            // if on row 5, message = "Phew"
            // Store the message in a variable
            let message;
            switch (app.currentRow) {
              case 0:
                message = "Genius";
                break;
              case 1:
                message = "Magnificent";
                break;
              case 2:
                message = "Impressive";
                break;
              case 3:
                message = "Splendid";
                break;
              case 4:
                message = "Great";
                break;
              default:
                message = "Phew";
            }
            app.showMessage(message);
            app.gameOver = true;
          } else {
            if (app.currentRow >= 5) {
              app.gameOver = true;
              app.showMessage("Game over");
            }
            if (app.currentRow < 5) {
              app.currentRow++;
              app.currentTile = 0;
            }
          }
        }
      })
      .catch((err) => console.log(err));
  },
  showMessage: function (message) {
    const createMessageElement = () => {
      const messageDisplay = document.querySelector(".message-container");
      messageDisplay.append(messageElement);
      setTimeout(() => messageDisplay.removeChild(messageElement), 5000);
    };
    const messageElement = document.createElement("p");
    messageElement.textContent = message;
    if (message === "Not in word list") {
      createMessageElement();
    } else {
      setTimeout(() => {
        createMessageElement();
      }, 2500);
    }
  },
  // Color keyboard keys after user input check
  changeKeyColor: function (keyLetter, color) {
    const key = document.getElementById(keyLetter);
    key.classList.add(color);
  },
  flipTile: function () {
    const rowTiles = document.getElementById(
      `row-${app.currentRow}`
    ).childNodes;
    let checkWordle = app.wordle;
    const userInput = [];
    rowTiles.forEach((tile) => {
      userInput.push({
        letter: tile.getAttribute("data"),
        color: "overlay-letter-absent",
      });
    });
    userInput.forEach((userInput) => {
      if (checkWordle.includes(userInput.letter)) {
        userInput.color = "overlay-letter-misplaced";
        checkWordle = checkWordle.replace(userInput.letter, "");
      }
    });
    userInput.forEach((userInput, index) => {
      if (userInput.letter === app.wordle[index]) {
        userInput.color = "overlay-letter-match";
        checkWordle = checkWordle.replace(userInput.letter, "");
      }
    });
    rowTiles.forEach((tile, index) => {
      setTimeout(() => {
        tile.classList.add(userInput[index].color, "flip");
        app.changeKeyColor(userInput[index].letter, userInput[index].color);
      }, 500 * index);
    });
  },
  // Create game rows
  createRows: function () {
    const tileDisplay = document.querySelector(".tile-container");
    app.rows.forEach((row, rowIndex) => {
      const rowElement = document.createElement("div");
      rowElement.setAttribute("id", "row-" + rowIndex);
      row.forEach((tile, tileIndex) => {
        const tileElement = document.createElement("div");
        tileElement.setAttribute(
          "id",
          "row-" + rowIndex + "-tile-" + tileIndex
        );
        tileElement.classList.add("tile");
        rowElement.append(tileElement);
      });
      tileDisplay.append(rowElement);
    });
  },
  // Create keyboard
  createKeyboard: function () {
    const keyboard = document.querySelector(".key-container");
    app.keys.forEach((key) => {
      const buttonElement = document.createElement("button");
      buttonElement.textContent = key;
      buttonElement.setAttribute("id", key);
      buttonElement.addEventListener("click", () => app.handleClick(key));
      keyboard.append(buttonElement);
    });
  },
  // Activate event listeners
  listenToEvents: function () {
    // OPEN INSTRUCTIONS OVERLAY
    // Select open button (to open instructions overlay)
    const openButton = document.getElementById("instructions-show");
    // Select instructions overlay section
    const instructionsOverlayElement = document.getElementById(
      "instructions-overlay"
    );
    // Add click event listener on open button
    openButton.addEventListener("click", () => {
      instructionsOverlayElement.classList.remove("hidden");
    });

    // CLOSE INSTRUCTIONS OVERLAY
    // Select close button (to close instructions overlay)
    const closeButton = document.getElementById("instructions-hide");
    // Add click event listener on close button
    closeButton.addEventListener("click", () => {
      instructionsOverlayElement.classList.add("hidden");
    });
  },
  rows: [
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
    ["", "", "", "", ""],
  ],
  keys: [
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
  ],
  wordle: null,
  currentRow: 0,
  currentTile: 0,
  gameOver: false,
};

document.addEventListener("DOMContentLoaded", app.init);
