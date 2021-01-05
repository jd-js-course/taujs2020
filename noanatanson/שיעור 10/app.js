const createShip = () => {
    var path = new Path([-10, -8], [10, 0], [-10, 8], [-8, 4], [-8, -4]);
    path.closed = true;
    path.fillColor = "red";
    var thrust = new Path([-8, -4], [-14, 0], [-8, 4]);
    thrust.fillColor = "orange"
    var group = new Group(path,thrust);
    group.position = view.bounds.center;
    group.strokeColor = 'white'
    group.currentRotetion = 0;
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
    const ship = createShip ()

    const num = Math.random() * 5 + 5
    const rocks = []
    for (let i=0; i<num; i++){
        rocks.push(createAstroid ())
    }

    onMouseMove = (event) => {
        ship.position = event.point
        const delta = ship.currentRotetion - event.delta.angle
        ship.rotate(delta)
        if (event.delta.angle)
        ship.currentRotetion = event.delta.angle

    }

    checkIntersection = () => {
        for (let i=0; i<rocks.length; i++) {
            if (ship.intersects(rocks[i])){
                rocks[i].remove()

            }
        }

    }

    onFrame = (event) => {
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

