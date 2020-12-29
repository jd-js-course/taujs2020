const createShip = () => {
    var xwing = new Path({
        segments: [[100, 110], [100, 100], [110, 100], [110, 95], [111, 95], [111, 100],
        [114, 100], [114, 95], [115, 95], [115, 100], [126, 100], [126, 110], [124, 110],
        [124, 104], [122, 105], [122, 110], [121, 110], [121, 106], [116, 108], [114, 125],
        [112, 125], [110, 108], [105, 106], [105, 110], [104, 110], [104, 105], [102, 104],
        [101, 110], [100, 110]],
        fillColor: {
            gradient: {
                stops: ['white', 'grey']
            },
            origin: [100, 100],
            destination: [118, 100],
        },
        closed: true
    });
    xwing.strokeColor = 'blue',
        xwing.strokeWidth = 1
        xwing.position = [0,0]
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    var group = new Group(xwing, thrust);
    group.position = view.bounds.center;
    group.currentRotation = 0
    return group
}

const createAsteroid = () => {
    const bigRock = new Path({
        segments: [[200, 200], [220, 198], [230, 218], [229, 232], [205, 250], [185, 251], [180, 238], [174, 230], [172, 220], [186, 203]],
        fillColor: 'rgb(209,196,188)',
        closed: true

    });
    bigRock.strokeColor = 'rgb(209,125,80)'
    bigRock.strokeWidth = 2

    const dent1 = Path.Arc([210, 235], [214, 225], [218, 233])
    dent1.strokeColor = 'rgb(209,125,80)'
    dent1.strokeWidth = 3;

    const dent2 = Path.Arc([190, 210], [194, 220], [198, 213])
    dent2.strokeColor = 'rgb(209,125,80)'
    dent2.strokeWidth = 3;

    const asteroid = new Group([bigRock, dent1, dent2])

    asteroid.scale(Point.random())
    asteroid.position = Point.random() * view.size;
    asteroid.vec = Point.random() - Point.random() * 2
    return asteroid;
}

const createBang = () => {
    const bang = new Path.Star({
        center: [50, 50],
        points: 8,
        radius1: 15,
        radius2: 30,
        fillColor: 'yellow',
    });
    bang.strokeColor = 'red',
        bang.strokeWidth = 4
    return bang
}

const main = () => {
    const rocks = []
    const ship = createShip()
    const num = Math.random() * 5 + 5
    for (let i = 0; i < num; i++) {
        rocks.push(createAsteroid())
    }

    onMouseMove = (event) => {
        ship.position = event.point
        const delta = ship.currentRotation - event.delta.angle

        ship.rotate(delta)
        if (event.delta.angle) {
            ship.currentRotation = event.delta.angle
        }
        checkCollision()

    }

    checkCollision = () => {
        for (let i = 0; i < rocks.length; i++) {
            if (ship.intersects(rocks[i])) {
                rocks[i].visible = false
                const bang = createBang()
                bang.position = rocks[i].position
                rocks.splice(i, 1)

                setTimeout(() => {
                    bang.visible = false
                }, 500)
            }
        }
    }


    onFrame = (event) => {
        for (let i = 0; i < rocks.length; i++) {
            rock = rocks[i]

            rock.position += rock.vec
            if (rock.position.x > view.bounds.width) {
                rock.position.x = 0;
            }
            if (rock.position.x < 0) {
                rock.position.x = view.bounds.width;

            }
            if (rock.position.y < 0) {
                rock.position.y = view.bounds.height;
            }
            if (rock.position.y > view.bounds.height) {
                rock.position.y = 0;
            }
        }
        checkCollision()
    }
}



main()

//19:18 העלאה לגיטהאב
