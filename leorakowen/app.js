const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);
    path.closed = true;
    path.fillColor = '#f26352'
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    thrust.fillColor = '#e8c8be'
    var group = new Group(path, thrust);
    group.position = view.bounds.center;
    group.strokeColor ='white'
    group.currentRotation = 0;
    group.scale(2)
    return group
}

const createAsteroid = () => {
    const rock = new Path(
        [-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5],
        [-33, 0.5], [-44, -21.5], [-23, -40.5])
    rock.strokeColor = 'white'
    rock.fillColor = '#917c71'
    rock.scale(Point.random())
    rock.position = Point.random() * view.size;
    rock.vec =  Point.random()- Point.random()*2
    return rock;
}

const main = () => {
    const ship = createShip()

    const num = Math.random() * 5 + 20

    const rocks = []
    for (let i=0; i<num;i++){
        rocks.push(createAsteroid())
    }   

    onMouseMove = (event) => {
        
        const pos_delta = ship.position.getDistance(event.point)
        if (pos_delta < 10)
            return

        var direction_vect = event.point - ship.position

        ship.position = event.point
        const delta = direction_vect.angle - ship.currentRotation
        ship.rotate(delta)
        if (event.delta.angle)
            ship.currentRotation = direction_vect.angle
    }

    checkCollision = () => {
        let found_collision = false;
        for (let i =0; i <rocks.length; i++ ){
            if (rocks[i].visible && ship.intersects(rocks[i])){
                rocks[i].remove()
                rocks[i].visible = false
                found_collision = true;
            }
        }

        return found_collision;
    }

    onFrame = (event) => {

        for (let i = 0; i <rocks.length; i++ ){

            const rock = rocks[i];
            rock.position+=rock.vec

            if (rock.position.x > view.bounds.width){
                rock.position.x =0;
            }
            if (rock.position.x <0){
                rock.position.x =view.bounds.width;
            }

            if (rock.position.y <0){
                rock.position.y =view.bounds.height;
            }
            if (rock.position.y > view.bounds.height){
                rock.position.y =0;
            }
        }
        found = checkCollision()

        if (found)
            rocks.push(createAsteroid())
    }
}

main()

