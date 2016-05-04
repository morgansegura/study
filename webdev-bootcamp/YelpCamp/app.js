var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose");

mongoose.connect("mongodb://localhost/yelp_camp");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// Schema setup
var campgroundSchema = new mongoose.Schema({
    name: String,
    image: String,
    description: String
});

var Campground = mongoose.model("Campground", campgroundSchema);

// home route
app.get("/", function(req, res){
    res.render("home");
});

// Camprounds route
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){
           console.log(err);
       } else {
           res.render("index", {campgrounds: allCampgrounds});
       }
    });
});

// Camprounds POST route
app.post("/campgrounds", function(req, res){
    // get data back from form and add to campgrounds array
    var name = req.body.name;
    var image = req.body.image;
    var description = req.body.description;
    var newCampground = {name: name, image: image, description: description};
    // Create a new campground and save to db
    Campground.create(newCampground, function(err, newlyCreated){
        if(err) {
            console.log(err);
        } else {
            // redirect bck to campgrounds page    
            res.redirect("/campgrounds");            
        }
    });

});


// New Camprounds route
app.get("/campgrounds/new", function(req, res){
    res.render("new");

});


// Show details page
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the correct id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {
            console.log(err);
        } else {
            // Show the show page
            res.render("show", {campground: foundCampground});            
        }
    });


});

// Open Server at port
// var port = process.env.PORT, process.env.IP; // production port
var port = 8080; // develop port

app.listen(port, function(){
    console.log("sever opened at port: " + port);
});