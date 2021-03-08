var score = localStorage.getItem("useranswerssum");
console.log(score);

setTimeout(() => {
  terminal(score);
}, 3000);

function remove(score) {
  localStorage.removeItem("useranswerssum");
  terminal(score);
}

function terminal(score) {
  if (score <= 4) {
    remove();
    console.log(score);
    window.location.href = "lager.html";
  } else if (score >= 5 && score <= 8) {
    remove();
    console.log(score);
    window.location.href = "pilsner.html";
  } else if (score >= 9 && score <= 12) {
    remove();
    console.log(score);
    window.location.href = "wheat.html";
  } else if (score >= 13 && score <= 16) {
    remove();
    console.log(score);
    window.location.href = "amberale.html";
  } else if (score >= 17 && score <= 20) {
    remove();
    console.log(score);
    window.location.href = "apa.html";
  } else if (score >= 21 && score <= 24) {
    remove();
    console.log(score);
    window.location.href = "ipa.html";
  } else if (score >= 25 && score <= 28) {
    remove();
    console.log(score);
    window.location.href = "neipa.html";
  } else if (score >= 29 && score <= 32) {
    remove();
    console.log(score);
    window.location.href = "saison.html";
  } else if (score >= 33 && score <= 36) {
    remove();
    console.log(score);
    window.location.href = "stout.html";
  } else if (score >= 37 && score <= 40) {
    remove();
    console.log(score);
    window.location.href = "barleywine.html";
  }
}
