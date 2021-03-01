const startButton = document.getElementById("start-btn");
import verification from "./modules/ageVerification.js";


const player = new Tone.Player("/music/pubambience.wav").toDestination();


startButton.addEventListener("click", function () {
  verification();
  player.start();
});

