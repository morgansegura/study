var express = require("express");
var app = express();


app.get("/", function(req, res){
    res.render("home.ejs");
});

app.get("/love/:word", function(req, res){
    var word = req.params.word
    res.render("love.ejs", {word: word});
});

app.listen(8080, function(){
   console.log("Server listening on: 8080"); 
});

