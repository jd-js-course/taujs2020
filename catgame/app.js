////comment
class Cat {

    mood = 0
    stage = 0
    organs = {
        legs: -0.5,
        back: 0.90,
        belly: -0.3,
        tail: -0.7,
        head: 0.8
    }

    graphics = {
        stage0: {
            image: '',
            map: ''
        }
    }

    render() {

        if (this.mood > 1) {

        }
    }

    stroke(event) {
        //check what organ was clicked
        const clickedOrgan = ''
        const moodChange = this.organs[clickedOrgan]

        this.mood += moodChange / 5

        render()
    }
}

const julio = new Cat()

const main = () => {



    stage0()
}

const stage0 = () => {
    julio.stage = 0;
    julio.render()
}
// standing
const stage1 = () => {

}
// sitting 1
const stage2 = () => {

}

// sitting 2
const stage3 = () => {

}

// on back
const stage4 = () => {

}


window.addEventListener('load', main)