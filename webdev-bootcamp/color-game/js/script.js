// Color Game

var numSquares = 6,
    colors = generateRandomColors(numSquares),
    squares = document.querySelectorAll(".square"),
    pickedColor = pickColor(),
    colorDisplay = document.getElementById("colorDisplay"),
    messageDisplay = document.querySelector("#message"),
    h1 = document.querySelector("h1"),
    resetButton = document.querySelector("#reset"),
    easyBtn = document.querySelector("#easyBtn"),
    hardBtn = document.querySelector("#hardBtn");


easyBtn.addEventListener("click", function(){
    easyBtn.classList.add("selected");
    hardBtn.classList.remove("selected");
    numSquares = 3;
    colors = generateRandomColors(numSquares;
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        if( colors[i] ){
            squares[i].style.background = colors[i];
        } else {
            squares[i].style.display = "none";
        }
    }
});

hardBtn.addEventListener("click", function(){
    hardBtn.classList.add("selected");
    easyBtn.classList.remove("selected");
    numSquares = 6;
    colors = generateRandomColors(numSquares;
    pickedColor = pickColor();
    colorDisplay.textContent = pickedColor;
    for(var i = 0; i < squares.length; i++){
        squares[i].style.background = colors[i];
        squares[i].style.display = "block";
    }    
});


resetButton.addEventListener("click", function(){
    // generate all new colors
    colors = generateRandomColors(6);
    
    // pick a new random color from array
    pickedColor = pickColor();
    
    // change color display to match picked color
    colorDisplay.textContent = pickedColor;
    
    // change colors of squares
    for( var i =0; i < squares.length; i++) {
        squares[i].style.background = colors[i];   
    }
    h1.style.background = "#232323";
    resetButton.textContent = "New Colors";
});


    colorDisplay.textContent = pickedColor;

for( var i = 0; i < squares.length; i++){
    // Add initial colors to squares
    squares[i].style.background = colors[i];

    // Add click listeners to squares
    squares[i].addEventListener("click", function(){
       // grab color of clicked square
        var clickedColor = this.style.background;
        
        //compare color to picked color
        if( clickedColor === pickedColor ){            
            messageDisplay.textContent = "Correct!";            
            resetButton.textContent = "Play Again?";
            changeColors(clickedColor);
            h1.style.background = clickedColor;
        } else {
            this.style.background = "#232323";            
            messageDisplay.textContent = "Try Again.";
        }
    });
}

function changeColors(color){
    // loop through all squares
    for( var i = 0; i < squares.length; i++) {
       // change each color to match given color
        squares[i].style.background = color;    
    }    
}

function pickColor() {
    // pick a random number
    var random = Math.floor(Math.random() * colors.length);
    return colors[random];
}

function generateRandomColors(num) {
    // make an array
    var arr = [];
    
    // add num random colors to array
    for( var i =0; i < num; i++) {
        // get random color and push into array
        arr.push(randomColor());
    }
    
    // return that array
    return arr;
}

function randomColor(){
    // pick a red from 0 - 255
    var r = Math.floor(Math.random() * 256);
    
    // pick a green from 0 - 255
    var g = Math.floor(Math.random() * 256);
    
    // pick a blue from 0 - 255
    var b = Math.floor(Math.random() * 256);
    
    return "rgb(" + r + ", " + g + ", " + b + ")";
}