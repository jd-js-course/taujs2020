const createPath = (top) => {
  var speed = view.size.getHeight() / 10;
  var hor_speed = 10;

  var path = new Path();

  path.add(top);
  do {
    var next = top + new Point(hor_speed * (Math.random() - 0.5), 1) * speed;
    if (next.x < view.bounds.left || next.x > view.bounds.right) continue;

    path.add(next);
    top = next;
  } while (top.y <= view.bounds.bottom);

  path.smooth();
  console.log(path);

  var closure = new Path();
  closure.fillColor = Color.random();
  closure.closed = true;
  var i = 0.0;
  var intId = setInterval(() => {
    let loc = path.getLocationAt(i);
    var step = (loc.normal * 10 * (i + path.length / 10)) / path.length;
    var top = loc.point + step;
    var bottom = loc.point - step;

    closure.add(top);
    closure.insert(0, bottom);
    closure.smooth()
    closure.closed = true;

    i += path.length / 100;
    if (i >= path.length) clearInterval(intId);
  }, 5);
};

const main = () => {
  /* Demo for path creation */
  view.onClick = (event) => {
    var top = new Point(event.point.x, 0);
    createPath(top);
  };
};

main();
