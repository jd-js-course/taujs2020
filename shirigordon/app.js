const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);

    path.closed = true;
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    var group = new Group(path, thrust);
    group.position = view.bounds.center;
    group.strokeColor = "red";
    group.vec = new Point();
    group.vec.length = 0;
    group.angle = 0;

    return group
}

const createAstroid = () => {

    const rock = new Path(
        [-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5],
        [-33, 0.5], [-44, -21.5], [-23, -40.5])
    rock.strokeColor = "white"
    rock.scale(Point.random() * 2)
    rock.position = Point.random() * view.size;
    rock.vec = Point.random() - Point.random() * 2
    return rock;
}
   

const main = () => {
    let gameStarted = false
    let gameEnded = false
    let shipExploding = false

    const ship = createShip()
    const num = Math.random() * 5 + 5
    const rocks = []
    for (let i = 0; i < num; i++) {
        rocks.push(createAstroid())
    } 

      const explosion = new Raster('asset/images/explode.png')
      explosion.positon = [-200000000, -2000000000]

    var hMusic = new Howl({
        src: ['asset/sound/Heroic.mp3'],
        loop: true,
        volume: 0.2,

    })
    var boomsound = new Howl({
        src: ['asset/sound/boom.wav'],
        loop: false,
        volume: 0.2,

    })

    onKeyDown = (event) => {

        if (!gameStarted && !gameEnded) {
            gameStarted = true
            hMusic.play()
        }

        switch (event.key) {
            case 'space': 

               const shot = new Path.Circle({
                   center: ship.position,
                   radius:2,
                   fillColor: "yellow"
               })
                break;
            case 'up':
                ship.vec.length = ship.vec.length + 0.2
                break;
            case 'down':
                ship.vec.length = ship.vec.length - 0.2
                break;
            case 'right':
                ship.rotate(-5)
                ship.vec.angle -= -5
                break;
            case 'left':
                ship.rotate(5)
                ship.vec.angle += 5
                break;

 
        }
    
    }

    checkCollision = () => {
        for (let i = 0; i < rocks.length; i++) {
            if (ship.intersects(rocks[i])) {
                //rocks[i].remove()
                shipExploding = true
                explosion.scale (0.1)
                explosion.position = ship.position
                hMusic.stop()
                boomsound.play()
                ship.remove()
            }
        } 
    }
    onFrame = (event) => {

        if ( gameEnded) {
            return;
        } 
        if (shipExploding) {
            explosion.scale(1.1)
            setTimeout(()=>
            {
                gameEnded = true;
                explosion.position = [-400,-400]
            },300)
            return
        }

        ship.position += ship.vec
        if (ship.position.x > view.bounds.width) {
            ship.position.x = 0;
        }
        if (ship.position.x < 0) {
            ship.position.x = view.bounds.width;
        }
        if (ship.position.y < 0) {
            ship.position.y = view.bounds.height;
        }
        if (ship.position.y > view.bounds.height) {
            ship.position.y = 0;
        }

        for (let i = 0; i < rocks.length; i++) {
            const rock = rocks[i];
            rocks[i].position += rocks[i].vec

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



