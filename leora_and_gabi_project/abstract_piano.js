// Global app instance for the game itself
var app = null;

// Index from 0 to 6. Used for the target of the path.
const note_to_position = {
  "C": 0,
  "D": 1,
  "E": 2,
  "F": 3,
  "G": 4,
  "A": 5,
  "B": 6,
  "C#": 0,
  "D#": 1,
  "E#": 2,
  "F#": 3,
  "G#": 4,
  "A#": 5,
  "B#": 6
}

// Keyboard key for each musical note
const note_to_key = {
  "C": "A",
  "D": "S",
  "E": "D",
  "F": "F",
  "G": "G",
  "A": "H",
  "B": "J",
  "C#": "A",
  "D#": "S",
  "E#": "D",
  "F#": "F",
  "G#": "G",
  "A#": "H",
  "B#": "J"
}

// A class that allows drawing a curved path with increasing width.
class GradiantWidthPath {
  constructor(time_to_bottom, note, note_to_color) {
    let end_point = this.getBottomByNote(note);
    let color = this.getColorByNote(note, note_to_color);
    console.log(end_point)
    var speed = view.size.getHeight() / 10;
    var hor_speed = 2;

    this.path = new Path();

    this.path.add(end_point);
    var current_point = end_point
    /*
    Draw the path from the bottom of the screen up. Each step of the loop adds a new point
    to the path which is one tenth of the screen above the previous path, with a random
    horizontal offset, increasing as we go up. Meaning, the path curves wider the further up
    it is.
    */
    do {
      var next = current_point - new Point(hor_speed * (Math.random() - 0.5), 1) * speed;
      if (next.x < view.bounds.left || next.x > view.bounds.right)
        continue;

      this.path.add(next);
      hor_speed += 1;
      current_point = next;
    } while (current_point.y >= view.bounds.top);

    // We then smooth the path to make it curvy
    this.path.smooth();

    this.closure = new Path();
    this.closure.fillColor = color;
    this.closure.is_closed = true

    this.time_to_bottom = time_to_bottom;
    this.current_time = 0.0;
    this.note = note;
    this.played = false;
  }

  // Function that calclates the destination point of the path according to the
  // musical note
  getBottomByNote(note) {
    let position_index = note_to_position[note.note_char];
    let bottom_point_x = (position_index + 0.5) / 7.0;
    let bottom_point = new Point(bottom_point_x, 1) * view.size;
    return bottom_point;
  }

  // Fucntion gets the color of the path according to the musical note and the song's
  // color scheme
  getColorByNote(note, note_to_color) {
    let color = new Color(note_to_color[note.note_char]);
    color.brightness += (Math.random() - 0.5) * 0.1
    return color;
  }

  // Returns true if the path is approching the end and is within the target bounds.
  isOnEnd() {
    return this.time_to_bottom * 0.8 < this.current_time && this.current_time < this.time_to_bottom;
  }

  // Plays the note's sound according to the path's position
  playSound() {
    console.log(this.time_to_bottom, this.current_time)
    if (this.played)
      return;

    console.log(this.isOnEnd())
    if (this.isOnEnd())
      this.note.playSound();
    else
      this.note.playWrongSound();

    this.played = true;
  }

  // Function in charge of continiously progressing the path from top of the screen
  // to bottom. Returns true if the path reached the bottom of the screen.
  advanceClosure(delta) {
    var i = (this.current_time / this.time_to_bottom) * this.path.length;
    this.current_time += delta;

    var end = Math.min(this.path.length, (this.current_time / this.time_to_bottom) * this.path.length)

    // The below code was inspired by paper.js's tutorial on using mouse vectors.
    // The code creates a "skeleton" along the original path using the normal vector
    // on various points. It then creates a closed polygon encompasing this skeleton.
    do {
      let location = this.path.getLocationAt(this.path.length - i);

      var step = (location.normal * 10 * (0.2 + i / this.path.length)) ;
      var top = location.point + step;
      var bottom = location.point - step;

      this.closure.add(top);
      this.closure.insert(0, bottom);
      this.closure.is_closed = true

      i += this.path.length / 250;
    } while (i <= end);

    this.closure.smooth();
    return this.current_time >= this.time_to_bottom;
  }

  disappear() {
    var tween = this.closure.tweenTo({ opacity: 0 }, 1000);
    return tween;
  }

  appear() {
    var tween = this.closure.tweenTo({ opacity: 1 }, 1000);
    return tween;
  }

  remove() {
    this.path.remove();
    this.closure.remove();
  }
};

var Synth = new AudioSynth();
var piano = Synth.createInstrument('piano');
var wrong_piano = Synth.createInstrument('edm');

class Note {
  constructor(note, duration, octave, rate) {
    this.note_char = note;
    this.duration = duration * 60 / rate;
    this.octave = octave;
  }

  playSound() {
    piano.play(this.note_char, this.octave, this.duration);
  }

  playWrongSound() {
    wrong_piano.play(this.note_char, this.octave, 0.3*this.duration);
  }
}

// A class that represents a song, and yields notes according to the timing of the song.
class Song {
  constructor(rate, notes, note_to_color) {
    this.rate = rate;
    this.time_frames = [];
    this.note_to_color = note_to_color;
    console.log(this.note_to_color)
    console.log(notes);
    for (const n of notes) {
      if (n == null) {
        this.time_frames.push(null);
        continue;
      }
      this.time_frames.push(
        new Note(n["note"], n["duration"], n["octave"], this.rate)
      );
    }

    this.reset()
    this.on_end_callback = null
  }

  // Registers a callback to be called on the song's end
  onEnd(callback) {
    this.on_end_callback = callback;
  }

  // If it is time to play the next note, returns it.
  // Otherwise, returns null.
  yieldNextNote(delta) {
    if (this.next_frame >= this.time_frames.length) {
      if (this.on_end_callback != null)
        this.on_end_callback();
      return null;
    }

    this.current_time += delta;

    if (this.current_time <= this.next_frame * 60 / this.rate)
      return null;

    var res = this.time_frames[this.next_frame];
    this.next_frame++;
    return res;
  }

  reset() {
    this.current_time = 0;
    this.next_frame = 0;
  }
}

// This object allows state management of the app.
const app_states = {
  START: "start",
  PLAY: "playing",
  END_PLAYING: "end playing",
  SHOW_PAINT: "showing painting"
}

// This class creates the game on the screen, and is in charge of the game mechanics.
class AbstractPiano {
  constructor(song) {
    this.paths = [];
    this.finished_paths = [];
    this.song = song;
    this.state = app_states.PLAY;
    this.got_last_note = false;

    this.song.onEnd(() => {
      console.log("Got last note!");
      this.got_last_note = true;
    })

    this.createMarkers();
  }

  // Function displays the target bounds at the bottom of the screen
  createMarkers() {
    this.text_markers = [];
    this.gradients = [];

    for (let note in note_to_key) {
      let key = note_to_key[note];
      let note_color = this.song.note_to_color[note];
      let position_index = note_to_position[note];

      let bottom_point = new Point((position_index + 0.5) / 7.0, 1) * view.size;

      let text = new PointText({
        point: bottom_point,
        content: key,
        fillColor: "white",
        fontFamily: 'Courier New',
        fontWeight: 'bold',
        fontSize: 50,
        opacity: 0.7
      });

      text.position.y -= text.fontSize / 3;

      bottom_point.y -= view.size.height * 0.1;
      var top_left= bottom_point - [view.size.width / 14, view.size.height * 0.1];
      var bottom_right = bottom_point + [view.size.width / 14, view.size.height * 0.1];

      var rect = new Path.Rectangle({
        topLeft: top_left,
        bottomRight: bottom_right,
        fillColor: {
            gradient: {
                stops: ['#fff', note_color]
            },
            origin: bottom_point - [0, view.size.height * 0.1],
          destination: bottom_point + [0, view.size.height * 0.1],
        }
      });

      text.bringToFront()

      this.text_markers.push(text);
      this.gradients.push(rect);
    }
  }

  addPath(bottom, note) {
    var new_path = new GradiantWidthPath(3.0, note, this.song.note_to_color);
    this.paths.push(new_path);
  }

  handleFinishedPath(path) {
    path.playSound();
    path.disappear();
    this.finished_paths.push(path);
  }

  // Function advances all displayed paths.
  advancePaths(frame_event) {
    var remaining_paths = [];
    while (this.paths.length != 0) {
      var path = this.paths.pop()
      if (!path.advanceClosure(frame_event.delta))
        remaining_paths.push(path);
      else
        this.handleFinishedPath(path);
    }

    this.paths = remaining_paths;
    if (this.got_last_note && this.paths.length == 0)
      this.state = app_states.END_PLAYING;
  }

  getNextNote(frame_event) {
    var next_note = this.song.yieldNextNote(frame_event.delta);
    if (next_note == null)
      return;

    var end_point = new Point.random() * view.size;
    end_point.y = view.bounds.bottom;

    this.addPath(end_point, next_note);
  }

  // Presents final "masterpiece" of paths
  showAllPaths() {
    for (let path of this.finished_paths) {
      path.appear();
    }

    // After 3 seconds, displays a button that navigates back to the homepage
    setTimeout(() => {
      const replay = new PointText({
        position: view.center - [0, 100],
        justification: 'center',
        content: 'Play another Song',
        fillColor: '#fff',
        fontFamily: 'Times New Roman',
        fontSize: 48,
      });

      var replayBtn = new Path.Rectangle(replay.bounds);
      replayBtn.scale(1.3);
      replayBtn.fillColor = '#000';
      replayBtn.opacity = 1;
      replayBtn.shadowColor = new Color(0, 0, 0);
      replayBtn.shadowBlur = 10;
      replayBtn.shadowOffset = new Point(1, 1);
      replay.bringToFront();

      replay.onMouseEnter = function (event) {
        this.scale(1.1)
      }

      replay.onMouseLeave = function (event) {
        this.scale(1 / 1.1)
      }

      replay.onClick = function (event) {
        paper.project.activeLayer.removeChildren();
        app = null;
        showHomePage();
      };

      var group = new Group();

      group.addChild(replayBtn);
      group.addChild(replay);

      group.opacity = 0;

      group.tweenTo({ opacity: 1 }, 1000);
    }, 3000);
  }

  removeAllPaths() {
    for (let path of this.finished_paths) {
      path.remove();
    }

    this.finished_paths = []
  }

  handleNewFrame(frame_event) {
    switch (this.state) {
      case app_states.PLAY:
        if (!this.got_last_note)
          this.getNextNote(frame_event);
        this.advancePaths(frame_event);
        break;
      case app_states.END_PLAYING:
        this.showAllPaths();
        this.state = app_states.SHOW_PAINT;
        break;
      default:
        break;
    }
  }

  handleKeyDown(event) {
    if (this.state != app_states.PLAY)
      return;

    for (let path of this.paths) {
      if (note_to_key[path.note.note_char] != event.character.toUpperCase())
        continue;

      // When key is pressed on time, plays the note and presents a "clicking"
      // animation
      if (path.isOnEnd()) {
        path.playSound();
        var position_index = note_to_position[path.note.note_char];
        let bottom_point = new Point((position_index + 0.5) / 7.0, 1) * view.size;

        bottom_point.y -= view.size.height * 0.1;
        var top_left= bottom_point - [view.size.width / 14, view.size.height * 0.1];
        var bottom_right = bottom_point + [view.size.width / 14, view.size.height * 0.1];

        var rect = new Path.Rectangle({
          topLeft: top_left,
          bottomRight: bottom_right,
          fillColor: '#fff',
          opacity: 0
        });

        rect.tweenTo({ opacity: 0.5 }, 50).then(() => {
          rect.tweenTo({ opacity: 0 }, 1000 * 60 / this.song.rate);
        });
        return;
      }
    }

    for (const note in note_to_key) {
      if (note_to_key[note] != event.character.toUpperCase())
        continue;

      wrong_piano.play(note, 3, 0.3 * 60 / this.song.rate);
    }
  }
}

/* Call this fucntion with a the list of notes instance after you picked a song */
const initializeApp = (rate, notes, note_to_color) => {
  const gamescreen = new Layer();
  gamescreen.activate();
  console.log(notes);
  var song = new Song(rate, notes, note_to_color)
  app = new AbstractPiano(song);
};

const showHomePage = () => {

  document.getElementById("logoImg").style.display = "none";
  document.getElementById("taulogoImg").style.display = "none";
  document.getElementById("githubImgGabi").style.display = "none";
  document.getElementById("githubImgLeora").style.display = "none";

  const homePageLayer = new Layer();
  homePageLayer.activate();

  //Greeting Text for the user
  
  const logoImg = new Raster('logoImg');
  logoImg.position = view.center - [0,200];
  logoImg.justification = 'center'
  logoImg.scale(0.25);

  const welcomeText = new PointText({
    position: logoImg.position + [0,150],
    justification: 'center',
    content: 'Start Playing',
    fillColor: '#fff',
    fontFamily: 'Times New Roman',
    fontWeight: 'italic',
    fontSize: 36
  });

    var welcomeBtn = new Path.Rectangle(welcomeText.bounds);
    welcomeBtn.scale(1.3)
    welcomeBtn.fillColor = '#000'
    welcomeBtn.opacity = 1
    welcomeBtn.shadowColor = new Color(0,0,0)
    welcomeBtn.shadowBlur = 10,
    welcomeBtn.shadowOffset = new Point(1, 1)

    welcomeText.bringToFront()

    welcomeText.onMouseEnter = function(event) {
      this.scale(1.05)
    }
  
    welcomeText.onMouseLeave = function(event) {
      this.scale(1/1.05)
    }


    const studentsText = new PointText({
      position: welcomeText.position + [0,100],
      justification: 'center',
      content: 'an open-source university project by Leora Kowen and Gabriel Abboud',
      fillColor: 'black',
      fontFamily: 'Times New Roman',
      fontWeight: 'italic',
      fontSize: 24
    });

    const lecturerText = new PointText({
      position: studentsText.position + [0,40],
      justification: 'center',
      content: 'Lecturer: Jonathan Dortheimer',
      fillColor: 'black',
      fontFamily: 'Times New Roman',
      fontWeight: 'italic',
      fontSize: 24
    });

    const tauImg = new Raster('taulogoImg');
    tauImg.position = lecturerText.position + [200,100];
    tauImg.justification = 'center'
    tauImg.scale(0.5);

    tauImg.onMouseEnter = function(event) {
      this.scale(1.05)
    }
  
    tauImg.onMouseLeave = function(event) {
        this.scale(1/1.05)
    }
    

    const gitImgGab = new Raster('githubImgGabi');
    gitImgGab.position = tauImg.position + [-400,-20];
    gitImgGab.justification = 'center'
    gitImgGab.scale(0.09);

    gitImgGab.onMouseEnter = function(event) {
      this.scale(1.05)
    }
  
    gitImgGab.onMouseLeave = function(event) {
        this.scale(1/1.05)
    }

    const gitImgLeo = new Raster('githubImgLeora');
    gitImgLeo.position = gitImgGab.position + [0,40];
    gitImgLeo.justification = 'center'
    gitImgLeo.scale(0.09);

    gitImgLeo.onMouseEnter = function(event) {
      this.scale(1.05)
    }
  
    gitImgLeo.onMouseLeave = function(event) {
        this.scale(1/1.05)
    }


    tauImg.onClick = function(event){
    window.open("https://en-arts.tau.ac.il/");
    }

    gitImgGab.onClick = function(event) {
      window.open("https://github.com/gabi-abb");
    }

    gitImgLeo.onClick = function(event) {
      window.open("https://github.com/LeoraKowen");
    }

    //This function displays the song list and sets a new layer as active in PaperJs
    const showSongList = () => {

      //Activating a new layer in PaperJs
      const songListLayer = new Layer();
      songListLayer.activate();

        //These are the children of the active layer (songListLayer)
        const pickSongText = new PointText({
          position: view.center + [0,-200],
          justification: 'center',
          content: 'Pick a song:',
          fillColor: 'black',
          fontFamily: 'Times New Roman',
          fontWeight: 'italic',
          fontSize: 48
          });

        const song1 = new PointText({
          position: pickSongText.position + [0,100],
          justification: 'center',
          content: 'Bach\'s Suite No.1',
          fillColor: '#fff',
          fontFamily: 'Times New Roman',
          fontSize: 24,
        });
      
        var song1Btn = new Path.Rectangle(song1.bounds);
        song1Btn.scale(1.3);
        song1Btn.fillColor = '#000'
        song1Btn.opacity = 1
        song1Btn.shadowColor = new Color(0,0,0)
        song1Btn.shadowBlur = 10,
        song1Btn.shadowOffset = new Point(1, 1)  
        song1.bringToFront()
      

          song1.onMouseEnter = function(event) {
            this.scale(1.1)
          }
        
          song1.onMouseLeave = function(event) {
              this.scale(1/1.1)
          }

          const song2 = new PointText({
            position: song1.position + [0,100],
            justification: 'center',
            content: 'Jingle Bells',
            fillColor: '#fff',
            fontFamily: 'Times New Roman',
            fontSize: 24
          });
      
          var song2Btn = new Path.Rectangle(song2.bounds);
          song2Btn.scale(1.3);
          song2Btn.fillColor = '#000'
          song2Btn.opacity = 1
          song2Btn.shadowColor = new Color(0,0,0)
          song2Btn.shadowBlur = 10,
          song2Btn.shadowOffset = new Point(1, 1)  
          song2.bringToFront()

            song2.onMouseEnter = function(event) {
              this.scale(1.1)
            }
          
            song2.onMouseLeave = function(event) {
                this.scale(1/1.1)
            }

          const song3 = new PointText({
            position: song2.position + [0,100],
            justification: 'center',
            content: 'Astronomia',
            fillColor: '#fff',
            fontFamily: 'Times New Roman',
            fontSize: 24
          });
      
          var song3Btn = new Path.Rectangle(song3.bounds);
          song3Btn.scale(1.3);
          song3Btn.fillColor = '#000'
          song3Btn.opacity = 1
          song3Btn.shadowColor = new Color(0,0,0)
          song3Btn.shadowBlur = 10,
          song3Btn.shadowOffset = new Point(1, 1)  
          song3.bringToFront()

            song3.onMouseEnter = function(event) {
              this.scale(1.1)
            }
          
            song3.onMouseLeave = function(event) {
                this.scale(1/1.1)
            }

          const song4 = new PointText({
            position: song3.position + [0,100],
            justification: 'center',
            content: 'Yonatan Hakatan',
            fillColor: '#fff',
            fontFamily: 'Times New Roman',
            fontSize: 24
            });
        
            var song4Btn = new Path.Rectangle(song4.bounds);
            song4Btn.scale(1.3);
            song4Btn.fillColor = '#000'
            song4Btn.opacity = 1
            song4Btn.shadowColor = new Color(0,0,0)
            song4Btn.shadowBlur = 10,
            song4Btn.shadowOffset = new Point(1, 1)  
            song4.bringToFront()
  
            song4.onMouseEnter = function(event) {
              this.scale(1.1)
            }
          
            song4.onMouseLeave = function(event) {
                this.scale(1/1.1)
            }

          const expText = new PointText({
            position: song4.position + [0,100],
            justification: 'center',
            content: 'To create your abstract masterpiece, try to match the flowing lines with the boxes below according to each letter on the keyboard',
            fillColor: 'black',
            fontFamily: 'Times New Roman',
            fontWeight: 'italic',
            fontSize: 20
            });
          
          //When wanting to add more songs, use the following code to do so
          /********************************************************************************/

          /*const songRandom = new PointText({
            position: song3.position + [0,100],
            justification: 'center',
            content: 'Random',
            fillColor: 'black',
            fontFamily: 'Times New Roman',
            fontSize: 24
            });
  
            songRandom.onMouseEnter = function(event) {
              this.scale(1.1)
            }
          
            songRandom.onMouseLeave = function(event) {
                this.scale(1/1.1)
            }*/

            /********************************************************************************/

            /*When the user clicks the layer and it's children are removed 
            and a new layer is created and activated in the initializeApp function*/
    
            song1.onClick = function(event) {
              paper.project.activeLayer.removeChildren();
              initializeApp(bach_song.rate, bach_song.notes, bach_song.note_to_color);
            }
            
            song2.onClick = function(event) {
              paper.project.activeLayer.removeChildren();
              initializeApp(jinglebells_song.rate, jinglebells_song.notes, jinglebells_song.note_to_color);
            }

            song3.onClick = function(event) {
              paper.project.activeLayer.removeChildren();
              initializeApp(astronomia_song.rate, astronomia_song.notes, astronomia_song.note_to_color);
            }

            song4.onClick = function(event) {
              paper.project.activeLayer.removeChildren();
              initializeApp(yonatan_song.rate, yonatan_song.notes, yonatan_song.note_to_color);
            }
}

    welcomeText.onClick = function(event) {
        paper.project.activeLayer.removeChildren();
        showSongList();
    }

}


const main = () => {

  var background = new Path.Rectangle(view.bounds);
  background.fillColor = "#fff";

  showHomePage();

  onFrame = (event) => {
    if (app)
      app.handleNewFrame(event);
  };

  onKeyDown = (event) => {
    if (app)
      app.handleKeyDown(event);
  };
};

main();
