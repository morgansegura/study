var express     = require("express")
    app         = express(),
    bodyParser  = require("body-parser"),
    mongoose    = require("mongoose"),
    Campground  = require("./models/campground"),
    seedDB      = require("./seeds");


// seed the DB
seedDB();
// connect to the DB
mongoose.connect("mongodb://localhost/yelp_camp_v4");

app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");


// home route
app.get("/", function(req, res){
    res.render("home");
});

// Camprounds route
app.get("/campgrounds", function(req, res){
    Campground.find({}, function(err, allCampgrounds){
       if(err){

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

        } else {
            // redirect bck to campgrounds page    
            res.redirect("/campgrounds");            
        }
    });

});


// New Camprounds route
app.get("/campgrounds/new", function(req, res){
    res.render("new");
console.log(res)

});


// Show details page
app.get("/campgrounds/:id", function(req, res){
    // find the campground with the correct id
    Campground.findById(req.params.id, function(err, foundCampground){
        if(err) {

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

});