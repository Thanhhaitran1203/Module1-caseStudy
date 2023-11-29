const canvas = document.getElementById("canvas");
const ctx = canvas.getContext('2d');
class SnakePart{
    constructor(x, y) {
        this.x = x;
        this.y = y;
    }
}

let speed = 5;

const sound = new Audio("grup.mp3")
const tileCount = 20;
const tileSize = canvas.width / tileCount - 2;
let headY = 10;
let headX = 10;
let snakePart = [];
let tailLength = 1;

let score = 0;
let level = 1;
let highScore = [];

let xVel = 0;
let yVel = 0;

let appleX = 5;
let appleY = 5;
function drawGame(){
    changeSnakePosition();


    let result = isGameOver();
    if(result){
        setHighScore();
        getScore();
        return;
    }

    clearScreen();

    checkAppleCollision();
    drawLevel();
    drawScore();
    drawSnake();
    drawApple();
    setLevel();


    setTimeout(drawGame, 1000 / speed);
}

function getScore(){
    let  score = document.getElementById("highScore");
    let result = '';
    highScore.sort();
    highScore.reverse();
    for (const i in highScore) {
        result += `${highScore[i]}<br>`
    }
    score.innerHTML = result;
}

function setHighScore(){
    highScore.push(score);
}
function reset(){
    speed = 5;
    headY = 10;
    headX = 10;
    snakePart = [];
    tailLength = 1;

    score = 0;
    level = 1;

    xVel = 0;
    yVel = 0;

    appleX = 5;
    appleY = 5;
    getScore();
    drawGame();
}

function setLevel(){
    if(score >  50){
        speed = 7;
        level = 2;
    }
    if(score >  100){
        speed = 9;
        level = 3;
    }
}
function isGameOver(){
    let gameOver = false;

    if (yVel === 0 && xVel === 0){
        return false;
    }

    if (headX < 0){
        gameOver = true;
    }
    else if (headX === tileCount){
        gameOver = true;
    }
    else if (headY < 0){
        gameOver = true;
    }
    else if (headY == tileCount){
        gameOver = true;
    }
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        if(part.x === headX && part.y === headY){
            gameOver = true;
            break;
        }
    }

    if (gameOver){
        ctx.fillStyle = "while";
        ctx.font = "50px Verdana";

        let gradient = ctx.createLinearGradient(0, 0, canvas.width, 0);
        gradient.addColorStop("0", "magenta");
        gradient.addColorStop("0.5", "blue");
        gradient.addColorStop("1.0", "red");
        ctx.fillStyle = gradient;
        ctx.fillText("Bạn hơi non", canvas.width / 6, canvas.height / 2);
    }

    return gameOver;
}


function clearScreen(){
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function drawScore(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Score" + score,canvas.width - 50, 10);
}
function drawLevel(){
    ctx.fillStyle = "white";
    ctx.font = "10px Verdana";
    ctx.fillText("Level " + level,5, 10);
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
        score += 10;
        sound.play();
    }
    for (let i = 0; i < snakePart.length; i++) {
        let part = snakePart[i];
        if(part.x === appleX && part.y === appleY){
            appleY = Math.floor(Math.random() * tileCount);
            appleX = Math.floor(Math.random() * tileCount);
            tailLength++;
            score += 10;
            sound.play();
            break;
        }
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
        case 39 || 68:
            if(xVel === -1){
                break;
            }
            yVel = 0;
            xVel = 1;
            break;
        case 37 || 65:
            if(xVel === 1){
                break;
            }
            yVel = 0;
            xVel = -1;
            break;
        case 40 || 83:
            if(yVel === -1){
                break;
            }
            yVel = 1;
            xVel = 0;
            break
        case  87:
            if(yVel === 1){
                break;
            }
            yVel = -1;
            xVel = 0;
            break;
        case 68:
            if(xVel === -1){
                break;
            }
            yVel = 0;
            xVel = 1;
            break;
        case 65:
            if(xVel === 1){
                break;
            }
            yVel = 0;
            xVel = -1;
            break;
        case 83:
            if(yVel === -1){
                break;
            }
            yVel = 1;
            xVel = 0;
            break
    }
    }
