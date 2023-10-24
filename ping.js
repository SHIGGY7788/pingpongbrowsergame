'use strict';


let background = document.getElementById('game__canvas');
let ctx = background.getContext('2d');
let curPlayer = 1;
let p1x = 10;
let p2x = 280;
let ballX = 150; // Adjusted initial ball position
let ballY = 75;  // Adjusted initial ball position
let p1y = 45;    // Adjusted initial player 1 position
let p2y = 45;    // Adjusted initial player 2 position
let p1GoUp = false;
let p1GoDown = false;
let p2GoUp = false;
let p2GoDown = false;
let startButton = document.getElementById('start');
let canMove = false;

class Player {
    constructor({
                    position = { x: 0, y: 0 },
                    color = 'aqua',
                    width = 10,
                    height = 10,
                    velocity = { x: 0, y: 0 },
                }) {
        this.position = position;
        this.width = width;
        this.height = height;
        this.color = color;
        this.velocity = velocity;
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
});

const ball = new Player({
    position: { x: ballX, y: ballY },
    color: 'red',
    velocity: {
        x: -2,
        y: -2,
    },
    width: 7,
    height: 7,
    
})

function collision({ p1, p2, ball }) {
    return (
        p1.position.x + p1.width >= ball.position.x &&
        p2.position.x <= ball.position.x + ball.width &&
        p1.position.y + p1.height >= ball.position.y &&
        p2.position.y <= ball.position.y + ball.height
    );
}

function StartGame() {
    startButton.style.visibility = 'hidden';
    canMove = true;
    console.log(p1x + ', ' + p1y);
    console.log(p2x + ', ' + p2y);
    updateGame();

}

function moveBallX() {
    ballX -= 2
    ballY += ball.velocity.y;


    if (ballY < 0 || ballY + ball.height > background.height) {
        ball.velocity.y = -ball.velocity.y;
    }


    if (collision({ p1, p2, ball })) {
        ball.velocity.x = -(Math.abs(ball.velocity.x))
    }


    if (ballX < 0 || ballX > background.width) {

    }


    requestAnimationFrame(moveBallX);
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
    ball.draw();
    moveBallX();
    requestAnimationFrame(updateGame);
}
p1.draw();
p2.draw();
ball.draw();
