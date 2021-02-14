////comment
class Cat {

    mood = 'stand'
    preferences = {
        //defining our cat's mood - where he likes being petted. we need to make this part randomised for each new game sesion.
        legs: false,
        back: true,
        belly: false,
        tail: false,
        head: true
        // suggestion for mood random generator. each game will have completetly different mood
        // if(math.random() < 0.5 ) {
        //  legs: false}
        // else {legs: true}
        // if(math.random() < 0.5 ) {
        //  back: false}
        // else {back: true}
        // if(math.random() < 0.5 ) {
        //  belly: false}
        // else {belly: true}
        // if(math.random() < 0.5 ) {
        //  tail: false}
        // else {tail: true}
        // if(math.random() < 0.5 ) {
        //  head: false}
        // else {head: true}
        //  do this for each property of the cats behaviour
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


    stroke(bodypart) {
        //check what organ was clicked
        //const clickedOrgan = ''
        //const moodChange = this.organs[clickedOrgan]
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
            }
        } else {
            switch (this.mood) {
                case 'stand':
                    this.mood = 'stand_upset'
                    break;
                case 'stand_upset':
                    this.mood = 'scratch1'
                    break;
                case 'sit':
                    this.mood = 'sit_upset'
                    break;
                case 'sit_upset':
                    this.mood = 'scratch2'
                    break;
                case 'restive':
                    this.mood = 'restive_upset'
                    break;
                case 'restive_upset':
                    this.mood = 'scratch1'
                    break;
                case 'lie':
                    this.mood = 'lies_upset'
                    break
                case 'lies_upset':
                    this.mood = 'scratch2'
                    break

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
        var mapElement = document.getElementById('julio-map');

        var mapImg = new Image()
        let cat = this
        mapImg.onload = function () {
            let context = mapElement.getContext('2d')
            context.canvas.width = catElement.width
            context.canvas.height = catElement.height
            context.drawImage(mapImg, 0, 0, catElement.width, catElement.height)

            if (!cat.clickEventAdded) {
                catElement.addEventListener('click', (event) => {
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

                cat.clickEventAdded = true
            }
        }

        catElement.onload = function () {
            mapImg.src = map
        }

        catElement.src = image
    }

}

const hearts = () =>{
//in_love   //importing heart image for the cat in_love mood animation
//     const heart = image 'heart.png' ({

// }) 

}





const julio = new Cat() //starting the game - a cat appears on screen

const main = () => {

    julio.render()
}



window.addEventListener('load', main)