import verification from "./modules/ageVerification.js";
const startButton = document.getElementById("start-btn");

//Thanks for everything Jonathan!

const player = new Tone.Player("./music/pubambience.mp3").toDestination();


startButton.addEventListener("click", function () {
  verification();
  player.start();
});

