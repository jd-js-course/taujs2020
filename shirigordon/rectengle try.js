var topLeft = new Point(10, 20);
var rectSize = new Size(200, 100);
var rect = new Rectangle(topLeft, rectSize);
console.log(rect); // { x: 10, y: 20, width: 200, height: 100 }
console.log(rect.point); // { x: 10, y: 20 }
console.log(rect.size); // { width: 200, height: 100 }