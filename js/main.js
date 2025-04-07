let userName = JSON.parse(localStorage.getItem("userName")) || "Player Name";
let trys = document.getElementById("trys");
// let trueCards = document.getElementById("true");
let inp = document.getElementById("player-name");
let blocksCountiner = document.getElementById("block-div");
let blocks = Array.from(blocksCountiner.children);
let order = [...Array(blocks.length).keys()];
let randomOrder = order.sort(() => Math.random() - 0.5);
let soundSuccess = new Audio("audio/success.mp3");
let soundFail = new Audio("audio/fail.mp3");
window.onload = () => {
  if (userName === "Player Name") {
    inp.value = userName;
  } else {
    inp.value = userName;
    inp.setAttribute("readonly", true); // Add "readonly" attribute
  }
  setTimeout(() => {
    document.querySelectorAll(".back").forEach((back) => {
      back.style.transform = "rotateY(180deg)";
    });
  }, 1000);
};
blocks.forEach((block, index) => {
  block.style.order = randomOrder[index];
  block.addEventListener("click", () => {
    block.classList.toggle("game-blocks-active");
    let flippedCard = blocks.filter((flippe) => flippe.classList.contains("game-blocks-active"));
    if (flippedCard.length === 2) {
      blocksCountiner.style.pointerEvents = "none";
      setTimeout(() => {
        blocksCountiner.style.pointerEvents = "all";
        if (flippedCard[0].dataset.name === flippedCard[1].dataset.name) {
          flippedCard.forEach((flippe) => flippe.classList.remove("game-blocks-active"));
          flippedCard.forEach((flippe) => flippe.classList.add("has-match"));
          flippedCard.forEach((flippe) => (flippe.style.pointerEvents = "none"));
          trys.textContent = parseInt(trys.textContent) - 1;
          soundSuccess.play();
        } else {
          flippedCard.forEach((flippe) => flippe.classList.remove("game-blocks-active"));
          trys.textContent = parseInt(trys.textContent) + 1;
          soundFail.play();
        }
      }, 1000);
    } else {
    }
  });
});

