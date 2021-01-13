//height=578
//width = 1280
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





const createMan = () => {

    const man = new Raster('assets/images/man.png')
    //man.scale(Point.random())
    man.position = Point.random() * view.size;
    man.vec = Point.random() - Point.random() * 2
    return man
}

const men = []

const num = 10
for (let i = 0; i < num; i++) {
    men.push(createMan())
}

redMan = (Point) => {
    new Raster('assets/images/redMan.png')
    redMan.position = Point

    checkCollision = () => {
        for (let i = 0; i < men.length; i++) {
            for (let j = 0; j < men.length; j++) {
                if (men[i] == redMan) {
                    if (men[i].intersects(men[j])) {
                        men[j] = redMan(men[j].position)

                    }
                }
                if (men[j] == redMan) {
                    if (men[i].intersects(men[j])) {
                        men[i] = redMan(men[i].position)

                    }

                }

            }
        }

    }
}