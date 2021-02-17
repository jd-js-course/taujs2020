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


const createZombie = () => {
    const zombie = new Path.Circle(new Point(1000, 1000), 15);
    zombie.strokeColor = 'black'
    zombie.fillColor = 'green'
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
   
