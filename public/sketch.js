let socket
let color = '#FFF'
let strokeWidth = 4

function setup() {
    const cv = createCanvas(800, 600)
    cv.position(600, 100)
    cv.background(0)

    // Start the socket connection
    socket = io.connect('http://localhost:3000')

    // Callback function
    socket.on('mouse', data => {
        console.log('Got: ' + data.x + ' ' + data.y)
        stroke(data.color)
        line(data.x, data.y, data.px, data.py)
    })

    const color_picker = select('#pickcolor')
    const color_btn = select('#color-btn')
    const color_holder = select('#color-holder')

    const stroke_width_picker = select('#stroke-width-picker')
    const stroke_btn = select('#stroke-btn')

    color_btn.mousePressed(event => {
        color = color_picker.value()
        color_holder.style('background-color', color)
    })

    stroke_btn.mousePressed(event => {
        strokeWidth = parseInt(stroke_width_picker.value())
    })
}

function draw() {}

function mouseDragged() {
    // Draw
    stroke(color)
    strokeWeight(strokeWidth);
    line(mouseX, mouseY, pmouseX, pmouseY)

    // Send the mouse coordinates
    sendmouse(mouseX, mouseY, pmouseX, pmouseY)
}

// Sending data to the socket
function sendmouse(x, y, pX, pY) {
    const data = {
        x: x,
        y: y,
        px: pX,
        py: pY,
        color: color
    }

    socket.emit('mouse', data)
}