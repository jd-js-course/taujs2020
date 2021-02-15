//color picker 
var pickerDiv = document.getElementById('colorPicker');
var picker = new Picker(pickerDiv);
picker.onChange = function (color) {
    pickerDiv.style.background = color.rgbaString;
    currentColor = color.rgbaString;
}

//sounds 
var paintkMusic = new Howl({
    src: ['assert/button-46.mp3'],
    loop: false,
    volume: 0.1,
});
var morningMusic = new Howl({
    src: ['assert/mixkit-little-birds-singing-in-the-trees-17.wav'],
    loop: true,
    volume: 0.1,
});
var nightMusic = new Howl({
    src: ['assert/mixkit-crickets-at-night-in-nature-2475.wav'],
    loop: true,
    volume: 0.1,
});

//create cloud
function createCloud() {
    const cloud = new Raster('assert/cloud.png')
    cloud.scale(Math.random() * 0.05 + 0.02)
    cloud.position = Point.random() * view.size;
    if (cloud.position.y > 500) {
        cloud.position.y = Math.random() * 500;
    }
    cloud.vec = Point.random() - Point.random() * 2
    return cloud
}

//create star
function createStar() {
    const star = new Raster('assert/star.png')
    star.scale(Math.random() * 0.3 + 0.02)
    star.position = Point.random() * view.size;
    star.vec = Point.random() - Point.random() * 2
    return star
}

//create building and background
var background = new Path.Rectangle([0, 0], [15000, 15000]);
background.fillColor = '#afdadb'
let sun = new Path.Circle(new Point(1500, 50), 100);
sun.fillColor = '#FFCA06'
let stars = []
for (let i = 0; i < 80; i++) {
    stars[i] = createStar();
    stars[i].visible = false;
}
let clouds = []
for (let i = 0; i < 12; i++) {
    clouds[i] = createCloud();
}
var ground = new Path.Rectangle([0, 650], [15000, 15000]);
ground.fillColor = '#515a5b'
var path3 = new Path.Rectangle([420, 80], [150, 40]);
path3.strokeColor = '#f1f1f1ff'
path3.fillColor = 'white'
var path2 = new Path.Rectangle([410, 80], [170, 30]);
path2.strokeColor = '#f1f1f1ff'
path2.fillColor = 'white'
var path1 = new Path.Rectangle([316, 115], [904, 510]);
path1.strokeColor = '#f1f1f1ff'
path1.fillColor = 'white'
var path15 = new Path.Rectangle([409, 625], [720, 40]);
path15.fillColor = '#c1c1c1ff'
path15.opacity = 0.91
var path4 = new Path.Rectangle([316, 625], [7, 40]);
path4.strokeColor = 'white'
path4.fillColor = 'white'
var path5 = new Path.Rectangle([402, 625], [7, 40]);
path5.strokeColor = 'white'
path5.fillColor = 'white'
var path6 = new Path.Rectangle([492, 625], [7, 40]);
path6.strokeColor = 'white'
path6.fillColor = 'white'
var path7 = new Path.Rectangle([582, 625], [7, 40]);
path7.strokeColor = 'white'
path7.fillColor = 'white'
var path8 = new Path.Rectangle([672, 625], [7, 40]);
path8.strokeColor = 'white'
path8.fillColor = 'white'
var path9 = new Path.Rectangle([762, 625], [7, 40]);
path9.strokeColor = 'white'
path9.fillColor = 'white'
var path10 = new Path.Rectangle([852, 625], [7, 40]);
path10.strokeColor = 'white'
path10.fillColor = 'white'
var path11 = new Path.Rectangle([942, 625], [7, 40]);
path11.strokeColor = 'white'
path11.fillColor = 'white'
var path12 = new Path.Rectangle([1032, 625], [7, 40]);
path12.strokeColor = 'white'
path12.fillColor = 'white'
var path13 = new Path.Rectangle([1122, 625], [7, 40]);
path13.strokeColor = 'white'
path13.fillColor = 'white'
var path14 = new Path.Rectangle([1213, 625], [7, 40]);
path14.strokeColor = 'white'
path14.fillColor = 'white'

//create windows and painting function
var check = new Point(318, 130)
var arr = [];
var currentColor = '#e1e1e1';
for (let j = 0; j < 12; j++) {
    for (let i = 0; i < 20; i++) {
        arr[i] = new Path.Rectangle([check.x, check.y], [44, 37]);
        arr[i].fillColor = '#e1e1e1'
        arr[i].strokeColor = 'white'
        arr[i].strokeWidth = 3
        check.x = check.x + 45
        arr[i].onClick = function (event) {
            this.fillColor = currentColor;
            paintkMusic.play()
        }
        arr[i].onDoubleClick = function (event) {
            this.fillColor = '#e1e1e1';
        }
    }
    check.x = (318)
    check.y = check.y + 41
}
var gameNight = false;
//clouds and stars animation
function main() {

    onFrame = (event) => {

        for (let i = 0; i < clouds.length; i++) {
            const cloud = clouds[i];
            cloud.position.x += cloud.bounds.width / 500

            if (cloud.position.x > view.bounds.width) {
                cloud.position.x = 0
            }
            if (cloud.position.x < 0) {
                cloud.position.x = view.bounds.width
            }
            if (cloud.position.y < 0) {
                cloud.position.y = view.bounds.height
            }

            if (cloud.position.y > view.bounds.height) {
                cloud.position.y = 0
            }
        }
        for (let i = 0; i < stars.length; i++) {
            const star = stars[i];
            star.position.x += star.bounds.width / 500

            if (star.position.x > view.bounds.width) {
                star.position.x = 0
            }
            if (star.position.x < 0) {
                star.position.x = view.bounds.width
            }
            if (star.position.y < 0) {
                star.position.y = view.bounds.height
            }
            if (star.position.y > view.bounds.height) {
                star.position.y = 0
            }
        }
    }
    //check which mode you play
    btnNight.addEventListener("click", function () {
        if (!gameNight) {
            nightmode();
        }
        else {
            dayMode();
        }
    });
}
//day mode
function dayMode() {
    gameNight = false
    morningMusic.play()
    nightMusic.stop()
    document.getElementById("btnNight").innerHTML = "Night"
    background.fillColor = '#afdadb'
    sun.fillColor = '#FFCA06'
    for (let i = 0; i < 12; i++) {
        clouds[i].visible = true;
    }
    for (let i = 0; i < stars.length; i++) {
        stars[i].visible = false;
    }
}

//night mode
function nightmode() {
    nightMusic.play()
    morningMusic.stop()
    gameNight = true
    document.getElementById("btnNight").innerHTML = "Day"
    sun.fillColor = "#fdfdd5ec"
    background.fillColor = "#112a31"
    for (let i = 0; i < 80; i++) {
        stars[i].visible = true;
    }
    for (let i = 0; i < clouds.length; i++) {
        clouds[i].visible = false;
    }
}
    main()