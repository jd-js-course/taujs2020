
// WET SAND SHAPE

var wsand = new Path();
wsand.strokeColor = '#DDC9A6';
wsand.add(new Point(view.size));
wsand.add(new Point(view.center));
wsand.add(new Point(0, view.size.height));
wsand.fillColor = '#C6B295';
wsand.strokeCap = 'round';
wsand.smooth();
wsand.scale(2, 1.5);


// GAL SHAPE 

var gal = wsand.clone();
gal.fillColor = "#9DC9CC";
console.log(gal.position)
gal.position.y = view.size.height * 1.2


//  VECTOR GAL MOVMENT

var pt0 = new Point(view.size.width, view.size.height);
var pt1 = new Point(view.size.width, 0);
var vector = pt1 - pt0;


// GAL ANIMATION


function onFrame(event) {


    gal.position.y += vector.y / 1000;


    if (gal.position.y < wsand.position.y + 1) {


        gal.position.y = view.size.height * 1.2

    }



}

console.log(onFrame)



//DRAW in sand  



tool.minDistance = 20;
tool.maxDistance = 200;

var path;


function onMouseDown(event) {



    path = new Path();
    path.fillColor = '#C6B295';
    path.strokeColor = '#DDC9A6';
    path.strokeWidth = 5
    path.strokeCap = 'round';


    path.add(event.point);
    return path
}

function onMouseDrag(event) {
    var step = event.delta / 8;
    step.angle += 90;


    var top = event.middlePoint + step;
    var bottom = event.middlePoint - step;

    path.add(top);
    path.insert(0, bottom);
    path.smooth();


    if (path.bounds.intersects(gal.bounds)) {
        path.visible = false;


    }


}

function onMouseUp(event) {
    path.add(event.point);
    path.closed = true;
    path.smooth();
    path.strokeCap = 'round';
}








