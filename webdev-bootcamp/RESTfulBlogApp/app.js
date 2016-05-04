var bodyParser  = require("body-parser")
mongoose        = require("mongoose"),
express         = require("express"),
app             = express();

// setup a DB
mongoose.connect("mongodb://localhost/restful_blog_app");
// setup EJS templates
app.set("view engine", "ejs");
// Define assets path
app.use(express.static("public"));
// Extend body-parser for GET/Send requests
app.use(bodyParser.urlencoded({extended: true}));

// Define a mongoose schema for the blog
var blogSchema = new mongoose.Schema({
    title: String,
    image: String,
    body: String,
    created: {type: Date, default: Date.now}
});
// Mongoose model config
var Blog = mongoose.model("Blog", blogSchema);

// RESTful Routes
app.get("/", function(req, res){
    res.redirect("/blogs");
});

app.get("/blogs", function(req, res){
    Blog.find({}, function(err, blogs){
       if(err) {
           console.log("Error");
       } else {
           res.render("index", {blogs: blogs});
       }
    });
});

// New route
app.get("/blogs/new", function(req, res){
    res.render("new");    
});
// Create Route
app.post("/blogs", function(req, res){
   // create blog 
    Blog.create(req.body.blog, function(err, newBlog){
        if(err){
            res.render("new");
        } else {
            res.redirect("/blogs");
        }
    });
});
// Open Server at port 8080
// var port = process.env.PORT, process.env.IP; // production port
var port = 8080; // develop port

app.listen(port, function(){
    console.log("sever opened at port: " + port);
});
