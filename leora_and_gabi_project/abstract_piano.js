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

class Note {
  constructor(note, length, octave, rate) {
    this.note_char = note;
    this.length = length;
    this.octave = octave;
    this.getNoteSamples(rate);
  }

  getNoteSamples(rate) {
    /*
     * Use note_char, length, octave  and rate to generate/create/import
     * "this.note_sample" and "this.wrong_note_sample" (quarter tone
     * higher/lower)
     */
  }

  playNote() {
    /* play(this.note_sample)*/
  }

  playWrongNote() {
    /* play(this.wrong_note_sample)*/
  }
}

class Song {
  constructor(rate, notes) {
    this.rate = rate;
    this.time_frame = [];
    for (var note in notes) {
      if (note == null) this.time_frame.add(null);
      this.time_frame.add(
        new Note(note.note, note.length.note.octave, this.rate)
      );
    }
  }
}

const main = () => {
  /* Demo for path creation */
  view.onClick = (event) => {
    var top = new Point(event.point.x, 0);
    createPath(top);
  };

  /* Demo for "Piano" */
  /*
  * First objective: Implement the methods of "class Note", and create simple
  * "piano" - Using keys A,S,D,F,H,J,K,L play notes C,D,E,F,G,A,B,C (octave 1
  * for the first seven notes, and octave 2 for the last "C" note), at rate 60 BPM
  * and length 1 beat.
  */


};

main();
