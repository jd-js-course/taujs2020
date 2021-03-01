const createPlayer = () => {
    var path = new Path.Circle(new Point(1000, 1000), 10);
    path.fillColor = "blue";

    var group = new Group(path);
    group.position = view.bounds.center;
    group.vec = new Point();
    group.vec.length = 0;
    group.angle = 0;
    return group
}

// create background

const createbone1 = () => {
    const bone1 = new Raster('assets/IMG/BONE1.png');
    bone1.position = Point.random() * view.size;
    bone1.scale(Point.random() * 0.005 + 0.1)
    bone1.vec = Point.random() - Point.random() * 2
    return bone1
}

const createbone2 = () => {
    const bone2 = new Raster('assets/IMG/BONE2.png');
    bone2.position = Point.random() * view.size;
    bone2.scale(Point.random() * 0.005 + 0.1)
    bone2.vec = Point.random() - Point.random() * 2
    return bone2
}

const createscull = () => {
    const scull = new Raster('assets/IMG/SCULL.png');
    scull.position = Point.random() * view.size;
    scull.scale(Point.random() * 0.005 + 0.1)
    scull.vec = Point.random() - Point.random() * 2
    return scull
}

//create zombie

const createZombie = () => {

    const knife = new Path({
        segments: [[9, 44], [109, 44], [109, 60]],
        fillColor: '#C3C4C6',
        strokeColor: 'black',
        closed: true
    });

    const KnifeHendel = new Path();
    KnifeHendel.strokeColor = 'black';
    KnifeHendel.fillColor = '#5D3019'
    KnifeHendel.add(new Point(109, 44));
    KnifeHendel.add(new Point(109, 49));
    KnifeHendel.add(new Point(136, 49));
    KnifeHendel.add(new Point(136, 44));
    KnifeHendel.closed = true;

    var rectangle = new Rectangle(new Point(30, 30), new Size(60, 60));
    var cornerSize = new Size(10, 10);
    var ZombieHead = new Path.Rectangle(rectangle, cornerSize);
    ZombieHead.strokeColor = 'black';
    ZombieHead.fillColor = 'green';

    const eye1 = new Path.Circle(new Point(47, 49), 8);
    eye1.fillColor = '#ECC777';

    const eye1Red = new Path.Circle(new Point(46, 47), 5);
    eye1Red.fillColor = 'red';

    const eye1Cen = new Path.Circle(new Point(46, 47), 2);
    eye1Cen.fillColor = 'black';

    const EB1 = new Path({
        segments: [[56, 47], [41, 39]],
        strokeColor: 'black',
        strokeWidth: 4,
    });

    const eye2 = new Path.Circle(new Point(76, 55), 7);
    eye2.fillColor = '#ECC777';

    const eye2Red = new Path.Circle(new Point(76, 55), 5);
    eye2Red.fillColor = 'red';

    const eye2Cen = new Path.Circle(new Point(76, 55), 2);
    eye2Cen.fillColor = 'black';

    const EB2 = new Path({
        segments: [[68, 51], [83, 47]],
        strokeColor: 'black',
        strokeWidth: 4,
    });

    const mouth = new Path({
        segments: [[45, 69], [74, 74]],
        strokeColor: 'black',
        strokeWidth: 6,
        strokeCap: 'round',
    });

    const scar1 = new Path({
        segments: [[61, 35], [83, 40]],
        strokeColor: 'black',
        strokeWidth: 2,
        strokeCap: 'round',
    });

    const scar2 = new Path({
        segments: [[69, 35], [65, 39]],
        strokeColor: 'black',
        strokeWidth: 1,
        strokeCap: 'round',
    });

    const scar3 = new Path({
        segments: [[76, 35], [72, 41]],
        strokeColor: 'black',
        strokeWidth: 1,
        strokeCap: 'round',
    });

    const scar4 = new Path({
        segments: [[82, 37], [78, 42]],
        strokeColor: 'black',
        strokeWidth: 1,
        strokeCap: 'round',
    });

    const zombie = new Group({
        children: [knife, KnifeHendel, ZombieHead, eye1, eye1Red, eye1Cen, eye2, eye2Red, eye2Cen, mouth, scar1, scar2, scar3, scar4, EB1, EB2],
        position: (60, 60)
    });

    zombie.position = Point.random() * view.size;
    zombie.scale(Point.random() * 0.7 + 1)
    zombie.vec = Point.random() - Point.random() * 2
    return zombie

}

// hides an element by id
function hide(id) {
    document.getElementById(id).style.display = "none"
}

//shows element by id
function show(id) {
    document.getElementById(id).style.display = "block"
}

const openScreen = () => {

    console.log("in open screen")

    show("screen1")
    hide("screen2")
    hide("screen3")

    const button = document.getElementById("btn1")

    console.log("got button")

    button.addEventListener("click", function () {
        hide("screen1")
        show("screen2")

        console.log("clicked")

    })
}

const main = () => {

<<<<<<< HEAD
    openScreen()
    
=======
    
var Music = new Howl({
        src: ['assets/sound/MYSTERY_MUSIC.mp3'],
        loop: true,
        volume: 0.05,
    });

    openScreen()

    Music.play()

>>>>>>> d26e70ed4af8c3d75afe4fd9c49f31a5662d13b7
    let gameStarted = false
    let gameEnded = false

    const bones1 = []
    const bones2 = []
    const sculls = []
    const player = createPlayer()
    const shots = []
    const zombies = []


    var ScreamSound = new Howl({
        src: ['assets/sound/SCREAM.mp3'],
        loop: false,
        volume: 0.08,
    });

    var OutchSound = new Howl({
        src: ['assets/sound/OUTCH.mp3'],
        loop: false,
        volume: 0.08,
    });

    const ShotSynth = new Tone.Synth().toDestination();

    var playerHP = 50
    var round = 2

    for (var x=0;x<round;x++){
        zombies.push(createZombie())

    }

    for (let i = 0; i < 5; i++) {
        bones1.push(createbone1())
    }

    for (let i = 0; i < 5; i++) {
        bones1.push(createbone2())
    }

    for (let i = 0; i < 5; i++) {
        sculls.push(createscull())
    }


    onKeyDown = (event) => {


        

        switch (event.key) {

            case 'space':
                const shot = new Path.Circle({
                    center: player.position,
                    radius: 2,
                    fillColor: 'red'
                })
                shot.vec = new Point({
                    angle: player.vec.angle,
                    length: 10
                })
                shots.push(shot)
                ShotSynth.triggerAttackRelease("C3", "16n");
                break;
            case 'up':
                player.vec.length = player.vec.length + 0.2
                break;
            case 'down':
                player.vec.length = player.vec.length - 0.2
                break;
            case 'right':
                player.rotate(-5)
                player.vec.angle -= 5
                break;
            case 'left':
                player.rotate(5)
                player.vec.angle += 5
                break;

        }

    }



    checkIntersection = () => {        

        if (playerHP <= 0) {


            show("screen3")
            hide("screen2")

            const button2 = document.getElementById("btn2")

            button2.addEventListener("click", function () {

                playerHP = 50
                round = 3
                openScreen()

            })

        }

        for (let i = 0; i < zombies.length; i++) {
            if (player.intersects(zombies[i])) {
                playerHP = playerHP - 10
                OutchSound.play()


                console.log(playerHP)


                zombies[i].remove();
                zombies.splice(i, 1)

                if (zombies.length == 0) {
                    round++

                    for (let k = 0; k < round; k++) {
                        zombies.push(createZombie())
                    }
                }

            }

            for (let j = 0; j < shots.length; j++) {
                if (shots[j].intersects(zombies[i])) {
                    zombies[i].remove();
                    zombies.splice(i, 1)
                    ScreamSound.play()

                    shots[j].remove()
                    shots.splice(i, 1)

                    if (zombies.length == 0) {
                        round++
                        for (let k = 0; k < round; k++) {
                            zombies.push(createZombie())
                        }
                    }

                }
            }
        }


    }

    onFrame = (event) => {
        player.position += player.vec
        if (player.position.x > view.bounds.width) {
            player.position.x = 0;
        }

        if (player.position.x < 0) {
            player.position.x = view.bounds.width;
        }

        if (player.position.y < 0) {
            player.position.y = view.bounds.height;
        }

        if (player.position.y > view.bounds.height) {
            player.position.y = 0;
        }

        for (let i = 0; i < zombies.length; i++) {

            const zombie = zombies[i];
            zombie.position += zombies[i].vec

            if (zombie.position.x > view.bounds.width) {
                zombie.position.x = 0;
            }

            if (zombie.position.x < 0) {
                zombie.position.x = view.bounds.width;
            }

            if (zombie.position.y < 0) {
                zombie.position.y = view.bounds.height;
            }

            if (zombie.position.y > view.bounds.height) {
                zombie.position.y = 0;
            }
        }

        for (let i = 0; i < shots.length; i++) {
            shots[i].position += shots[i].vec

        }

        checkIntersection()

        for (let i = 0; i < bones1.length; i++) {

            const bone1 = bones1[i];
            bone1.position += bones1[i].vec

            if (bone1.position.x > view.bounds.width) {
                bone1.position.x = 0;
            }

            if (bone1.position.x < 0) {
                bone1.position.x = view.bounds.width;
            }

            if (bone1.position.y < 0) {
                bone1.position.y = view.bounds.height;
            }

            if (bone1.position.y > view.bounds.height) {
                bone1.position.y = 0;
            }
        }

        for (let i = 0; i < bones2.length; i++) {

            const bone2 = bones2[i];
            bone2.position += bones2[i].vec

            if (bone2.position.x > view.bounds.width) {
                bone2.position.x = 0;
            }

            if (bone2.position.x < 0) {
                bone2.position.x = view.bounds.width;
            }

            if (bone2.position.y < 0) {
                bone2.position.y = view.bounds.height;
            }

            if (bone2.position.y > view.bounds.height) {
                bone2.position.y = 0;
            }
        }

        for (let i = 0; i < sculls.length; i++) {

            const scull = sculls[i];
            scull.position += sculls[i].vec

            if (scull.position.x > view.bounds.width) {
                scull.position.x = 0;
            }

            if (scull.position.x < 0) {
                scull.position.x = view.bounds.width;
            }

            if (scull.position.y < 0) {
                scull.position.y = view.bounds.height;
            }

            if (scull.position.y > view.bounds.height) {
                scull.position.y = 0;
            }
        }

    }

}



main()

//background animation

//const explosion = new Raster('assets/IMG/EXPLOSION.png');
//explosion.position = [-1000,-1000]

//const count = 10;
//var bone1 = new Raster('assets/IMG/BONE1.png');
//bone1.position = [-1000,-1000]
//bone1.center = [0,0]

//var symbol = new Symbol(bone1);

//for (var i = 0; i<count; i++){
    //var center = Point.random()*view.size;
    //var placedSymbol = symbol.place(center);
    //placedSymbol.scale(i/count-0.2);
//}


