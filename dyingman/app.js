
let myopening = ()=> {
const text = document.querySelector(".DyingMan");
const strText = text.textContent;
const splitText = strText.split("");
text.textContent = "";
for (let i = 0; i < splitText.length; i++) {
    text.innerHTML += "<span>"+ splitText[i] + "</span>";
}

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

// const headLine = {

// text = document.querySelector("h1"),
// strText = this.text.textContent,
// splitText = this.strText.split(""),
// textContent = "",
// char = 0,
// timer = setInterval(onTick, 400),

// spliting() {for (let i = 0; i < this.splitText.length; i++) {
//     this.text.innerHTML += "<span>"+ this.splitText[i] + "</span>";
// }
// },

//  onTick() {
//     const span = this.text.querySelectorAll('span')[this.char];
//     span.classList.add('fade');
//     this.char++
//     if(char === this.splitText.length) {
//         complete();
//         return;
//     }
// },

// complete() {
//     clearInterval(this.timer);
//     this.timer = null;
// },

// };

// headLine()


  




 
 