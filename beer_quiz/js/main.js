const startButton = document.getElementById("start-btn");



import verification from "./modules/ageVerification.js";


startButton.addEventListener("click", function () {
  verification();
});

