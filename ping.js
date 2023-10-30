'use strict';


let background = document.getElementById('game__canvas')
let ctx = background.getContext('2d')
let curPlayer = 1
let p1x = 10
let p2x = 280
let ballX = 150
let ballY = 75
let p1y = 45
let p2y = 45
let p1GoUp = false
let p1GoDown = false
let p2GoUp = false
let p2GoDown = false
let startButton = document.getElementById('start')
let canMove = false
let prevBallX = ballX
let prevBallY = ballY
class Player {
    constructor({
                    position = { x: 0, y: 0 },
                    color = 'aqua',
                    width = 10,
                    height = 10,
                    velocity = { x: 0, y: 0 },
                }) {
        this.position = position
        this.width = width
        this.height = height
        this.color = color
        this.velocity = velocity
    }

    draw() {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.position.x, this.position.y, this.width, this.height);
    }
}

const p1 = new Player({
    position: { x: p1x, y: p1y },
    color: 'aqua',
    height: 30
});

const p2 = new Player({
    position: { x: p2x, y: p2y },
    color: 'aqua',
    height: 30
})

const ball = new Player({
    position: { x: ballX, y: ballY },
    color: 'red',
    velocity: {
        x: 0.8,
        y: 0.8,
    },
    width: 7,
    height: 7,
    
})

function collision(player, ball) {
    return (
        player.position.x < ball.position.x + ball.width &&
        player.position.x + player.width > ball.position.x &&
        player.position.y < ball.position.y + ball.height &&
        player.position.y + player.height > ball.position.y
    );
}

function StartGame() {
    startButton.style.visibility = 'hidden';
    canMove = true;
    console.log('Player1 Cords: ' + p1x + ', ' + p1y);
    console.log('Player2 Cords: ' + p2x + ', ' + p2y);
    drawLine()
    updateGame();
    moveBall()

}

function moveBall() {
    if (ballY < 0 || ballY + ball.height > background.height) {
        if (ballY < 0) {
            ball.velocity.y = Math.abs(ball.velocity.y);
            ballY = 0
        }
        if (ballY + ball.height > background.height) {
            ball.velocity.y = -Math.abs(ball.velocity.y)
            ballY = background.height - ball.height - 1
        }
    }

    if (collision(p1, ball) && curPlayer === 1) {
        console.log('collision')
        ball.velocity.x = -Math.abs(ball.velocity.x)
        curPlayer = 2
        console.log("curPlayer: 2")
    }

    if (collision(p2, ball) && curPlayer === 2) {
        console.log('collision')
        ball.velocity.x = Math.abs(ball.velocity.x)
        curPlayer = 1
        console.log("curPlayer: 1")
    }


    if (ballX < 0 || ballX + ball.width > background.width) {
        if (ballX < 0) {
            ball.velocity.x = -Math.abs(ball.velocity.x)
            ballX = 0
        }
        if (ballX + ball.width > background.width) {
            ball.velocity.x = Math.abs(ball.velocity.x)
            ballX = background.width - ball.width - 1
        }
    }
    prevBallX = ballX
    prevBallY = ballY
    ballX -= ball.velocity.x
    ballY += ball.velocity.y
    ctx.fillStyle = ball.color
    ctx.fillRect(ballX, ballY, ball.width, ball.height)
    requestAnimationFrame(moveBall)
}

function clearCanvas() {
    ctx.clearRect(0, 0, background.width, background.height);
}

function p1up() {
    if (p1.position.y > 0 && canMove === true) {
        p1.position.y -= 2;
    }
}

function p1down() {
    if (p1.position.y + p1.height < background.height && canMove === true) {
        p1.position.y += 2;
    }
}

function p2up() {
    if (p2.position.y > 0 && canMove === true) {
        p2.position.y -= 2;
    }
}

function p2down() {
    if (p2.position.y + p2.height < background.height && canMove === true) {
        p2.position.y += 2;
    }
}

document.addEventListener('keydown', function (event) {
    if (event.key === 'w') {
        p1GoUp = true;
    } else if (event.key === 's') {
        p1GoDown = true;
    } else if (event.key === 'ArrowUp') {
        p2GoUp = true;
    } else if (event.key === 'ArrowDown') {
        p2GoDown = true;
    }
});

document.addEventListener('keyup', function (event) {
    if (event.key === 'w') {
        p1GoUp = false;
    } else if (event.key === 's') {
        p1GoDown = false;
    } else if (event.key === 'ArrowUp') {
        p2GoUp = false;
    } else if (event.key === 'ArrowDown') {
        p2GoDown = false;
    }
});

function updateGame() {
    clearCanvas();
    if (p1GoUp) {
        p1up();
    }
    if (p1GoDown) {
        p1down();
    }
    if (p2GoUp) {
        p2up();
    }
    if (p2GoDown) {
        p2down();
    }


    p1.draw();
    p2.draw();

    if (canMove) {
        requestAnimationFrame(updateGame);
    }
}

let lineCanvas = document.getElementById('line__canvas');
let lineCtx = lineCanvas.getContext('2d');
let drawing = false;

// Function to start drawing
function StartDrawing() {
    drawing = true;
    drawLine(); // Start drawing the line
}

// Function to stop drawing
function StopDrawing() {
    drawing = false;
}

// Function to draw the line following the ball
function drawLine() {
    if (drawing) {
        lineCtx.strokeStyle = 'blue';
        lineCtx.lineWidth = 2;
        lineCtx.beginPath();
        lineCtx.moveTo(prevBallX + ball.width / 2, prevBallY + ball.height / 2);
        lineCtx.lineTo(ballX + ball.width / 2, ballY + ball.height / 2);
        lineCtx.stroke();
        requestAnimationFrame(drawLine);
    }
}