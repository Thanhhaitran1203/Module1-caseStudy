let canvas = document.getElementById("canvas");
let ctx = canvas.getContext('2d');
class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

let tileCount = 20;
let tileSize = canvas.width / tileCount - 2;
let headY = 10;
let headX = 10;
let xVel = 0;
let yVel = 0;
let snakePart = [];
let tailLength = 2;

let appleX = 5;
let appleY = 5;
function drawGame(){
    clearScreen();
    checkAppleCollision();
    drawSnake();
    drawApple();
    changeSnakePosition();
    setTimeout(drawGame, 1000 / speed);
}

function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function drawSnake(){

    ctx.fillStyle = 'green';
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        ctx.fillRect(part.x * tileCount, part.y * tileCount, tileSize, tileSize);
    }

    snakePart.push(new SnakePart(headX, headY));
    if (snakePart.length > tailLength){
        snakePart.shift();
    }

    ctx.fillStyle = 'orange';
    ctx.fillRect(headX * tileCount, headY * tileCount, tileSize, tileSize);

}

function drawApple(){
    ctx.fillStyle = 'red';
    ctx.fillRect(appleX  * tileCount, appleY  * tileCount, tileSize, tileSize);
}

function changeSnakePosition(){
    headY += yVel;
    headX += xVel;
}

function checkAppleCollision(){
    if (appleX === headX && appleY === headY){
        appleY = Math.floor(Math.random() * tileCount);
        appleX = Math.floor(Math.random() * tileCount);
        tailLength++;
    }
}

document.body.addEventListener('keydown',keyDown);
function keyDown(event){
    switch (event.keyCode){
        case 38:
            if(yVel === 1){
                break;
            }
             yVel = -1;
             xVel = 0;
             break;
        case 39:
            if(xVel === -1){
                break;
            }
            yVel = 0;
            xVel = 1;
            break;
        case 37:
            if(xVel === 1){
                break;
            }
            yVel = 0;
            xVel = -1;
            break;
        case 40:
            if(yVel === -1){
                break;
            }
            yVel = 1;
            xVel = 0;
            break;
    }

    }

drawGame();