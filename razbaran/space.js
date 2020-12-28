const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);
    path.closed = true;
    path.fillColor = 'blue'
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    thrust.fillColor = "red"
    var group = new Group(path, thrust);
    group.position = view.bounds.center;
    group.strokeColor = 'white'
    group.currentRotation = 0
    return group

}


const createAstroid = () => {
    const rock = new Path(
        [-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5],
        [-33, 0.5], [-44, -21.5], [-23, -40.5])
    rock.strokeColor = 'white'
    rock.fillColor = 'yellow'
    rock.scale(Point.random())
    rock.position = Point.random() * view.size;
    rock.vec = Point.random() - Point.random() * 2
    return rock

}

const main = () => {
    const ship = createShip()
    const num = Math.random() * 100 + 5;

    const rocks = []

    
    for (let i = 0; i < num; i++) {

        rocks.push(createAstroid())

        
    }
    onMouseMove = (event) => {


        ship.position = event.point

        const delta = ship.currentRotation - event.delta.angle
        ship.rotate(delta)
        if (event.delta.angle)
            ship.currentRotation = event.delta.angle

    }

    checkCollision = () => {


        for (let i = 0; i < rocks.length; i++) {

            if (ship.intersects(rocks[i]))
                rocks[i].remove()
                
        }
    }








    onFrame = (event) => {

        for (let i = 0; i < rocks.length; i++) {
            const rock = rocks[i];
            rock.position += rock.vec

            if (rock.position.x > view.bounds.width) {
                rock.position.x = 0
            }
            if (rock.position.x < 0) {
                rock.position.x = view.bounds.width
            }
            if (rock.position.y < 0) {
                rock.position.y = view.bounds.height
            }

            if (rock.position.y > view.bounds.height) {
                rock.position.y = 0
            }

        }
        checkCollision()
    }
}

main()

