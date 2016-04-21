var express = require("express");
var app = express();


app.get("/", function(req, res) {
    res.send("Hi there!"); 
});


app.get("/bye", function(req, res){
   res.send("Goodbye."); 
});


app.get("/dog", function(req, res){
    res.send("MEOW!!!");
});

// subdirectories
app.get('/r/:subdirectory', function(req, res){ 
    res.send("Welcome to a pattern of sub directory");
});


// comments
app.get('/r/:subdirectory/comments/:id/:title/', function(req, res){ 
    console.log(req);
    res.send("Welcome to a pattern of sub directory");
});

// 404
app.get("*", function(req, res){
   res.send("You're going the wrong way!!! <img src='../../assets/images/wrong-direction-1084249.png' />"); 
});

// Tell Express to listen for requests (start server)
/*
app.listen(process.env.PORT, process.env.IP, function(){
    console.log("Server listening on port: 8080");
});
*/
app.listen(8080, function(){
    console.log("Server listening on port: 8080");
});
