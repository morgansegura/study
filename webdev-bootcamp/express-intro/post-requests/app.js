var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended: true}))

app.set("view engine", "ejs");

var friends = ["Pearla","Tim","Mark","Jordan","Vicente","Travis"];

// home route
app.get("/", function(req, res){
    res.render("home");
});

app.post("/addfriend", function(req, res){
    var newFriend = req.body.newfriend;
    friends.push(newFriend);
    res.redirect("/friends");
});

// Friends route
app.get("/friends", function(req, res){
    res.render("friends", {friends: friends});
});

// Open Server at port
// var port = process.env.PORT, process.env.IP; // production port
var port = 8080; // develop port

app.listen(port, function(){
    console.log("sever opened at port: " + port);
});