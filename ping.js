'use strict'

let background = document.getElementById('game__canvas');
let ctx = background.getContext('2d');
let curplayer = 1;
let p1x = 10;
let p2x = 280;
let ballX = 145;
let ballY = 65;
let p1y = 55;
let p2y = 55;
let p1GoUp = false
let p1GoDown = false
let p2GoUp = false
let p2GoDown = false

function Hit() {
    if (p1x === ballX && p2y === ballY) {

    }
}
function clearCanvas() {
    ctx.clearRect(0, 0, background.width, background.height);
}
function p1up() {
    if (p1GoUp === true)
    {
        p1y -= 2; // Move p1 up
        clearCanvas(); // Clear the canvas
        drawRectangles(); // Redraw the rectangles
        console.log(p1y)
    }
}
function p1down() {
    if (p1GoDown === true)
    {
        p1y += 2; // Move p1 up
        clearCanvas(); // Clear the canvas
        drawRectangles(); // Redraw the rectangles
        console.log(p1y)
    }
}
function p2up() {
    if (p2GoUp === true)
    {
        p2y -= 2; // Move p1 up
        clearCanvas(); // Clear the canvas
        drawRectangles(); // Redraw the rectangles
        console.log(p2y)
    }
}
function p2down() {
    if (p2GoDown === true)
    {
        p2y += 2; // Move p1 up
        clearCanvas(); // Clear the canvas
        drawRectangles(); // Redraw the rectangles
        console.log(p2y)
    }
}

document.addEventListener("keydown", function(event) {
    if (event.key === 'w' && p1y > 0) {
        console.log('p1 moved up')
        p1GoUp = true
        p1up()
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === 's' && p1y < 120) {
        console.log('p1 moved down')
        p1GoDown = true
        p1down()
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowUp' && p2y > 0) {
        console.log('p2 moved up')
        p2GoUp = true
        p2up()
    }
})
document.addEventListener("keydown", function(event) {
    if (event.key === 'ArrowDown' && p2y < 120) {
        console.log('p2 moved down')
        p2GoDown = true
        p2down()
    }
})
document.addEventListener("keyup", function(event) {
    if (event.key === 'w' && p1y > 0) {
        console.log('p1 moved up')
        p1GoUp = true
    }
})
document.addEventListener("keyup", function(event) {
    if (event.key === 's' && p1y < 120) {
        console.log('p1 moved down')
        p1GoDown = true
    }
})
document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowUp' && p2y > 0) {
        console.log('p2 moved up')
        p2GoUp = true
    }
})
document.addEventListener("keyup", function(event) {
    if (event.key === 'ArrowDown' && p2y < 120) {
        console.log('p2 moved down')
        p2GoDown = true
    }
})
function drawRectangles() {
    ctx.fillStyle = 'aqua';
    ctx.fillRect(p1x, p1y, 10, 30);
    ctx.fillRect(p2x, p2y, 10, 30);
    ctx.fillRect(ballX, ballY, 10, 10);
    ctx.moveTo(150, 150);
    ctx.lineTo(150, 0);
    ctx.strokeStyle = 'aqua';
    ctx.stroke();
}
drawRectangles();