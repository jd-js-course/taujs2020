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
    xwing.position = [-57, -57]
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    var group = new Group(xwing, thrust);
    group.position = view.bounds.center;
    group.vec = new Point();
    group.vec.length = 0;
    group.angle = 0;
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

    let gameStarted = false
    let gameEnded = false
    let shipExploding = false
    let bang = null;

    var sound = new Howl({
        src: ['loungegame.wav'],
        loop: true,
        volume:0.3
      });
      var bangSound = new Howl({
        src: ['explosion.mp3'],
        loop: false,
        volume:0.6
      });
      const shootSynth = new Tone.PolySynth(Tone.Synth, {
          oscillator: {
              type: 'fatsawtooth',
              count: 3,
              spread: 30
          },
          envelope: {
              attack: 0.01,
              decay: 0.1,
              sustain: 0.5,
              release: 0.4,
              attackCurve: "exponential"
          },
      }).toDestination();

      const rockExplodeSynth = new Tone.FMSynth({
          modulationIndex: 12.22,
          envelope: {
              attack: 0.01,
              decay: 0.2
          },
          modulation: {
              type: "square"
          },
          modulationEnvelope: {
              attack: 0.2,
              decay: 0.01
          }
      }).toDestination();
    
      const shots = []


    const rocks = []
    const ship = createShip()
    ship.vec.angle = 90
    const num = Math.random() * 5 + 5
    for (let i = 0; i < num; i++) {
        rocks.push(createAsteroid())
    }

    

    onKeyDown = (event) => {

        if (!gameStarted){
            gameStarted = true
            sound.play()
        }

        switch (event.key) {
            case 'space':
                const shot = new Path.Circle({
                    center: ship.position,
                    radius:2,
                    fillColor: 'purple'
                })
                shot.vec = new Point({
                    angle: ship.vec.angle,
                    length: 10
                })
                shots.push(shot)
                
                shootSynth.triggerAttackRelease('C5', '16n');

                

            break;
            case 'up':
                ship.vec.length = ship.vec.length + 0.2
                break;
            case 'down':
                ship.vec.length = ship.vec.length - 0.2
                break;
            case 'right':
                ship.rotate(5)
                ship.vec.angle += 5
                break;
            case 'left':
                ship.rotate(-5)
                ship.vec.angle -= 5
                break;
        }
        console.log(ship.vec)

    }



    checkCollision = () => {
        let shouldCreateAsteroid = false
        for (let i = 0; i < rocks.length; i++) {
            for (let j = 0; j < shots.length; j++) {
                if (shots[j].intersects(rocks[i])) {
                    rocks[i].remove();
                    rocks.splice(i,1)
                    rockExplodeSynth.triggerAttackRelease("C1","16n")
                    shouldCreateAsteroid = true
                }
            }


            
            if (ship.intersects(rocks[i])) {
                bang = createBang()
                bang.position = ship.position
                ship.remove()
                shipExploding = true;
                sound.stop()
                bangSound.play()
                
            }
            
                    
        }

        if (shouldCreateAsteroid) {
            const randomNum = Math.round(Math.random()) +1
            for (let i = 0; i<randomNum; i++) {
                rocks.push(createAsteroid())
            }
        }
    }


    onFrame = (event) => {

        if(gameEnded){
            return;
        }
        if (shipExploding){
            bang.scale(1.2)

            setTimeout(()=>{
                let previousGameEnded = gameEnded
                gameEnded = true;
                if (!previousGameEnded) alert('Game Over!')
            },500)
            
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

            for (let i = 0; i< shots.length; i++) {
                shots[i].position += shots[i].vec
            }



            checkCollision()
        }
    }



main()


