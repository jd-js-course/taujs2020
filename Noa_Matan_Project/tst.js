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

//create zombie

const createZombie = () => {

    const knife = new Path({
        segments: [[9,44], [109,44], [109,60]],
        fillColor: '#C3C4C6',
        strokeColor: 'black',
        closed: true
    });

    const KnifeHendel = new Path();
KnifeHendel.strokeColor = 'black';
KnifeHendel.fillColor = '#5D3019'
KnifeHendel.add(new Point(109,44));
KnifeHendel.add(new Point(109,49));
KnifeHendel.add(new Point(136,49));
KnifeHendel.add(new Point(136,44));
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
    children: [knife,KnifeHendel,ZombieHead,eye1,eye1Red,eye1Cen,eye2,eye2Red,eye2Cen,mouth,scar1,scar2,scar3,scar4,EB1,EB2],
    position: (60,60)
});
    
    zombie.position = Point.random() * view.size;
    zombie.vec = Point.random() - Point.random() * 2
    return zombie

}

const main = () => {
    
    const player = createPlayer()
    const shots = []
    const zombies = []

    var playerHP=100
    var round = 1

   zombies.push(createZombie())

    



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
        
        for (let i = 0; i < zombies.length; i++) {
            if (player.intersects(zombies[i])) {
                playerHP=playerHP-10

                console.log(playerHP)

                if(playerHP<=0){
                    return;
                }
                    
                zombies[i].remove();
                    zombies.splice(i, 1)

                    if(zombies.length==0){
                        round++

                        for(let k=0;k<round;k++){
                            zombies.push(createZombie())
                        }
                    }

            }

            for (let j = 0; j < shots.length; j++) {
                if (shots[j].intersects(zombies[i])) {
                    zombies[i].remove();
                    zombies.splice(i, 1)

                    shots[j].remove()
                    shots.splice(i, 1)

                    if(zombies.length==0){
                        round++
                        for(let k=0;k<round;k++){
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

        

    }

}

main()