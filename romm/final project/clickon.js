var colors = ["black", "blue", "yellow", "red"];

function makeShapeAppear() {
  var top = Math.random() * 400;
  var left = Math.random() * 700;
  var width = (Math.random() * 200) + 100;
  if (Math.random() > 0.5) {
    document.getElementById("shape").style.borderRadius = "50%";
  } else {
    document.getElementById("shape").style.borderRadius = "0"
  }
  document.getElementById("shape").style.backgroundColor = "black";
  document.getElementById("shape").style.width = width + "px";
  document.getElementById("shape").style.height = width + "px";
  document.getElementById("shape").style.top = top + "px";
  document.getElementById("shape").style.left = left + "px";
  document.getElementById("shape").style.display = "block"
  start = new Date().getTime();
}
function appearAfterDelay() {
  setTimeout(makeShapeAppear, Math.random() * 1000);
}

appearAfterDelay()

document.getElementById("shape").onclick = function() {
  var colorNum = Math.floor(Math.random() * colors.length);
  document.getElementById("shape").style.backgroundColor = colors[colorNum];;
  var end = new Date().getTime();
  var timeTaken = (end - start) / 1000;
  document.getElementById("timeTaken").innerHTML = timeTaken + "s"
  appearAfterDelay(); 
}