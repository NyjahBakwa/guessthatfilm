const moviesObject = {
  "👸👹🌹": "Beauty And The Beast",
  "🧙👓⚡": "Harry Potter",
  "🦇🃏 ": "Joker",
  "👩‍❤️‍👨🚢🥶": "Titanic",
  "👻👻🔫": "Ghostbusters",
  "🐜👨 ": "Antman",
  "🐀👨‍🍳 ": "Ratatouille",
  "🖊️📓👩‍❤️‍👨": "The notebook",
  "😈👗👠": "Devil Wears Prada",
  "💊🟩🕶️ ": "The Matrix",
  "🎉🍺🎊❎": "Project X",
  "🔍🐟 ": "Finding Nemo",
  "🦖🌴🧬🚁⚠️ ": "Jurassic Park",
  "🚗⚡🕒👨‍🔬👴🌀 ": "Back to the Future",
};
const container = document.querySelector(".container");
const controls = document.querySelector(".controls-container");
const startButton = document.getElementById("start");
const letterContainer = document.getElementById("letter-container");
const userInputSection = document.getElementById("userInputSection");
const resultText = document.getElementById("result");
const hints = Object.keys(moviesObject);
let lastHint = "";
let randomHint = "",
  randomWord = "";
let winCount = 0,
  lossCount = 5;

const generateRandomValue = (array) => Math.floor(Math.random() * array.length);

//Blocker//
const blocker = () => {
  let letterButtons = document.querySelectorAll(".letters");
  letterButtons.forEach((button) => {
    button.disabled = true;
  });
  stopGame();
};

//Start de game//
startButton.addEventListener("click", () => {
  //Controls and buttons visibility
  controls.classList.add("hide");
  init();
});

//Stop de Game//
const stopGame = () => {
  controls.classList.remove("hide");
};

//woord Generator//
const generateWord = () => {
  letterContainer.classList.remove("hide");
  userInputSection.innerText = "";
  // Kies een andere film dan de vorige keer //
  do {
    randomHint = hints[generateRandomValue(hints)];
  } while (randomHint === lastHint && hints.length > 1);
  lastHint = randomHint;
  randomWord = moviesObject[randomHint];
  container.innerHTML = `<div id="movieHint">${randomHint}</div>`;
  let displayItem = "";
  randomWord.split("").forEach((value) => {
    if (value == " ") {
      winCount += 1;
      displayItem += `<span class="inputSpace">&nbsp;</span>`;
    } else {
      displayItem += `<span class="inputSpace">_</span>`;
    }
  });
  userInputSection.innerHTML = displayItem;
};

//Initial Function//
const init = () => {
  winCount = 0;
  lossCount = 5;
  document.getElementById(
    "chanceCount"
  ).innerHTML = `<span>Resterende pogingen:</span> ${lossCount}`;
  randomHint = null;
  randomWord = "";
  userInputSection.innerHTML = "";
  letterContainer.classList.add("hide");
  letterContainer.innerHTML = "";
  generateWord();
  for (let i = 65; i < 91; i++) {
    let button = document.createElement("button");
    button.classList.add("letters");
    //[A - Z]//
    button.innerText = String.fromCharCode(i);
    //Character button click//
    button.addEventListener("click", () => {
      let charArray = randomWord.toUpperCase().split("");
      let inputSpace = document.getElementsByClassName("inputSpace");
      if (charArray.includes(button.innerText)) {
        charArray.forEach((char, index) => {
          if (char === button.innerText) {
            button.classList.add("used");
            inputSpace[index].innerText = char;
            winCount += 1;
            if (winCount == charArray.length) {
              resultText.innerText = `Gewonnen! Het was ${randomWord}.`;
              blocker();
            }
          }
        });
      } else {
        lossCount -= 1;
        document.getElementById(
          "chanceCount"
        ).innerHTML = `<span>Resterende pogingen:</span> ${lossCount}`;
        button.classList.add("used");
        if (lossCount == 0) {
          resultText.innerText = `Game over. Het was ${randomWord}.`;
          blocker();
        }
      }
      button.disabled = true;
    });
    letterContainer.appendChild(button);
  }
};

// Bij het laden wacht de game tot je op Start klikt //
