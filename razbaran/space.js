const createShip = () => {
    const raster = new Raster('assert/photos/dog12.png')

    raster.position = view.bounds.center;
    raster.currentRotation = 0
    raster.rotate(60)
    raster.scale(0.3);
    raster.vec = new Point();
    raster.vec.length = 0;
    raster.angle = 0;
    return raster

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
    let gameEnded = false;
    let dogExploding = false;
    let gameStarted = false;
    const ship = createShip()
    const eggs = []
    const rocks = []

    const num = Math.random() * 5 + 5;
    for (let i = 0; i < num; i++) {

        rocks.push(createAstroid())

    }
    const explosionDog = new Raster('assert/photos/explosion.png')
    explosionDog.position = [-1000, -1000]
    var gameMusic = new Howl({


        src: ['assert/sounds/Good-Morning-Doctor-Weird.mp3'],
        loop: true,
        volume: 0.2,
    });
    var explosionMusic = new Howl({


        src: ['assert/sounds/Explosion7.mp3'],
        loop: false,
        volume: 0.2,
    });

    const shotSynth = new Tone.Synth().toDestination();
    const explode = new Tone.Synth().toDestination();


    onKeyDown = (event) => {
        if (!gameStarted) {
            gameStarted = true
            gameMusic.play()

        }

        switch (event.key) {
            case 'space':
                const shotEgg = new Raster('assert/photos/egg.png')
                shotEgg.scale(0.15)
                shotEgg.position = ship.position
                shotEgg.vec = new Point({
                    angle: ship.vec.angle,
                    length: 10,
                })

                eggs.push(shotEgg)
                shotSynth.triggerAttackRelease("B6", "32n");
                break;
            case 'up':
                ship.vec.length = ship.vec.length + 0.3
                break;
            case 'down':
                ship.vec.length = ship.vec.length - 0.3
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


    }



    checkCollision = () => {


        for (let i = 0; i < rocks.length; i++) {

            for (let j = 0; j < eggs.length; j++) {

                if (rocks[i].intersects(eggs[j])) {
                    rocks[i].remove()
                    rocks.splice(i, 1)
                    explode.triggerAttackRelease("e6", "32n");

                      const num = Math.random() * 1 + 1;
                      for (let i = 0; i < num; i++) {

                       rocks.push(createAstroid())
                }
            }
        }
        if (ship.intersects(rocks[i])) {

            explosionDog.position = ship.position
            gameMusic.stop()
            explosionDog.scale(0.1)

            ship.remove()
            explosionMusic.play()
            dogExploding = true;

        }

    }



}








onFrame = (event) => {
    if (gameEnded) {
        explosionMusic.stop()
        return;
    }

    if (dogExploding) {
        explosionDog.scale(1.1)

        setTimeout(() => {
            gameEnded = true;
            explosionDog.position = [-1000, -1000]
        }, 500)
        return;
    }
    ship.position += ship.vec


    if (ship.position.x > view.bounds.width) {
        ship.position.x = 0
    }
    if (ship.position.x < 0) {
        ship.position.x = view.bounds.width
    }
    if (ship.position.y < 0) {
        ship.position.y = view.bounds.height
    }

    if (ship.position.y > view.bounds.height) {
        ship.position.y = 0
    }








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

    for (let i = 0; i < eggs.length; i++) {
        eggs[i].position += eggs[i].vec

    }


    checkCollision()

}

    }

main()

