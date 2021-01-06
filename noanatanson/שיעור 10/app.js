const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);
    path.closed = true;
    path.fillColor = "red";
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    thrust.fillColor = "orange"
    var group = new Group(path,thrust);
    group.position = view.bounds.center;
    group.strokeColor = 'white'
    group.vec = new Point();
    group.vec.length=0;
    group.angle=0;
    return group
}


const createAstroid = () => {
    const rock = new Path(
        [-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5],
        [-33, 0.5], [-44, -21.5], [-23, -40.5])
        rock.strokeColor = 'white'
        rock.fillColor = 'black'
        rock.scale(Point.random())
        rock.position = Point.random()*view.size;
        rock.vec = Point.random() - Point.random()*2
        return rock

}

const main = () => {
    let gameStarted = false
    let gameEnded = false
    let shipExploded = false
    const ship = createShip ()
    const shots = []
    const rocks = []

    const num = Math.random() * 5 + 5
    for (let i=0; i<num; i++){
        rocks.push(createAstroid ())
    }

    const explosion = new Raster('assets/IMG/EXPLOSION.png');
    explosion.position = [-1000,-1000]

    var Music = new Howl({
        src: ['assets/sound/Arcade-Fantasy.mp3'],
        loop: true,
        volume: 0.1,
      });

      var expSound = new Howl({
        src: ['assets/sound/exp_sound.mp3'],
        loop: false,
        volume: 0.5,
      });

      const ShotSynth = new Tone.Synth().toDestination();



    onKeyDown = (event) => {

        if (!gameStarted && !gameEnded){
            gameStarted = true
            Music.play()

        }

        switch (event.key) {

            case 'space':
               const shot = new Path.Circle({
                   center: ship.position,
                   radius: 2,
                   fillColor: 'red'
               })
               shot.vec = new Point({
                   angle: ship.vec.angle,
                   length: 10
               })
               shots.push(shot)
               ShotSynth.triggerAttackRelease("C3", "16n");
                break;
            case 'up':
                ship.vec.length = ship.vec.length+0.2
                break;
            case 'down':
                ship.vec.length = ship.vec.length-0.2
                break;
            case 'right':
                ship.rotate(-5)
                ship.vec.angle-=5
                break;
            case 'left':
                ship.rotate(5)
                ship.vec.angle+=5
                break;
                                
        }

    }



    checkIntersection = () => {
        for (let i=0; i<rocks.length; i++) {
            if (ship.intersects(rocks[i])){
                //rocks[i].remove()
                shipExploded = true;
                explosion.scale(0.1)
                explosion.position = ship.position
                Music.stop()
                expSound.play()
                ship.remove()

            }

            for (let j=0; j<shots.length; j++) {
                if (shots[j].intersects(rocks[i])){
                    rocks[i].remove();
                    rocks.splice(i,1)

                    const num = Math.random() * 1 + 1
                    for (let i=0; i<num; i++){
                        rocks.push(createAstroid ())
                    }
    
                }
            }
        }

    }

    onFrame = (event) => {

        if (gameEnded){
            return;
        }

        if (shipExploded){
            explosion.scale(1.1)
            setTimeout(()=> {
                gameEnded = true;
                explosion.position = [-400,-400]
            }, 400)

            return
        }

        ship.position+=ship.vec
        if (ship.position.x > view.bounds.width){
            ship.position.x = 0;
        }

        if (ship.position.x < 0){
            ship.position.x = view.bounds.width;
        }

        if (ship.position.y < 0){
            ship.position.y = view.bounds.height;
        }

        if (ship.position.y > view.bounds.height){
           ship.position.y = 0;
        }

        for (let i=0; i<rocks.length; i++) {

            const rock = rocks[i];
            rock.position+=rocks[i].vec

            if (rock.position.x > view.bounds.width){
                rock.position.x = 0;
            }

            if (rock.position.x < 0){
                rock.position.x = view.bounds.width;
            }

            if (rock.position.y < 0){
                rock.position.y = view.bounds.height;
            }

            if (rock.position.y > view.bounds.height){
                rock.position.y = 0;
            }
        }

        for (let i=0; i<shots.length; i++) {
            shots[i].position+=shots[i].vec

        }

        checkIntersection()

        for (var i = 0; i<count; i++){
            var item = project.activeLayer.children[i];
            item.position.x += item.bounds.width / 20;
            if(item.bounds.left > view.size.width){
                item.position.x = -item.bounds.width;
            }
        }

    }

}

main()

//background animation

const count = 150;
var path = new Path.Circle({
    center: [0, 0],
    radius: 10,
    strokeColor: 'black',
    fillColor: 'white',
});

var symbol = new Symbol(path);

for (var i = 0; i<count; i++){
    var center = Point.random()*view.size;
    var placedSymbol = symbol.place(center);
    placedSymbol.scale(i/count);
}

