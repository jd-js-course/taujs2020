const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4])
    path.closed = true
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4])
    var group = new Group(path, thrust);
    group.strokeColor = 'white'
    group.position = view.bounds.center;
    group.currentRotation = 0
    return group
}

const createAstroid = () => {
    const rock = new Path([-23, -40], [0, -30], [24, -40], [25, 12], [46, 9], [22, 38], [-10, 30], [-22, 40], [-46, 18], [-33, 0], [-44, -22], [-23, -40])
    rock.strokeColor = 'white'
    rock.scale(Point.random())
    rock.position = Point.random() * view.size;
    rock.vec = Point.random() - Point.random() * 3
    return rock

}

const main = () => {

    const ship = createShip()

    const num = Math.random() * 5 + 7

    const rocks = []

    for (let i = 0; i < num; i++) {
        rocks.push(createAstroid())
    }

    onMouseMove = (event) => {
        ship.position = event.point;
        const delta = ship.currentRotation - event.delta.angle;
        ship.rotate(delta)
        if (event.delta.angle) {
            ship.currentRotation = event.delta.angle
        }


    }

    checkCollision =() =>{
        for (let index = 0; index < rocks.length; index++){
            if(ship.intersects(rocks[index])){
                rocks[index].remove()
            }
        }

    }

    onFrame = (event) => {

        for (let index = 0; index < rocks.length; index++) {

            const rock = rocks[index];
            rock.position += rock.vec
            if (rock.position.x > view.bounds.width) {
                rock.position.x = 0
            }
            if (rock.position.x < 0) {
                rock.position.x = view.bounds.width
            }
            if (rock.position.y > view.bounds.height) {
                rock.position.y = 0
            }
            if (rock.position.y < 0) {
                rock.position.y = view.bounds.height
            }

            checkCollision()



        }

    }



}

main()
