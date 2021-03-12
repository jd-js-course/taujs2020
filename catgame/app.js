////////////////////////Menu part start/////////////////////////////////////////

function hide(id) { //Hiding elements by id
    document.getElementById(id).className = "hidden";
}

function show(id) { //Showing elements by id
    document.getElementById(id).className = "";
}

function gameMenu(id) { //decides what screen is displayed
    switch (id) {
        case 1:
            show("splashscreen");
            hide("start");
            hide("game");
            hide("gameOver");
            hide("julio");
            hide("win");
            break;
        case 2:
            show("start");
            hide("game");
            hide("gameOver");
            hide("splashscreen");
            hide("julio");
            hide("win");
            set_hand("hand_point");
            in_game_music.play()
            gameover.stop()
            break;
        case 3:
            in_game_music.stop()
            open_theme.play()

            show("game");
            show("julio");
            set_hand("hand_rest");
            hide("start");
            hide("gameOver");
            hide("splashscreen");
            hide("win");
            in_game_music.stop()
            julio.reset();
            break;
        case 4:
            open_theme.stop()
            gameover.play()
            set_hand("hand_side_scratch");
            show("gameOver");
            hide("julio");
            hide("start");
            hide("game");
            hide("win");
            hide("splashscreen");
            break;
        case 5:
            open_theme.stop()
            gameover.play()
            hide("gameOver");
            hide("julio");
            hide("start");
            hide("game");
            show("win");
            hide("splashscreen");
            break;

    }
}

//helper functions to set hide n' show menu screens
function splashscreen() {
    gameMenu(1);
}

function startscreen() {
    gameMenu(2);
}

function startThegame() {
    cutecat.play()
    gameMenu(3);
}

function gameOver() {
    gameMenu(4);
}

function gameWin() {
    console.log('win')
    gameMenu(5);
}

//accept clicks on images & manage sounds
const open_theme = new Howl({
    src: ['Catgame-open_theme_1.mp3'],
        html5: true,
        loop: true,
    });
const in_game_music = new Howl({
    src: ['Catgame-in_game_music.mp3'],
        html5: true,
        loop: true,
    });
const gameover = new Howl({
    src: ['Catgame-gameover.mp3'],
        html5: true,
        loop: false,
    });
const angrycat = new Howl({
    src: ['mad_cat.mp3'],
        html5: true,
        loop: false,
    });
const cutecat = new Howl({
    src: ['happy_cat.mpeg'],
        html5: true,
        loop: false,
    });
document.getElementById("playbutton").addEventListener("click", startscreen); //send to start screen
document.getElementById("startbutton").addEventListener("click", startThegame); //send to game screen
document.getElementById("gameover_playagain_lose").addEventListener("click", startscreen); //send to game screen
document.getElementById("gameover_playagain_win").addEventListener("click", startscreen); //send to game screen


//////////////////////Menu part end//////////////////////////////////////////////
////comment
//loading the PaperJS library
paper.install(window)
paper.setup('paper-js-canvas')
class Cat {
    mood = 'stand';
    poke_count = 0;
    preferences = {
        //defining our cat's mood - where he likes being petted. we need to make this part randomised for each new game sesion.
        //this function generates random number (0 to 1)for every 'if' function. 
        //The function than decides wether the argument is higher or lower than 0.5.
        //Upon detection the if functions will tag the body parts as true for liking and false for unliking
        legs: (Math.random() < 0.5),
        back: (Math.random() < 0.5),
        belly: (Math.random() < 0.5),
        tail: (Math.random() < 0.5),
        head: (Math.random() < 0.5)
    }

    graphics = {
        //here we define our cat's different poses - the various images we use in the game - and each matching color coded map.
        stand: {
            image: 'cat_stand1.png',
            map: 'cat_stand1_map.png',
            separate_tail: false
        },
        stand_upset: {
            image: 'cat_stand_upset.png',
            map: 'cat_stand_upset_map.png',
            separate_tail: true
        },
        sit: {
            image: 'cat_sit1.png',
            map: 'cat_sit1_map.png',
            separate_tail: false
        },
        sit_upset: {
            image: 'cat_sit_upset1.png',
            map: 'cat_sit_upset1_map.png',
            separate_tail: true
        },
        scratch1: {
            image: 'cat_scratch1.png',
            map: '',
            separate_tail: false
        },
        scratch2: {
            image: 'cat_scratch2.png',
            map: '',
            separate_tail: false
        },
        restive: {
            image: 'cat_restive2.png',
            map: 'cat_restive2_map.png',
            separate_tail: false
        },
        restive_upset: {
            image: 'cat_restive_upset.png',
            map: 'cat_restive_upset_map.png',
            separate_tail: true
        },
        lie: {
            image: 'cat_lies_down1.png',
            map: 'cat_lies_down1_map.png',
            separate_tail: false
        },
        lies_upset: {
            image: 'cat_lies_down_upset.png',
            map: 'cat_lies_down_upset_map.png',
            separate_tail: true
        },
        give_in: { // the give_in pose is to recieve a different preference setting: he is to automatically love anywhere he is petted, and to basicaly move on to the in_love pose automatically. 
            image: 'cat_lies_down3.png',
            map: '',
            separate_tail: false
        },
        in_love: { //added a new case, the in_love case which is meant to be the same as the give_in case but with hearts flying out his eyes animation.
            image: 'cat_lies_down3.png',
            map: '',
            separate_tail: false
        }
    }

    reset() {
        // we return the cat to the start position
        this.mood = 'stand';
        this.poke_count = 0;
        this.render();

        this.preferences = {
            // we change the cat's preferences for the next game
            legs: (Math.random() < 0.5),
            back: (Math.random() < 0.5),
            belly: (Math.random() < 0.5),
            tail: (Math.random() < 0.5),
            head: (Math.random() < 0.5)
        }
    }

    stroke(bodypart) {
        //check what organ was clicked
        //const clickedOrgan = ''
        //const moodChange = this.organs[clickedOrgan]
        if (this.currentAnimation) clearInterval(this.currentAnimation)
        paper.project.activeLayer.removeChildren()

        if (this.mood == 'scratch1' || this.mood == 'scratch2') gameOver();

        // we check in this.preferences and we check what's the current this.mood, and we change this.mood to a new value
        if (this.preferences[bodypart] == true) {
            switch (this.mood) {
                case 'stand':
                    this.mood = 'sit'
                    break;
                case 'sit':
                    this.mood = 'restive'
                    break;
                case 'restive':
                    this.mood = 'lie'
                    break;
                case 'lie':
                    this.mood = 'give_in'
                    break;
                case 'give_in': //added a new case, the in_love case which is meant to be the same as the give_in case but with hearts flying out his eyes animation.
                    this.mood = 'in_love'
                    hearts()
                    break;
                case 'stand_upset':
                    this.mood = 'stand'
                    break;
                case 'sit_upset':
                    this.mood = 'sit'
                    break;
                case 'restive_upset':
                    this.mood = 'restive'
                    break;
                case 'lies_upset':
                    this.mood = 'lie'
                    break;
                case 'in_love':
                    gameWin();
                    break;
            }
        } else {
            switch (this.mood) {
                case 'stand':
                    this.mood = 'stand_upset'
                    this.currentAnimation = tail_wag1()
                    break;
                case 'stand_upset':
                    this.mood = 'scratch1'
                    angrycat.play()
                    set_hand('hand_side_scratch')
                    break;
                case 'sit':
                    this.mood = 'sit_upset'
                    this.currentAnimation = tail_wag2()
                    break;
                case 'sit_upset':
                    this.mood = 'scratch2'
                    angrycat.play()
                    set_hand('hand_side_scratch')
                    break;
                case 'restive':
                    this.mood = 'restive_upset'
                    this.currentAnimation = tail_wag3()
                    break;
                case 'restive_upset':
                    this.mood = 'scratch1'
                    angrycat.play()
                    set_hand('hand_side_scratch')
                    break;
                case 'lie':
                    this.mood = 'lies_upset'
                    this.currentAnimation = tail_wag4()
                    break
                case 'lies_upset':
                    this.mood = 'scratch2'
                    angrycat.play()
                    set_hand('hand_side_scratch')
                    break
                case 'give_in': //added a new case, the in_love case which is meant to be the same as the give_in case but with hearts flying out his eyes animation.
                    this.mood = 'in_love'
                    hearts()
                    break;
                case 'in_love':
                    gameWin();
                    break;

            }
        }
        console.log('cat was stroked at ' + bodypart)
        console.log('new mood is ' + this.mood)

        this.render()
    }

    clickEventAdded = false //we use this to make sure the event was added just once, or else the game skips moods.

    render() {
        // here we get the right graphics acording to the currant cat's mood and display it, while also retrieving the correct color coded map of the cat's body.
        // all of the cats' upset moods are curantly without tails, as we need to add animation for tail-wagging.
        let map = this.graphics[this.mood].map
        let image = this.graphics[this.mood].image

        var catElement = document.getElementById('julio')
        catElement.ondragstart = function () { //this cancels the 'tiny ghost' that appears when trying to drag the cursor on the cat.
            return false;
        }
        var mapElement = document.getElementById('julio-map');

        var mapImg = new Image()
        let cat = this
        mapImg.onload = function () {
            let context = mapElement.getContext('2d')
            context.canvas.width = catElement.width
            context.canvas.height = catElement.height
            context.drawImage(mapImg, 0, 0, catElement.width, catElement.height)

            if (!cat.clickEventAdded) {
                catElement.addEventListener('mousedown', (event)=> {
                    cat.stroke_start_time = Date.now()
                })

                catElement.addEventListener('click', (event) => {
                    if (Date.now() - cat.stroke_start_time < 200) {
                        // only actual pets count! poking doesn't count!
                        cat.poke_count++;
                        //too much poking leads to angry cat!
                        if (cat.poke_count > 10){
                            cat.mood = 'scratch1'
                            set_hand('hand_side_scratch')
                            cat.render()
                        }
                        return;
                    }
                    let x = event.offsetX
                    let y = event.offsetY
                    switch (context.getImageData(x, y, 1, 1).data.toString()) {
                        case "255,0,0,255":
                            cat.stroke('legs')
                            break;
                        case "0,0,255,255":
                            cat.stroke('back')
                            break;
                        case "0,255,0,255":
                            cat.stroke('tail')
                            break;
                        case "255,0,255,255":
                            cat.stroke('head')
                            break;
                        case "0,255,255,255":
                            cat.stroke('neck')
                            break;
                        case "255,255,0,255":
                            cat.stroke('tummy')
                            break;
                    }
                })

                catElement.addEventListener('mousedown', () =>
                    set_hand('hand_pet2')
                )

                catElement.addEventListener('mouseup', () => 
                    set_hand('hand_rest')
                )

                cat.clickEventAdded = true
            }
        }

        catElement.onload = function () {
            mapImg.src = map
        }

        catElement.src = image
    }

}

const hearts = () => {
    // in_love   //importing heart image for the cat in_love mood, setting it properly in place and creating the animation.
    console.log('we are printing hearts')
    const heart = new Raster('heart')
    heart.position = [305, 573]
    heart.rotate(-92)
    heart.scale(0.05)

    const heart2 = new Raster('heart')
    heart2.position = [318, 633]
    heart2.rotate(-92)
    heart2.scale(0.05)

    let heartsExpanding = true
    let numberOfSizeChanges = 0
    setInterval(() => {
        if (numberOfSizeChanges > 5) {
            numberOfSizeChanges = 0
            heartsExpanding = !heartsExpanding
        }
        if (heartsExpanding) {
            heart.scale(1.1)
            heart2.scale(1.1)
        } else {
            heart.scale(0.91)
            heart2.scale(0.91)
        }
        numberOfSizeChanges++

    }, 100)
    // }) 

}

const tail_wag1 = () => {
    //stand_upset //importing tail image for the cat stand_upset mood, setting it properly in place and animating it.
    console.log('tail wagging')
    const tail1 = new Raster('tail1')
    tail1.position = [802, 189]
    var point = tail1.bounds.bottomLeft;

    let tailMovement = 2
    let totalTailMovement = 0
    return setInterval(() => {
        if (totalTailMovement > 20 || totalTailMovement < -10) {
            tailMovement = -tailMovement
        }
        tail1.rotate(tailMovement, point)
        totalTailMovement += tailMovement
    }, 100)

}

const tail_wag2 = () => {
    //sit_upset // importing tail image for the cat sit_upset mood, setting it properly in place and animating it.
    console.log('tail wagging')
    const tail2 = new Raster('tail2')
    tail2.position = [725, 655]
    var point = tail2.bounds.bottomLeft;

    let tailMovement = 2
    let totalTailMovement = 0
    return setInterval(() => {
        if (totalTailMovement > 0 || totalTailMovement < -20) {
            tailMovement = -tailMovement
        }
        tail2.rotate(tailMovement, point)
        totalTailMovement += tailMovement
    }, 100)

}

const tail_wag3 = () => {
    //restive_upset // importing tail image for the cat restive_upset mood, setting it properly in place and animating it.
    console.log('tail wagging')
    const tail3 = new Raster('tail3')
    tail3.position = [755, 310]
    var point = tail3.bounds.bottomLeft;

    let tailMovement = 2
    let totalTailMovement = 0
    return setInterval(() => {
        if (totalTailMovement > 10 || totalTailMovement < -20) {
            tailMovement = -tailMovement
        }
        tail3.rotate(tailMovement, point)
        totalTailMovement += tailMovement
    }, 100)

}

const tail_wag4 = () => {
    //lies_upset // importing tail image for the cat lies_upset mood, setting it properly in place and animating it.
    console.log('tail wagging')
    const tail4 = new Raster('tail4')
    tail4.position = [740, 302]
    var point = tail4.bounds.bottomRight;

    let tailMovement = 2
    let totalTailMovement = 0
    return setInterval(() => {
        if (totalTailMovement > 20 || totalTailMovement < -17) {
            tailMovement = -tailMovement
        }
        tail4.rotate(tailMovement, point)
        totalTailMovement += tailMovement
    }, 100)

}

const julio = new Cat() //starting the game - a cat appears on screen

const main = () => { //WHAT DOES THIS FUNCTION DO?
    julio.render()
}

window.addEventListener('load', main)
// embedding the hands graphics instead of the mouse cursor
var handElement = document.getElementById('hand');
window.addEventListener('mousemove', (event) => {
    handElement.style.left = event.pageX+'px'
    handElement.style.top = event.pageY+'px'
})
// switching between the deferent hand graphics - hand point, hand rest, hand pet, hand scratch. 
const set_hand = (hand) => {
    var handElement = document.getElementById('hand');
    handElement.src = hand + ".png"
}

splashscreen(); //starts the game at the splash screen
