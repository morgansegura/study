var express = require("express");
var app = express();

// Declare public assets
app.use(express.static("public"));

// Declare EJS for ease of use
app.set("view engine", "ejs");

// Home page
app.get("/", function(req, res){
    res.render("home");
});

// Subcategory
app.get("/love/:word", function(req, res){
    var word = req.params.word
    res.render("love", {word: word});
});

// Posts page
app.get("/posts", function(req, res) {
   var posts = [
       {title: "Hallogram Electric", author: "Suzy B."},
       {title: "Girls, Girls, Girls", author: "Biz M."},
       {title: "After Hour Tower", author: "Pepper P."},
       {title: "Random love bubble", author: "Roger W."},
       {title: "On any other day", author: "Aaron O."},
   ]; 
    
    res.render("posts", {posts: posts});
    
});

app.listen(8080, function(){
   console.log("Server listening on: 8080"); 
});

