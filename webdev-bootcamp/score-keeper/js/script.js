// Score Keeper

var p1Button = document.querySelector("#p1"),
    p2Button = document.querySelector("#p2"),
    p1Display = document.querySelector("#p1Display"),
    p2Display = document.querySelector("#p2Display"),    
    resetScore = document.querySelector("#reset"),
    numInput = document.querySelector("input"),
    winningScoreDisplay = document.querySelector("p span"),
    p1Score = 0,
    p2Score = 0,
    gameOver = false,
    winningScore = 5;

// Add an event listener
p1Button.addEventListener("click",function(){
    // The winning score hasn't been reached
    if( !gameOver ) {
        // increase the score
        p1Score++;
        // When the winning score is reached
        if( p1Score === winningScore ) {
            gameOver = true;
            p1Display.classList.add("green-text");
        }
        // Display the score count
        p1Display.textContent = p1Score;
    }        
});

// Player two score count
p2Button.addEventListener("click",function(){
    // The winning score hasn't been reached
    if( !gameOver ) {
        // increase the score
        p2Score++;
        // When the winning score is reached
        if( p2Score === winningScore ) {
            gameOver = true;
            p2Display.classList.add("green-text");
        }
        // Display the score count
        p2Display.textContent = p2Score;
    }        
});

resetScore.addEventListener("click", function(){
    reset();
});

numInput.addEventListener("change",function(){
    winningScoreDisplay.textContent = this.value;
    winningScore = Number(this.value);
    reset();

});

function reset(){
    p1Score = 0;
    p2Score = 0;
    p1Display.textContent = 0;
    p2Display.textContent = 0;
    p1Display.classList.remove("green-text");
    p2Display.classList.remove("green-text");
    gameOver = false;
}