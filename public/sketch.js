let socket;

function setup() {
    createCanvas(400, 400);
    background(0);

    // Start the socket connection
    socket = io.connect('http://localhost:3000');

    // Callback function
    socket.on('mouse', (data) => {
        console.log("Got: " + data.x + " " + data.y);
        stroke(0, 0, 255);
        line(data.x, data.y, data.px, data.py,)
    });
}

function draw() {}

function mouseDragged() {
    // Draw
    stroke(255);
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
        py: pY
    };

    socket.emit('mouse', data);
}