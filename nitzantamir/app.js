
const verline = new Path({
    segments: [[100, 0], [115, 0], [115, 600], [100, 600]],
    fillColor: 'black',
    closed: true
});

const verline1 = new Path({
    segments: [[215, 0], [230, 0], [230, 600], [215, 600]],
    fillColor: 'black',
    closed: true
});

const verline2 = new Path({
    segments: [[295, 0], [310, 0], [310, 600], [295, 600]],
    fillColor: 'black',
    closed: true
});

const verline3 = new Path({
    segments: [[330, 0], [345, 0], [345, 600], [330, 600]],
    fillColor: 'black',
    closed: true
});

const verline4 = new Path({
    segments: [[465, 0], [480, 0], [480, 600], [465, 600]],
    fillColor: 'black',
    closed: true
});

const verline5 = new Path({
    segments: [[590, 0], [605, 0], [605, 600], [590, 600]],
    fillColor: 'black',
    closed: true
});

const verline6 = new Path({
    segments: [[625, 0], [640, 0], [640, 600], [625, 600]],
    fillColor: 'black',
    closed: true
});

const verline7 = new Path({
    segments: [[680, 0], [695, 0], [695, 600], [680, 600]],
    fillColor: 'black',
    closed: true
});

const horizline = new Path({
    segments: [[0, 200], [700, 200], [700, 215], [0, 215]],
    fillColor: 'black',
    closed: true
});

const horizline1 = new Path({
    segments: [[0, 285], [700, 285], [700, 300], [0, 300]],
    fillColor: 'black',
    closed: true
});

const horizline2 = new Path({
    segments: [[0, 340], [700, 340], [700, 355], [0, 355]],
    fillColor: 'black',
    closed: true
});

const horizline3 = new Path({
    segments: [[0, 405], [700, 405], [700, 420], [0, 420]],
    fillColor: 'black',
    closed: true
});

const horizline4 = new Path({
    segments: [[480, 530], [680, 530], [680, 545], [480, 545]],
    fillColor: 'black',
    closed: true
});

const rec1 = new Path({
    segments: [[480, 420], [590, 420], [590, 530], [480, 530]],
    fillColor: 'red',
    closed: true,
});

const rec3 = new Path({
    segments: [[115, 530], [330, 530], [330, 550], [115, 550]],
    fillColor: 'blue',
    closed: true
});
const rec = new Path({
    segments: [[0, 0], [100, 0], [100, 200], [0, 200]],
    fillColor: 'yellow',
    closed: true
});
var group = new Group(rec, rec1, rec3)

const main = () => {

    let gameStarted = false
    let gameEnded = false
    let goStart = false

    var bgMusic = new Howl({
        src: ['assets/sounds/Hypnotic-Puzzle3.mp3'],
        loop: true,
        volume: 0.05
    });

    onclick = (event) => {
        if (!gameStarted && !gameEnded) {
            bgMusic.play()
        }

        function hide(id) {
            document.getElementById(id).className = "hidden";
        }
        function show(id) {
            document.getElementById(id).className = "";
        }

        function setScene(id) {
            switch (id) {
                case 0:
                    show("scene0");
                    hide("scene1");
                    hide("scene2");
                    hide("scene3");
                    hide("scene4");
                    break;
            }
        }
        function setScene(id) {
            switch (id) {
                case 1:
                    hide("scene0");
                    show("scene1");
                    hide("scene2");
                    hide("scene3");
                    hide("scene4");
                    break;
            }
        }
        function setScene(id) {
            switch (id) {
                case 2:
                    hide("scene0");
                    hide("scene1");
                    show("scene2");
                    hide("scene3");
                    hide("scene4");
                    break;
            }
        }
        function setScene(id) {
            switch (id) {
                case 3:
                    hide("scene0");
                    hide("scene1");
                    hide("scene2");
                    show("scene3");
                    hide("scene4");
                    break;
            }
        }
        function setScene(id) {
            switch (id) {
                case 4:
                    hide("scene0");
                    hide("scene1");
                    hide("scene2");
                    hide("scene3");
                    show("scene4");
                    break;
            }
        }

        function startscreen() {
            setScene(0);
            gameStarted = false
            gameEnded = true 
            goStart = true        
                var x = document.getElementById("scene0");
                if (x.style.display === "none") {
                  x.style.display = "block";
                } else {
                  x.style.display = "none";
                }  
        }

        function AllYellow() {
            setScene(1);
            group.fillColor = 'yellow'
            path.fillColor = 'yellow'
            gameStarted = false
            gameEnded = true
            goStart = false
            bgMusic.stop()
    }
        function AllRed() {
            setScene(2);
            group.fillColor = 'red'
            path.fillColor = 'red'
            gameStarted = false
            gameEnded = true
            goStart = false
            bgMusic.stop()
        }
        function AllBlue() {
            setScene(3);
            group.fillColor = 'blue'
            path.fillColor = 'blue'
            gameStarted = false
            gameEnded = true
            goStart = false
            bgMusic.stop()
        }
        function GoCrazy() {
            setScene(4);
            rec1.fillColor = 'red'
            rec3.fillColor = 'blue'
            rec.fillColor = 'yellow'
            path.fillColor = 'white'
            gameStarted = true
            gameEnded = false
            goStart = false
            bgMusic.play()
        }

        document.getElementById("btn1").addEventListener("click", AllYellow);
        document.getElementById("btn2").addEventListener("click", AllRed);
        document.getElementById("btn3").addEventListener("click", AllBlue);
        document.getElementById("btn4").addEventListener("click", GoCrazy);
        //document.getElementById("scene0").innerHTML("click", startscreen);
        document.getElementById("scene0").addEventListener("click", startscreen);

    }

    var count = 100;

    var path = new Path.Circle({
        center: [0, 0],
        radius: 10,
        fillColor: 'black',
        strokeColor: 'black'
    });

    var count = 150;
    var path = new Path.Circle({
        center: [0, 0],
        radius: 10,
        fillColor: 'black',
        strokeColor: 'black'
    });

    var symbol = new Symbol(path);

    for (var i = 0; i < count; i++) {
        var center = Point.random() * view.size;
        var placedSymbol = symbol.place(center);
        placedSymbol.scale(i / count);
    }

    onFrame = (event) => {
        if (gameEnded) {
            return;
        }
        for (var i = 0; i < count; i++) {
            var item = project.activeLayer.children[i];
            if (gameStarted != true) {
                return;
            }
            item.position.x += item.bounds.width / 20;
            if (item.bounds.left > view.size.width) {
                item.position.x = -item.bounds.width;

            }
        }
    }
}


main()







