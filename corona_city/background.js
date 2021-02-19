
var point = new Point(190, 30);
var size = new Size(900, 520);
const background = new Path.Rectangle(point, size)
background.strokeColor = 'black'
background.fillColor = '#d9ece5'

const road = new Path([670, 500], [460, 500], [460, 460], [520, 460], [520, 300], [565, 300], [565, 350], [565, 350], [620, 350], [620, 130],
    [660, 130], [660, 350], [750, 350], [910, 160], [970, 160], [810, 350], [950, 350], [950, 370], [720, 390], [720, 470], [690, 470], [690, 390],
    [620, 380], [565, 380], [565, 460], [730, 470], [675, 470])
road.fillColor = '#c7c6c5'
road.strokeColor = '#575655'



const nurse = new Raster('assets/images/nurse2.png');
nurse.position = [800, 510]

const market = new Raster('assets/images/market.png')
market.position = [440, 460]

const house = new Raster('assets/images/house.png')
house.position = [700, 500]

const hospital = new Raster('assets/images/hospital.png')
hospital.position = [640, 80]

const beach = new Raster('assets/images/beach.png')
beach.position = [290, 290]

const flowerStand = new Raster('assets/images/flowerStand.png')
flowerStand.position = [540, 280]

const kindergarten = new Raster('assets/images/kindergarten.png')
kindergarten.position = [1000, 320]

const bank = new Raster('assets/images/bank.png')
bank.position = [940, 100]

var head = new Shape.Circle(new Point(670, 110), 10);
head.strokeColor = 'black';
 var path1 = new Path([660, 150], [652,150], [652, 124], [688, 124], [688,150], [680,150]);
path1.strokeColor = 'black'
const path2 = new Path([660, 138], [660,183], [670, 183], [670, 156], [670,183], [680,183], [680, 138]);
path2.strokeColor = 'black'
const man = new Group(head, path1, path2);
man.scale(0.65)
man.strokeWidth = 2;
man.fillColor = 'white'


var taskNames = ['pick up kid from kindergarten', 'buy a flower', 'buy milk from supermarket', 'go to the bank']

const createMan = () => {

    var head = new Shape.Circle(new Point(670, 110), 10);
    head.strokeWidth =3;
     var path1 = new Path([660, 150], [652,150], [652, 124], [688, 124], [688,150], [680,150]);
    const path2 = new Path([660, 138], [660,183], [670, 183], [670, 156], [670,183], [680,183], [680, 138]);
    const man = new Group(head, path1, path2);
    man.strokeColor = 'black'
    man.scale(0.55)
    man.strokeWidth = 2;
    man.fillColor = 'white'
    man.position = Point.random() * 804;
    man.vec = Point.random() - Point.random() * 2
    console.log(man.vec.length)
    return man
}

const main = () => {
    let GameStarted=false
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            GameStarted = true
            GS.position = view.bounds.center;
            setTimeout(function(){GS.position = [-1000, -1000]}, 1000);
            setTimeout(function(){choose.position = view.bounds.center}, 1000);
            setTimeout(function(){men[ran].fillColor = 'red'
                men[ran].vec = Point.random() - Point.random() * 4}, 1000);
        }
    })

    const men = []
    const num =  12
    const n = Math.random()*12
    const ran =Math.round(n)+1
    console.log(ran)
    for (let i = 0; i < num; i++) {
        men.push(createMan()) 
    }

    
    var GS = new Raster('assets/images/gameStarted.png');
    GS.position = [-1000, -1000]
    
    var choose = new Raster('assets/images/choose.png');
    choose.position = [-1000, -1000]    
    


    //press spacebar to start the game



    onKeyDown = (event) => {

        // if (!GameStarted && !GameEnded) {
        //     GameStarted = true
        // }
        switch (event.key) {

            case 'up':
                nurse.position.y -= +2
                break;
            case 'down':
                nurse.position.y +=2
                break;
            case 'right':
                nurse.position.x+=2
                break;
            case 'left':
                nurse.position.x-=2
                break;

        }
        console.log(ship.vec)
    }
    checkCollision = () => {
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                if (men[i].intersects(men[j])) {
                    console.log("hi")
                    if (men[i].fillColor=='red') {
                        men[j].fillColor = 'red'   
                    }
                    if (men[j].fillColor=='red') {
                        men[i].fillColor = 'red'
                    }

                }
            }

        }
    }

    onFrame = (event)=>{
        for(let i=0; i<num; i++){
            const currMan = men[i]
            currMan.position+=currMan.vec

            if(currMan.position.x>1090){
                currMan.position.x = 195;
            }
            if(currMan.position.x<195){
                currMan.position.x = 1090;
            }
            if(currMan.position.y>520){
                currMan.position.x = 35;
            }
            if(currMan.position.y<35){
                currMan.position.y = 520;
            }
        }
        checkCollision()
    }


}

main()