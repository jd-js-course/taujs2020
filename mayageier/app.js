const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4])
    path.closed = true;
    //path.strokeColor = "white"
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    var group = new Group(path, thrust);
    group.position = view.bounds.center;
    group.strokeColor = "pink"
    group.vec = new Point();
    group.vec.length = 0;
    group.angle = 0;
    return group
}
const createAstroid = () => {

    const rock = new Path([-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5], [-33, 0.5], [-44, -21.5],
        [-23, -40.5])
    rock.strokeColor = 'white'
    rock.scale(Point.random())
    rock.position = Point.random() * view.size;
    rock.vec = Point.random() - Point.random() * 2
    return rock

}

const main = () => {


    let shipExploding = false
    let GameStarted = false
    let GameEnded = false

    const ship = createShip()


    const rocks = []
     const shots = []

    var explosion = new Raster('assets/images/explosion.png');
    explosion.position = [-1000, -1000]

    const num = Math.random() * 5 + 5;
    for (let i = 0; i < num; i++) {
        rocks.push(createAstroid())
    }

    var bgMusic = new Howl({
        src: ['assets/sound/bgMusic.mp3'],
        loop: true,
        volume: 0.2
    });

    var explosionSound = new Howl({
        src: ['assets/sound/explosion.mp3'],
        loop: false,
        volume: 0.2
    });

    const shootSynth = new Tone.Synth().toDestination();


    // bgMusic.play()

    onKeyDown = (event) => {

        if (!GameStarted && !GameEnded) {
            GameStarted = true
            bgMusic.play()
        }


        switch (event.key) {
            case 'space':
                const shot = new Path.Circle({
                    center: ship.position,
                    radius:2,
                    fillColor: 'red'
                })
                shot.vec = new Point({
                    angle: ship.vec.angle,
                    length: 10
                })
                shots.push(shot)
                shootSynth
                shootSynth.triggerAttackRelease("C4", "8n");

                break;
            case 'up':
                ship.vec.length = ship.vec.length + 0.5
                break;
            case 'down':
                ship.vec.length = ship.vec.length - 0.5
                break;
            case 'right':
                ship.rotate(-5)
                ship.vec.angle -= 5
                break;
            case 'left':
                ship.rotate(5)
                ship.vec.angle += 5
                break;

        }
        console.log(ship.vec)
    }

    checkCollision = () => {
        for (let i = 0; i < rocks.length; i++) {
            for (let j=0; j<shots.length; j++){
                if (rocks[i].intersects(shots[j])){
                    rocks[i].remove();
                    rocks.splice(i,1)
                    const num = Math.random() * 1 + 1;
                    for (let i = 0; i < num; i++) {
                        rocks.push(createAstroid())
                    }
                }
            }

            if (ship.intersects(rocks[i])) {
                // rocks[i].remove();\
                shipExploding = true;
                explosion.scale(0.1)
                explosion.position = ship.position
                bgMusic.stop()
                explosionSound.play();
                rocks[i].remove();
                ship.remove();
            }

           
        }
    }

    onFrame = (event) => {

        if (GameEnded) {
            return;
        }
        if (shipExploding) {
            explosion.scale(1.1) 
            setTimeout (() =>{
                GameEnded = true;
                explosion.position = [-1000, -1000]
            }, 400)
            return
        }

        ship.position += ship.vec
        if (ship.position.x > view.bounds.width) {
            ship.position.x = 0;
        }
        if (ship.position.x < 0) {
            ship.position.x = view.bounds.width;
        }
        if (ship.position.y > view.bounds.height) {
            ship.position.y = 0;
        }
        if (ship.position.y < 0) {
            ship.position.y = view.bounds.height;
        }
        for (let i = 0; i < rocks.length; i++) {
            const rock = rocks[i]
            rock.position += rock.vec

            if (rock.position.x > view.bounds.width) {
                rock.position.x = 0;
            }
            if (rock.position.x < 0) {
                rock.position.x = view.bounds.width;
            }
            if (rock.position.y > view.bounds.height) {
                rock.position.y = 0;
            }
            if (rock.position.y < 0) {
                rock.position.y = view.bounds.height;
            }
        }


        for (let i=0; i<shots.length; i++){
            shots[i].position +=shots[i].vec
        }

        checkCollision()

    }

}

main()