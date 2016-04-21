"use strict";

/*********************
 ***** Todo list *****
 *********************/

// Check off Specific Todos by clicking
$("ul").on("click", "li", function(){
    $(this).toggleClass("completed");
   
});

// Click on X to delete To-Do
$("ul").on("click", "span", function( e ){
    // fadeout then remove this todo item 
    $(this).parent().fadeOut(500, function(){
        $(this).remove();
    });
    // stop propagation
    e.stopPropagation();
});

// add services for input field
$("input[type='text']").keypress(function( e ){
        // if the user hits enter
       if( e.which === 13 ) {
           // get input value
           var toDoItem = $(this).val();
           $(this).val("");
           // create a new li and add to ul
           $("ul").append("<li><span><i class='fa fa-trash'></i></span>" + toDoItem + "</li>");
       }
});


$(".fa-plus").click(function(){
    // switch the icon on click toggle
    $(this).toggleClass("fa-minus");
    $("input[type='text']").fadeToggle("fast");
});