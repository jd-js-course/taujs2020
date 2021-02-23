

var canvas =  document.getElementById('paper');
context = canvas.getContext('2d');

const bg = () => {
    baseImg = new Image();
    baseImg.src = '/MuseumGame/Assets/bg2.jpg';
    baseImg.onload = () => {
        context.drawImage(baseImg, 0, 0);
        }
} 

const detective = () => {
    baseImg2 = new Image();
    baseImg2.src = '/MuseumGame/Assets/detective.png';
    baseImg2.onload = () => {
        context.drawImage(baseImg2, 0, 400);
        }
}

const safe = () => {
    baseImg3 = new Image();
    baseImg3.src = '/MuseumGame/Assets/safe.png';
    baseImg3.onload = () => {
        context.drawImage(baseImg3, 1700, 500);
        }
} 
const art1 = () => {
    art = new Image();
    art.src = '/MuseumGame/Assets/mona.jpg';
    art.onload = () => {
        context.drawImage(art, 150, 30);
        }
} 

const art2 = () => {
    artM = new Image();
    artM.src = '/MuseumGame/Assets/memory.jpg';
    artM.onload = () => {
        context.drawImage(artM, 550, 30);
        }
} 

const art3 = () => {
    artD = new Image();
    artD.src = '/MuseumGame/Assets/night.jpg';
    artD.onload = () => {
        context.drawImage(artD, 1150, 50);
        }
} 
const art4 = () => {
    artC = new Image();
    artC.src = '/MuseumGame/Assets/statue.png';
    artC.onload = () => {
        context.drawImage(artC, 150, 800);
        }
} 
const art5 = () => {
    artF = new Image();
    artF.src = '/MuseumGame/Assets/afternoon.jpg';
    artF.onload = () => {
        context.drawImage(artF, 550, 800);
        }
} 
const art6 = () => {
    artA = new Image();
    artA.src = '/MuseumGame/Assets/medusa.jpg';
    artA.onload = () => {
        context.drawImage(artA, 1300, 770);
        }
} 


const main = () => {
    bg();
    detective();
    safe();
    art1();
    art2();
    art3();
    art4();
    art5();
    art6();
}

main();