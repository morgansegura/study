"use strict";

/**********************
 ***** Code Along *****
 **********************/

// create a key for knowing which keys are selectable

var keys = Object.keys(keyData);


$(keys).each( function(e){
    $("#keyList").append("<li>" + "<span class='alpha'>" + $(this).selector + "</span> " + "</li>"); 
    keySelector();
});

function keySelector(){
    for( var i = 0; i < keys.length; i++ ){
        if(keys[i].selector === keyStroke() ){
            console.log( keys[i].selector, keyStroke() );   
       };
    }
    //return selectorKey;
}
function keyStroke() {
    $(document).keypress(function( e ) {
        var k = String.fromCharCode(e.which) // or e.keyCode
        return k;
    });
}
// Let the user choos background color varieties


// let the user add thir name

// let the user record their songs

// let the user download/review their soungs
