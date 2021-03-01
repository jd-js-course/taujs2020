import verification from "./modules/ageVerification.js";
const startButton = document.getElementById("start-btn");



const player = new Tone.Player("/beer_quiz/music/pubambience.mp3").toDestination();


startButton.addEventListener("click", function () {
  verification();
  player.start();
});

