

const script = [
    {
        time: 3,
        text: 'hello'
    }, 
    {
        time: 5,
        text: 'hello 1'
    }

]

let timer = 0
let current = 0;
const intervalFunction = () =>{

    if (script[current] && script[current].time > timer){
        console.log(script[current].text)
        current++
    }

    
    timer++

}

const main = () => {

    var video = document.querySelector('video');
   

    navigator.mediaDevices.getUserMedia({video: true })
        .then((stream)=>{
            video.srcObject = stream;

            setInterval(intervalFunction, 1000)
        })
        .catch(err=>{

        })
}

window.addEventListener('load',main)