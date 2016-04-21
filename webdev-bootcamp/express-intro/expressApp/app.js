var express = require("express");
var app = express();

// home
app.get("/", function(req, res){
    res.send("Welcome Home!");
});

// Animal & sounds
app.get("/speak/:animal", function(req, res){
    var sounds = {
        pig: "Oink",
        cow: "Moo",
        dog: "Woof",
        fish: "..."
    }
    var animal = req.params.animal.toLowerCase();
    var sound = sounds[animal];
 
    res.send("The " + animal + " says '" + sound + "'");
});


// Repeat greeting
app.get("/repeat/:message/:times/", function(req, res){
    var message = req.params.message;
    var times = Number(req.params.times);
    var result = "";
 
    for( var i = 0; i < times; i++) {
      result += message + ", " ;
    }
    // Send the response
    res.send(result);   
});

// Error page
app.get("*", function(req, res){
    res.send("Sorry, page not found. What are you doing with your life?!!!");
});

// Start the server
app.listen(8080, function(){
    console.log("Listening on port: " + 8080);
});