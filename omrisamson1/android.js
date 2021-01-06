const Spaceship = () => {
    var group = new Raster('startup.svg');
    group.rotate(45);
    group.closed = true;
    group.position = (100, 100);
    group.scale(0.2);
    group.vec = new Point;
    group.vec.length = 0;
    group.vec.angle = 0;
    group.angle = 0;
    return group
}

let speed = 1

const createAsteroid = () => {
    var rock = new Raster('rock.svg');
    rock.scale(0.2)
    rock.vec = Point.random() - Point.random() * speed
    rock.vec.angle = 180
    rock.position = Point.random()
    rock.position.x = view.bounds.width;
    rock.position.y = Math.random() * view.bounds.height;

    return rock;
}

const CreactShuot = () => {
    var Shuot = new Shape.Circle(new Point(80, 50), 30);
    Shuot.strokeColor = 'white';
    return Shuot;
}

const explosion = () => {
    var explosion = new Raster('blast.png');
    group.position = ship.position;
    return explosion
}



// document.getElementById('btn').addEventListener("click", function(){sdsd()})

// function sdsd() {
//     var element1 = document.getElementById("hide");
//     element.classList.remove("mystyle");
//     var element2 = document.getElementById("btn");
//     element.classList.remove("mystyle");
//     document.getElementById('paper').style.display = "block";


        

// }



const main = () => {
    const ship = Spaceship()
    const num = 5
    const shots = []
    const rocks = []
    const explosions = []
    const synth = new Tone.Synth().toDestination();

    for (let i = 0; i < num; i++) {
        rocks.push(createAsteroid())
    }



    onkeydown = (event) => {
        console.log(event)

        switch (event.key) {
            case 'ArrowUp':
                ship.vec.angle = -90;
                ship.vec.length = ship.vec.length + 5
                break;
            case 'ArrowDown':
                ship.vec.angle = 90;
                ship.vec.length = ship.vec.length + 5
                break;
            case ' ':
                const shot = new Path.Circle({
                    center: ship.position,
                    radius: 3,
                    fillColor: 'red'
                })
                shot.vec = new Point({
                    angle: 0,
                    length: 10
                }) 
                shots.push(shot);
                rocks.push(createAsteroid());
                synth.triggerAttackRelease("C5", "8n");

        }
    }


    onkeyup = (event) => {
        console.log(event)

        switch (event.key) {
            case 'ArrowUp':
                ship.vec.length = 0
                break;
            case 'ArrowDown':
                ship.vec.length = 0
                break;
        }
        console.log(ship.vec.length)
    }


    checkCollision = () => {
        for (let i = 0; i < rocks.length; i++) {
            for (let j = 0; j < shots.length; j++) {
                if (shots[j].intersects(rocks[i])) {
                    rocks[i].remove();
                    speed = speed+1
                }
                // document.getElementById("gameover").style.display = "block";
            }
        }
    }


    onFrame = (event) => {

        
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

        for (let i = 0; i < shots.length; i++) {
            shots[i].position += shots[i].vec
        }
        checkCollision()
    }
}

main()