const canvas = document.getElementById('myCanvas');
const container = document.getElementById('container');
const canvasContainer = document.getElementById('canvas-container');
const canvasContainerRect = canvasContainer.getBoundingClientRect();
canvas.width = canvasContainerRect.width;
canvas.height = canvasContainerRect.height;
const ctx = canvas.getContext('2d');

let mouseCoordinates = { x: 0, y: 0 };
let drawCoordinates = [];

let isDrawing = false;

let penSize = document.getElementById('penSizeSlider').value;
let penColor = "blue";

let penShape = "circle";

const colorDivIds = ['red', 'green', 'blue', 'white', 'orange', 'black', 'violet', 'yellow', 'purple'];
const shapeDivIds = ['rect', 'circle'];




// util functions
function changePenColor(color) {
    document.getElementById(color).className = 'color selectedColor';

    colorDivIds.forEach((ele) => {
        if (ele != color) {
            if (ele == 'white') {
                document.getElementById(ele).className = 'color whiteColor';
            }
            else {
                document.getElementById(ele).className = 'color';
            }
        }
    })
    penColor = color;
}
function changePenShape(shape) {
    document.getElementById(shape).className = 'shape selectedShape';

    shapeDivIds.forEach((ele) => {
        if (ele != shape) {
            document.getElementById(ele).className = 'shape';

        }
    })
    penShape = shape;
}

function changePenSize(value) {
    penSize = value;
    console.log(value)
}


function toggleControlBar() {
    const controlBar = document.getElementById('controlBar');
    if (controlBar.style.display == 'none') {
        controlBar.style.display = 'block';
    }
    else {
        controlBar.style.display = 'none';
    }

    const rect = canvasContainer.getBoundingClientRect();
    canvas.width = rect.width;
    canvas.height = rect.height;
}



// canvas function
function gameLoop() {
    // update
    ctx.fillStyle = "white"
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // draw
    drawCoordinates.map((coordinate, index) => {

        ctx.fillStyle = coordinate.penColor;

        if (coordinate.penShape == 'circle') {
            ctx.beginPath();
            ctx.arc(coordinate.x, coordinate.y, coordinate.penSize, 0, Math.PI * 2);
            ctx.fill();
        }
        else if (coordinate.penShape == 'rect') {
            const rectSide = (Math.PI * coordinate.penSize) / 2;
            ctx.fillRect(coordinate.x, coordinate.y, rectSide, rectSide);
        }
    })

    ctx.fillStyle = penColor;

    if (penShape == 'circle') {
        ctx.beginPath();
        ctx.arc(mouseCoordinates.x, mouseCoordinates.y, penSize, 0, Math.PI * 2);
        ctx.fill();

        if (penColor == 'white') {
            ctx.strokeStyle = 'black';
            ctx.stroke();
        }
    }
    else if (penShape == 'rect') {
        const rectSide = (Math.PI * penSize) / 2;
        if (penColor == 'white') {
            ctx.strokeRect(mouseCoordinates.x, mouseCoordinates.y, rectSide, rectSide);
        }
        ctx.fillRect(mouseCoordinates.x, mouseCoordinates.y, rectSide, rectSide);

    }



    requestAnimationFrame(gameLoop);
}



canvas.addEventListener('mousemove', (e) => {
    const rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = e.clientX - rect.left;
    mouseCoordinates.y = e.clientY - rect.top;

    if (isDrawing) {
        drawCoordinates.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, penColor: penColor, penShape: penShape, penSize: penSize });
    }
});

canvas.addEventListener('mousedown', (e) => {
    const rect = canvas.getBoundingClientRect();
    drawCoordinates.push({ x: e.clientX - rect.left, y: e.clientY - rect.top, penColor: penColor, penShape: penShape, penSize: penSize });

    isDrawing = true;
});
canvas.addEventListener('mouseup', (e) => {
    isDrawing = false;
});


canvas.addEventListener('touchmove', (e) => {
    const touch = e.touches[0];

    const rect = canvas.getBoundingClientRect();
    mouseCoordinates.x = e.clientX - rect.left;
    mouseCoordinates.y = e.clientY - rect.top;

    if (isDrawing) {
        drawCoordinates.push({ x: touch.clientX - rect.left, y: touch.clientY - rect.top, penColor: penColor, penShape: penShape, penSize: penSize });
    }
});

canvas.addEventListener('touchstart', (e) => {
    const touch = e.touches[0];

    const rect = canvas.getBoundingClientRect();
    drawCoordinates.push({ x: touch.clientX - rect.left, y: touch.clientY - rect.top, penColor: penColor, penShape: penShape, penSize: penSize });

    isDrawing = true;
});
canvas.addEventListener('touchend', (e) => {
    isDrawing = false;
});


gameLoop()