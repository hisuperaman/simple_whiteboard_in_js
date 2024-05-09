const canvas = document.getElementById('myCanvas');
const container = document.getElementById('container');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

let mouseCoordinates = { x: 0, y: 0 };
let drawCoordinates = [];

let isDrawing = false;

let penSize = canvas.height * (2/100);


function gameLoop() {
    // update
    ctx.fillStyle = "white"
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // draw
    ctx.fillStyle = "blue";
    ctx.beginPath();
    ctx.arc(mouseCoordinates.x, mouseCoordinates.y, penSize, 0, Math.PI * 2);
    ctx.fill();

    drawCoordinates.map((coordinate, index) => {
        ctx.beginPath();
        ctx.arc(coordinate.x, coordinate.y, penSize, 0, Math.PI * 2);
        ctx.fill();
    })


    requestAnimationFrame(gameLoop);
}



canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = e.clientX - rect.left;
    mouseCoordinates.y = e.clientY - rect.top;

    if (isDrawing) {
        drawCoordinates.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    }
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    drawCoordinates.push({ x: e.clientX - rect.left, y: e.clientY - rect.top });

    isDrawing = true;
});
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
});


canvas.addEventListener('touchmove', (e)=>{
    const touch = e.touches[0];
    
    const rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = e.clientX - rect.left;
    mouseCoordinates.y = e.clientY - rect.top;

    if (isDrawing) {
        drawCoordinates.push({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });
    }
});

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];

    const rect = canvas.getBoundingClientRect();
    drawCoordinates.push({ x: touch.clientX - rect.left, y: touch.clientY - rect.top });

    isDrawing = true;
});
canvas.addEventListener('touchend', (e) => {
    isDrawing = false;
});


gameLoop()