let socket;

function setup() {
    createCanvas(400, 400);
    background(0);

    // Start the socket connection
    socket = io.connect('http://localhost:3000');

    // Callback function
    socket.on('mouse', (data) => {
        console.log("Got: " + data.x + " " + data.y);
        fill(0, 0, 255);
        noStroke();
        ellipse(data.x, data.y, 20, 20);
    });
}

function draw() {}

function mouseDragged() {
    // Draw
    fill(255);
    noStroke();
    ellipse(mouseX, mouseY, 20, 20);

    // Send the mouse coordinates
    sendmouse(mouseX, mouseY);
}

// Sending data to the socket
function sendmouse(x, y) {
    const data = {
        x: x,
        y: y
    };

    socket.emit('mouse', data);
}