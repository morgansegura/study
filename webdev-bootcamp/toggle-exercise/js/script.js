// Toggle background

var button = document.querySelector("button"),
    isPurple = false;

// Add an event listener
button.addEventListener("click", function(){
    document.body.classList.toggle("purple");
});
    /*
// function to toggle background
function toggleBackground(){

    if( isPurple ){
        document.body.style.background = "transparent";    
    } else {
        document.body.style.background = "purple";                
    }
    // Switch boolean
    isPurple = !isPurple;

   
}
    */