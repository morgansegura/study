var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo");

// POST - title, content
// Post schema
var postSchema = new mongoose.Schema({
    title: String,
    content: String,
    
});

var Post = mongoose.model("Post", postSchema);
// USER - email, name
// User Schema
var userSchema = new mongoose.Schema({
    email: String,
    name: String,
    posts: [postSchema]
    
});

var User = mongoose.model("User", userSchema);


var newUser = new User({
    email: "purple@gmail.com",
    name: "Lucy Brown"
    
});

newUser.posts.push({
    title: "Polly pattworks Pimpin",
    content: "The post of the century is coming"
});

newUser.save(function(err, user){
    if(err){
        console.log(err);
    } else {
        console.log(user);
    }
});


User.findOne({name: "Lucy Brown"})




var newPost = new Post({
    title: "Reflections on Apples",
    content: "They are delicious"
});

newPost.save(function(err, post){
    if(err){
        consol.log(err);
    } else {
        console.log(post);
    }
})