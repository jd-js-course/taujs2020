
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

var Over = false;


var success = false
var success2 = false
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

const nurse = new Raster('assets/images/nurse2.png');
nurse.position = [800, 510]


// var head = new Shape.Circle(new Point(670, 110), 10);
// head.strokeColor = 'black';
//  var path1 = new Path([660, 150], [652,150], [652, 124], [688, 124], [688,150], [680,150]);
// path1.strokeColor = 'black'
// const path2 = new Path([660, 138], [660,183], [670, 183], [670, 156], [670,183], [680,183], [680, 138]);
// path2.strokeColor = 'black'
// const man = new Group(head, path1, path2);
// man.scale(0.65)
// man.strokeWidth = 2;
// man.fillColor = 'white'


var taskNames = ['pick up kid from kindergarten', 'buy a flower', 'buy milk from supermarket', 'go to the bank']

const createMan = () => {

    var head = new Shape.Circle(new Point(670, 110), 10);
    head.strokeWidth = 3;
    var path1 = new Path([660, 150], [652, 150], [652, 124], [688, 124], [688, 150], [680, 150]);
    const path2 = new Path([660, 138], [660, 183], [670, 183], [670, 156], [670, 183], [680, 183], [680, 138]);
    const man = new Group(head, path1, path2);
    man.strokeColor = 'black'
    man.scale(0.55)
    man.strokeWidth = 1.5;
    man.fillColor = 'white'
    man.position = Point.random() * 804;
    man.vec = Point.random() - Point.random() * 3
    console.log(man.vec.length)
    return man
}
const choose = new Raster('assets/images/choose.png');
choose.position = view.bounds.center

const success1 = new Raster('assets/images/success.png');
success1.position = [-1000, -1000]

const main = () => {
    var first = true
    //choosenext()
    let GameStarted = false
    document.addEventListener('keyup', event => {
        if (event.code === 'Space') {
            GS.position = view.bounds.center;
            setTimeout(function () {
                GS.position = [-1000, -1000]
                GS = new Raster('assets/images/blank.png');
            }, 1000);
            setTimeout(function () { choosenext().position = view.bounds.center }, 1000);


        }
    })


    const men = []
    const num = 12
    const n = Math.random() * 12
    const ran = Math.round(n) + 1
    console.log(ran)
    for (let i = 0; i < num; i++) {
        men.push(createMan())
    }

    const missions = []
    var GS = new Raster('assets/images/gameStarted.png');
    GS.position = [-1000, -1000]


    const cor1 = new Point(891, 300)
    const s1 = new Size(55, 55)
    var p1 = new Path.Rectangle(cor1, s1)

    const cor2 = new Point(454, 254);
    const s2 = new Size(60, 60)
    var p2 = new Path.Rectangle(cor2, s2)

    var cor3 = new Point(800, 120)
    var s3 = new Size(60, 60)
    var p3 = new Path.Rectangle(cor3, s3)

    var pickup = new Raster('assets/images/pickup.png');
    pickup.position = [640, 210]
    pickup.onClick = function (event) {
        choosenext().position = [-1000, -1000]
        Over = false;
        first=false
        var pickupmsg = new Raster('assets/images/pickupmsg.png');
        pickupmsg.position = view.bounds.center;
        setTimeout(function () {
            pickupmsg.position = [-1000, -1000]
            GameStarted = true;
        }, 5000);
        var kid = new Raster('assets/images/kid.png');
        kid.position = [940, 330]
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyK') {
                if (success){
                    GameStarted=false
                    const index1 = missions.indexOf(pickup)
                    missions.splice(index1,1)
                    choosenext().position = view.bounds.center
                }
            }
        })
    }

    var flower = new Raster('assets/images/flower.png');
    flower.position = [640, 275]
    flower.onClick = function (event) {
        choosenext().position = [-1000, -1000]
        Over = false;
        first=false   
        var flowermsg = new Raster('assets/images/flowermsg.png');
        flowermsg.position = view.bounds.center;
        setTimeout(function () {
            flowermsg.position = [-1000, -1000]
            GameStarted = true;
        }, 5000);
        var sunflower = new Raster('assets/images/sunflower.png');
        sunflower.position = [484, 277]   
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyF') {
                if (success2){
                    GameStarted=false
                    const index2 = missions.indexOf(flower)
                    missions.splice(index2,1)
                    choosenext().position = view.bounds.center
                }

            }
        })
    }

    var banktask = new Raster('assets/images/banktask.png');
    banktask.position = [640, 340]
    banktask.onClick = function (event) {
        choosenext().position = [-1000, -1000]
        Over = false;
        fisrt = false
        var bankmsg = new Raster('assets/images/bankmsg.png');
        bankmsg.position = view.bounds.center;
        setTimeout(function () {
            bankmsg.position = [-1000, -1000]
            GameStarted = true;
        }, 5000);
        var dollar = new Raster('assets/images/dollar.png');
        dollar.position = [840, 140]
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyB') {
                if (success3){
                    GameStarted=false
                    const index3 = missions.indexOf(banktask);
                    missions.splice(index3,1)
                    choosenext().position = view.bounds.center
                }

            }
        })
    }

    var flower = new Raster('assets/images/flower.png');
    flower.position = [640, 275]
    flower.onClick = function (event) {
        choosenext().position = [-1000, -1000]
        Over = false;
        first=false   
        var flowermsg = new Raster('assets/images/flowermsg.png');
        flowermsg.position = view.bounds.center;
        setTimeout(function () {
            flowermsg.position = [-1000, -1000]
            GameStarted = true;
        }, 5000);
        var sunflower = new Raster('assets/images/sunflower.png');
        sunflower.position = [484, 277]   
        document.addEventListener('keyup', event => {
            if (event.code === 'KeyF') {
                if (success2){
                    GameStarted=false
                    const index2 = missions.indexOf(flower)
                    missions.splice(index2,1)
                    choosenext().position = view.bounds.center
                }

            }
        })
    }

    choosenext = () =>{
        var choosetask = new Group(choose)
        if (!first){
            success1.position = view.bounds.center
            success1.position.y-=200
            choosetask.addChild(success1)
        }
        var choosetask = new Group(choose)
        for (let i = 0; i < missions.length; i++) {
            choosetask.addChild(missions[i])
        }
        choosetask.position = [-1000, -1000]
        return choosetask
        }


    missions.push(pickup)
    missions.push(flower)
    missions.push(banktask)
    var choosetask = new Group(choose)
    for (let i = 0; i < missions.length; i++) {
        choosetask.addChild(missions[i])
    }
    choosetask.position = [-1000, -1000]

    


    //press spacebar to start the game



    onKeyDown = (event) => {


        switch (event.key) {

            case 'up':
                nurse.position.y -= +3
                break;
            case 'down':
                nurse.position.y += 3
                break;
            case 'right':
                nurse.position.x += 3
                break;
            case 'left':
                nurse.position.x -= 3
                break;

        }
    }
    checkCollision = () => {
        for (let i = 0; i < num; i++) {
            for (let j = 0; j < num; j++) {
                if (men[i].intersects(men[j])) {
                    if (men[i].fillColor == 'red') {
                        men[j].fillColor = 'red'
                    }
                    if (men[j].fillColor == 'red') {
                        men[i].fillColor = 'red'
                    }

                }
            }

        }


        for (let i = 0; i < num; i++) {
            if (nurse.intersects(men[i])) {
                if (men[i].fillColor == 'red') {
                    console.log("game over")
                    Over = true;

                }
            }
        }

        if (nurse.intersects(p1)) {
            success = true
        }

        if (nurse.intersects(p2)){
            success2 =true
        }
        if (nurse.intersects(p3)){
            success3 =true
        }

    }

    const GO = new Raster('assets/images/gameover.png')
    GO.position = [-1000, -1000]

    onFrame = (event) => {
        for (let i = 0; i < num; i++) {
            const currMan = men[i]
            currMan.position += currMan.vec

            if (currMan.position.x > 1090) {
                currMan.position.x = 195;
            }
            if (currMan.position.x < 195) {
                currMan.position.x = 1090;
            }
            if (currMan.position.y > 520) {
                currMan.position.x = 35;
            }
            if (currMan.position.y < 35) {
                currMan.position.y = 520;
            }
        }

        if (GameStarted) {
            checkCollision();
            men[1].fillColor = 'red'
        }

        

        if (Over) {
            GO.position = view.bounds.center

            var something = true;


        }
        if (something) {
            for (let i = 0; i < num; i++) {
                men[i].position = [-1000, -1000]
            }
        }
    }
}

main()