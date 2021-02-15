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
    const synth = new Tone.Synth().toDestination();
    synth.volume.value = 10
    const now = Tone.now()

    var a4 = new Howl({
        src: ['assets/sounds/A4.mp3'],
        loop: false,
        volume: 1
    });

    var b4 = new Howl({
        src: ['assets/sounds/B4.mp3'],
        loop: false,
        volume: 1
    });

    var c4 = new Howl({
        src: ['assets/sounds/C4.mp3'],
        loop: false,
        volume: 1
    });

    var d4 = new Howl({
        src: ['assets/sounds/D4.mp3'],
        loop: false,
        volume: 1
    });

    var e4 = new Howl({
        src: ['assets/sounds/E4.mp3'],
        loop: false,
        volume: 1
    });

    var f4 = new Howl({
        src: ['assets/sounds/F4.mp3'],
        loop: false,
        volume: 1
    });

    var g4 = new Howl({
        src: ['assets/sounds/G4.mp3'],
        loop: false,
        volume: 1
    });
    
    var c5 = new Howl({
        src: ['assets/sounds/C5.mp3'],
        loop: false,
        volume: 1
    });

        }
        
  }


  onKeyDown = (event) => {

    switch (event.key) {
        case 'a':
            c4.play()
            break;
        case 's':
            d4.play()
            break;
        case 'd':
            e4.play()
            break;
        case 'f':
            f4.play()
            break;
        case 'g':
            g4.play()
            break;
        case 'h':
            a4.play()
            break;
        case 'j':
            b4.play()
            break;
        case 'k':
            c5.play()
            break;
            //wrong note sound, using a Synthesizer   
        default:
            synth.triggerAttackRelease("A2", now);
            break;
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
