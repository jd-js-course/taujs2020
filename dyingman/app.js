// title animation. spliting words to separated letters 
let myopening = ()=> {
    const text = document.querySelector(".DyingMan");
    const strText = text.textContent;
    const splitText = strText.split("");
    text.textContent = "";
    for (let i = 0; i < splitText.length; i++) {
        text.innerHTML += "<span>"+ splitText[i] + "</span>";
    }
// animation Time Line. timing the entry of each letter   
let char = 0;
let timer = setInterval(onTick, 200);

function onTick() {
    const span = text.querySelectorAll('span')[char];
    span.classList.add('fade');
    char++
    if(char === splitText.length) {
        complete();
        return;
    }
}
  
function complete() {
    
    clearInterval(timer);
    timer = null;
}
};
setTimeout(myopening, 3500)



 
 