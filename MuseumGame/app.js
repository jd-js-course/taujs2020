
//Making the canvas to draw on
var canvas =  document.getElementById('paper');
context = canvas.getContext('2d');

//backgroup img
const bg = () => {
    baseImg = new Image();
    baseImg.src = '/MuseumGame/Assets/bg2.jpg';
    baseImg.onload = () => {
        context.drawImage(baseImg, 0, 0);
        }
} 
//detectve img
const detective = () => {
    baseImg2 = new Image();
    baseImg2.src = '/MuseumGame/Assets/detective.png';
    baseImg2.onload = () => {
        context.drawImage(baseImg2, 0, 400);
        }
}
//safe img
const safe = () => {
    baseImg3 = new Image();
    baseImg3.src = '/MuseumGame/Assets/safe.png';
    baseImg3.id = "passCode"
    baseImg3.onload = () => {
        context.drawImage(baseImg3, 1700, 500);
        }
} 
//art img #1
const art1 = () => {    
    art = new Image();
    art.id ="mona";
    art.src = '/MuseumGame/Assets/mona.jpg';
    art.onload = () => {
        context.drawImage(art, 150, 30);
        }
    
} 
//art img #2
const art2 = () => {
    artM = new Image();
    artM.src = '/MuseumGame/Assets/memory.jpg';
    artM.id = "memory";
    artM.onload = () => {
        context.drawImage(artM, 550, 30);
        }
    
} 
//art img #3
const art3 = () => {
    artD = new Image();
    artD.src = '/MuseumGame/Assets/night.jpg';
    artD.id = "night";
    artD.onload = () => {
        context.drawImage(artD, 1150, 50);
        }
        
} 
//art img #4
const art4 = () => {
    artC = new Image();
    artC.src = '/MuseumGame/Assets/statue.png';
    artC.id = "statue";
    artC.onload = () => {
        context.drawImage(artC, 150, 800);
        }

} 
//art img #5
const art5 = () => {
    artF = new Image();
    artF.src = '/MuseumGame/Assets/afternoon.jpg';
    artF.id = 'afternoon';
    artF.onload = () => {
        context.drawImage(artF, 550, 800);
        }
} 
//art img #6
const art6 = () => {
    artA = new Image();
    artA.src = '/MuseumGame/Assets/medusa.jpg';
    artA.id = 'medusa';
    artA.onload = () => {
        context.drawImage(artA, 1300, 770);
        }
} 


//main function
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
    alert("This Game Is With A lot of errors unfortunately, We Did our best, but this is Alpha Version, To Solve the code Press F12/Open Console");

}

main();

