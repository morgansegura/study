
var ballX = 75;
var ballY = 75;
var ballSpeedX = 5;
var ballSpeedY = 7;

const PADDLE_WIDTH = 100;
const PADDLE_THICKNESS = 10;
const PADDLE_DIST_FROM_EDGE = 60;
var paddleX = 400;


var canvas, canvasContext;

function updateMousePos(evt) {
    var rect = canvas.getBoundingClientRect();
    var root = document.documentElement;

    var mouseX = evt.clientX - rect.left - root.scrollLeft;
    // var mouseY = evt.clientY - rect.top - root.scrollTop;

    paddleX = mouseX - PADDLE_WIDTH/2;
}

window.onload = function(){
    canvas = document.getElementById('gameCanvas');
    canvasContext = canvas.getContext('2d');

    var framesPerSecond = 30;
    setInterval(updateAll, 1000/framesPerSecond);
    canvas.addEventListener('mousemove', updateMousePos)
};

function updateAll() {
    moveAll();
    drawAll();
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function moveAll() {
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    if( ballX < 0 ) { // left
        ballSpeedX *= -1;
    }

    if( ballX > canvas.width ) { //right
        ballSpeedX *= -1;
    }
    if( ballY < 0 ) { // top
        ballSpeedY *= -1;
    }

    if( ballY > canvas.height ) { // bottom
        ballReset();
        // ballSpeedY *= -1;
    }
}
function drawAll() {

    colorRect(0,0, canvas.width,canvas.height, 'black'); // clear screen
    colorCircle(ballX,ballY, 10, 'white'); // draw ball

    colorRect(paddleX, canvas.height-PADDLE_DIST_FROM_EDGE, PADDLE_WIDTH, PADDLE_THICKNESS)

}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}
function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, radius,0,Math.PI*2, true);
    canvasContext.fill();
}
