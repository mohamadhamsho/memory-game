const blocks = document.querySelector(".game-content"),
  allCards = document.querySelectorAll(".flip-card"),
  startBtn = document.querySelector(".start-page .btn"),
  theInput = document.querySelector(".start-page #the-name"),
  startPage = document.querySelector(".start-page"),
  endPage = document.querySelector(".end-page"),
  yourName = document.querySelector(".your-name"),
  warrningMessage = document.querySelector(".warrning"),
  restartBtn = document.getElementById("restart"),
  restartGameBtn = document.getElementById("restartGame"),
  winnerName = document.getElementById("winner-name"),
  congratsContainer = document.querySelector(".congrats-container"),
  congrats = document.getElementById("congrats");
let triesElement = document.querySelector(".tries span");
let triesNum;
let countDown;
function showCards() {
  timerUp();
  triesNum = 0;
  (blocksElement = Array.from(blocks.children)),
    // orderRange = [...Array(blocksElement.length).keys()];
    (orderRange = Array.from(Array(blocksElement.length).keys()));

  shuffle(orderRange);

  blocksElement.forEach((element, index) => {
    element.style.order = orderRange[index];

    element.addEventListener("click", function () {
      flipBlock(element);
    });
  });
}
// Capitalize The First Letter Function
function capitalizeWordFunction(theWords) {
  var oldArray = theWords.split(" "),
    newArray = [];

  oldArray.forEach((element) => {
    newArray.push(element.charAt(0).toUpperCase() + element.slice(1));
  });
  return newArray.join(" ");
}
startBtn.onclick = function () {
  if (theInput.value === "") {
    // Remove Class On Warrning Message
    warrningMessage.classList.add("show");
    setTimeout(() => {
      warrningMessage.classList.remove("show");
    }, 2000);
  } else {
    // Start Page Remove
    startPage.classList.add("hide");

    // Write The Name In The Game
    yourName.textContent = capitalizeWordFunction(theInput.value);

    showCards();
  }
};

function flipBlock(selectedBlock) {
  selectedBlock.classList.add("is-flipped");

  let allFlippedBlocks = blocksElement.filter((flippedBlock) =>
    flippedBlock.classList.contains("is-flipped")
  );

  if (allFlippedBlocks.length === 2) {
    // Stop Clicking function
    stopClicking();

    // Check Matched function
    checkMathedBlocks(allFlippedBlocks[0], allFlippedBlocks[1]);
  }
}

function stopClicking() {
  blocks.classList.add("no-clicking");

  setTimeout(() => {
    blocks.classList.remove("no-clicking");
  }, 800);
}
let matchedCards = [];
function checkMathedBlocks(firstBlock, secondBlock) {
  if (firstBlock.dataset.animals === secondBlock.dataset.animals) {
    firstBlock.classList.remove("is-flipped");
    secondBlock.classList.remove("is-flipped");

    firstBlock.classList.add("has-matched");
    secondBlock.classList.add("has-matched");

    document.querySelector("#correct").play();

    matchedCards.push(firstBlock);
    matchedCards.push(secondBlock);

    if (matchedCards.length === blocksElement.length) {
      /// here catch the game win
      clearInterval(countDown);
      winnerName.innerHTML = theInput.value.toUpperCase();
      setTimeout(() => {
        congratsContainer.classList.add("visible");
      }, 1000);
    }
  } else {
    setTimeout(() => {
      triesNum += 1;

      firstBlock.classList.remove("is-flipped");
      secondBlock.classList.remove("is-flipped");

      triesElement.innerHTML = triesNum;
      document.querySelector("#wrong").play();
    }, 1000);
  }
}
restartBtn.onclick = function () {
  startPage.classList.remove("hide");
  endPage.classList.remove("show");
  theInput.value = "";
  triesElement.innerHTML = 0;

  allCards.forEach((item) => item.classList.remove("has-matched"));
  allCards.forEach((item) => item.classList.remove("is-flipped"));
};
// Restart Game Function
function restartGame() {
  window.location.reload();
}
// Shuffle Array Function
function shuffle(array) {
  let current = array.length,
    temp,
    random;

  while (current > 0) {
    random = Math.floor(Math.random() * current);

    current--;

    temp = array[current];

    array[current] = array[random];

    array[random] = temp;
  }

  return array;
}
// Timer Up Function
function timerUp() {
  var seconds = 89;
  countDown = setInterval(() => {
    const minutes = Math.floor(seconds / 60),
      remSeconds = seconds % 60,
      countDownDiv = document.querySelector(".count-down");
    countDownDiv.innerHTML = "0" + minutes + ":" + remSeconds;
    if (remSeconds < 10) {
      countDownDiv.innerHTML = "0" + minutes + ":" + "0" + remSeconds;
    }

    if (seconds > 0) {
      seconds = seconds - 1;
    } else {
      endPage.classList.add("show");

      clearInterval(countDown);
    }
  }, 1000);
}
