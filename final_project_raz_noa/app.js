//color picker 
var pickerDiv = document.getElementById('colorPicker');
var picker = new Picker(pickerDiv);
picker.onChange = function (color) {
    pickerDiv.style.background = color.rgbaString;
    currentColor = color.rgbaString;
}


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