function randInt(min, max) {
    return Math.floor(Math.random() * (max - min) + min)
}

var music = document.querySelector('.backgroundmusic')
music.volume = 0.4

var dict = {}
var list = []

class Point {
    constructor(x, y) {
        this.x = x
        this.y = y
    }
}

var colors = [
    'white',
    'black',
    'red',
    'blue',
    'yellow'
]

class Rectangle {
    constructor(min, max) {
        this.min = min
        this.max = max
    }

    get width() {
        return this.max.x - this.min.x
    }

    get height() {
        return this.max.y - this.min.y
    }

    draw(ctx) {
        // Draw clockwise

        ctx.moveTo(this.min.x, this.min.y)
        ctx.lineTo(this.max.x, this.min.y)
        ctx.lineTo(this.max.x, this.max.y)
        ctx.lineTo(this.min.x, this.max.y)
        ctx.lineTo(this.min.x, this.min.y)
    }

    split(xPad, yPad, depth, limit, ctx) {
        ctx.fillStyle = colors[0]
        ctx.fillRect(this.min.x, this.min.y, this.max.x, this.max.y)
        dict['minX'] = this.min.x
        dict['minY'] = this.min.y
        dict['maxX'] = this.max.x
        dict['maxY'] = this.max.y
        dict['j'] = 0
        list.push(dict)
        dict = {}
        this.draw(ctx)

        // Check the level of recursion
        if (depth === limit) {
            return
        }

        // Check the rectangle is enough large and tall
        if (this.width < 2 * xPad || this.height < 2 * yPad) {
            return
        }

        // If the rectangle is wider than it's height do a left/right split
        var r1 = new Rectangle()
        var r2 = new Rectangle()
        if (this.width > this.height) {
            var x = randInt(this.min.x + xPad, this.max.x - xPad)
            r1 = new Rectangle(this.min, new Point(x, this.max.y))

            r2 = new Rectangle(new Point(x, this.min.y), this.max)

            // Else do a top/bottom split
        } else {
            var y = randInt(this.min.y + yPad, this.max.y - yPad)
            r1 = new Rectangle(this.min, new Point(this.max.x, y))

            r2 = new Rectangle(new Point(this.min.x, y), this.max)

        }
        // Split the sub-rectangles
        r1.split(xPad, yPad, depth + 1, limit, ctx)
        r2.split(xPad, yPad, depth + 1, limit, ctx)
    }
}

var canvas = document.getElementById('mondrian')
var ctx = canvas.getContext('2d')

ctx.beginPath()
ctx.lineWidth = 4

var xPad = Math.floor(canvas.width * 0.1)
var yPad = Math.floor(canvas.height * 0.1)

var initialRect = new Rectangle(new Point(0, 0), new Point(canvas.width, canvas.height))

initialRect.split(xPad, yPad, 0, 5, ctx)

ctx.stroke()

function fillPainting() {
    list = []

    ctx.clearRect(0, 0, canvas.width, canvas.height)
    ctx.beginPath()

    initialRect = new Rectangle(new Point(0, 0), new Point(canvas.width, canvas.height))

    initialRect.split(xPad, yPad, 0, 5, ctx)

    ctx.stroke()
}

function getCursorPosition(canvas, event) {
    let i
    let rect = canvas.getBoundingClientRect()
    let x = event.clientX - rect.left
    let y = event.clientY - rect.top

    for (i = list.length - 1; i >= 0; i--) {
        if ((x > list[i].minX) && (x < list[i].maxX) && (y > list[i].minY) && (y < list[i].maxY)) {
            let curClr = list[i].j
            // Get random color fill
            do {
                list[i].j = randInt(0, colors.length)
            } while (list[i].j === curClr)

            ctx.fillStyle = colors[list[i].j]
            // Fill in rectangle with color
            ctx.fillRect(list[i].minX + 2, list[i].minY + 2, (list[i].maxX - list[i].minX) - 4, (list[i].maxY - list[i].minY) - 4)


            break
        }

    }
}

canvas.addEventListener('mousedown', function (e) {
    getCursorPosition(canvas, e)

    document.querySelector('.shoowshaudio').currentTime = 0
    document.querySelector('.shoowshaudio').play()
})

function exportImage() {
    var fileName = "image"
    var link = document.createElement('a')
    link.download = fileName + '.jpeg'

    // Add watermark
    var canv = document.createElement('canvas')
    canv.height = 600
    canv.width = 800
    var canvCtx = canv.getContext('2d')

    // Copy old canvas
    canvCtx.drawImage(canvas, 0,0)

    // Write watermark text
    canvCtx.font = 'bold 25px sans-serif'
    canvCtx.fillText('THANK YOU', 575, 525)
    canvCtx.fillText('FOR PLAYING', 564, 555)
    canvCtx.strokeStyle = 'white'

    // Write watermark outline
    canvCtx.strokeText('THANK YOU', 575, 525)
    canvCtx.strokeText('FOR PLAYING', 564, 555)

    // Save image
    canv.toBlob(function(blob) {
        link.href = URL.createObjectURL(blob)
        link.click()
    });
}

function backgroundMusic() {
    var button = document.querySelector('.musicButton');
    if (music.paused == true) {
        button.innerText = 'Music off'
        music.play()
    } else {
        button.innerText = 'Music on'
        music.pause()
    }
}