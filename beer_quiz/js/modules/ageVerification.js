
import startGame from "./gameManger.js";


function verification (){    
    var userAge = document.getElementById("intTextBox").value;
    if (userAge <= 17) {
        alert("You're too young to make beer!");

    }
    else if (userAge >= 120){
        alert("You're too young to make beer!");
    }
    else (
        startGame()
    )
}

export default verification
