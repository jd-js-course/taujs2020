const Spaceship = () => {
    var group = new Raster('startup.svg');
    group.closed = true;
    group.position = view.bounds.center
    group.currentRotation =0;
    group.scale(0.2);
    return group
}

const createAsteroid = () => {
    var rock = new Raster('rock.svg');
    rock.strokeColor = 'white'
    rock.scale(0.2)
    rock.vec =  Point.random()- Point.random()*4
    return rock;
}


const main = () => {
    const ship = Spaceship()

    const num = Math.random() * 1 +5

    const rocks = []
    for (let i=0; i<num;i++){
        rocks.push(createAsteroid())
    }   

    onMouseMove = (event) => {
        ship.position = event.point
        const delta = ship.currentRotation - event.delta.angle
        ship.rotate(delta)
        if (event.delta.angle)
            ship.currentRotation = event.delta.angle
    }

    checkCollision = () => {
        for (let i =0; i <rocks.length; i++ ){
            if (ship.intersects(rocks[i])){
                rocks[i].remove()
            }
        }
    }

    onFrame = (event) => {

        for (let i =0; i <rocks.length; i++ ){

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
        checkCollision()
    }
}

main()