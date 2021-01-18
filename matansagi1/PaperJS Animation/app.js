const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);
    path.closed = true;
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    var group = new Group(path, thrust);
    group.position = view.bounds.center;
    group.strokeColor = 'white';
    group.fillColor = 'green';
    group.vec = new Point();
    group.vec.length = 0;
    group.angle = 0;
    return group;
}

const createAstroid = () => {
    const rock = new Path(
        [-23, -40.5], [0, -30.5], [24, -40.5], [45, -21.5], [25, -12.5],
        [46, 9.5], [22, 38.5], [-10, 30.5], [-22, 40.5], [-46, 18.5],
        [-33, 0.5], [-44, -21.5], [-23, -40.5]);
        rock.strokeColor = 'white';
        rock.fillColor = 'red';
        rock.scale(Point.random());
        rock.position = Point.random() * view.size;
        rock.vec = Point.random() - Point.random();
        return rock;
}

const main = () => {

    let gameStarted = false;
    let gameEnded = false;
    let shipExploding = false;

    const ship = createShip();
    
    
    const shots = [];
    const rocks = [];
    const num = Math.random() * 5 + 5;
    for (let i=0; i < num; i++){
        rocks.push(createAstroid());
    }

    var bgMusic = new Howl({
        src: ['Sounds/Puzzle-Dreams-3.mp3'],
        loop: true,
        volume: 0.1
    });

    var explosionSound = new Howl({
        src: ['Sounds/Explosion+1.mp3'],
        loop: false,
        volume: 0.1
    });

    const shootSynth = new Tone.Synth().toDestination();

    var explosion = new Raster('Assets/explosion.png');
    explosion.position = [-1000, -1000];


    onKeyDown = (event) => {

        if (!gameStarted && !gameEnded){
            gameStarted = true;
            bgMusic.play();
        }

        switch(event.key){
            case 'space':
                const shot = new Path.Circle({
                    center: ship.position,
                    radius: 2,
                    fillColor: 'pink'
                });
                shot.vec = new Point({
                    angle: ship.vec.angle,
                    length: 10
                });
                shots.push(shot);
                shootSynth.triggerAttackRelease("E2", "16n");
                break;
            case 'up':
                ship.vec.length = ship.vec.length + 0.5;
                break;
            case 'down':
                ship.vec.length = ship.vec.length - 0.5;
                break;
            case 'right':
                ship.rotate(-5)
                ship.vec.angle-=5
                break;
            case 'left':
                ship.rotate(+5)
                ship.vec.angle+=5
                break;
        }
    }

    checkCollision = () => {
        for (let i=0; i<rocks.length; i++){
            if (ship.intersects(rocks[i])){
                // rocks[i].remove();
                shipExploding = true;
                explosion.scale(0.1);
                explosion.position = ship.position;
                bgMusic.stop();
                explosionSound.play();
                ship.remove();
            }
            for (let j=0; j < shots.length; j++){
                if (shots[j].intersects(rocks[i])){
                    rocks[i].remove();
                    rocks.splice(i,1);
                    const num = Math.random() * 1;
                    for (let i=0; i < num; i++){
                        rocks.push(createAstroid());
                    }
                }
            }
        }
    }
    
    onFrame = (event) =>{

        if (gameEnded){
            return;
        }

        if (shipExploding){
            explosion.scale(1.1);
            setTimeout(()=>{
                gameEnded = true;
                explosion.position = [-1000, -1000];
            }, 500)
            return;
        }
        ship.position += ship.vec
        if (ship.position.x > view.bounds.width){
            ship.position.x = 0;
        }
        if (ship.position.x < 0){
            ship.position.x = view.bounds.width;
        }
        if (ship.position.y > view.bounds.height){
            ship.position.y = 0;
        }
        if (ship.position.y < 0){
            ship.position.y = view.bounds.height;
        }


        for (let i=0; i <rocks.length; i++){
            const rock = rocks[i];
            rock.position+=rock.vec
            if (rock.position.x > view.bounds.width){
                rock.position.x = 0;
            }
            if (rock.position.x < 0){
                rock.position.x = view.bounds.width;
            }
            if (rock.position.y > view.bounds.height){
                rock.position.y = 0;
            }
            if (rock.position.y < 0){
                rock.position.y = view.bounds.height;
            }
        }

        for (let i=0; i <shots.length; i++){
            shots[i].position+=shots[i].vec;

        }
        checkCollision();
    }
}

main();

