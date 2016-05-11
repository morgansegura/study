var mongoose = require("mongoose");
var Campground = require("./models/campground");
var Comment = require("./models/comment");



var data = [
    {
        name: "Eagle Ridge", 
        image: "https://farm8.staticflickr.com/7252/7626464792_3e68c2a6a5.jpg", 
        description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.",
    },
    {
        name: "Booble Rocks", 
        image: "https://farm2.staticflickr.com/1281/4684194306_18ebcdb01c.jpg", 
        description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.",
    },
        {
        name: "The Spot Camping Grounds", 
        image: "https://farm4.staticflickr.com/3273/2602356334_20fbb23543.jpg", 
        description: "Turnip greens yarrow ricebean rutabaga endive cauliflower sea lettuce kohlrabi amaranth water spinach avocado daikon napa cabbage asparagus winter purslane kale. Celery potato scallion desert raisin horseradish spinach carrot soko. Lotus root water spinach fennel kombu maize bamboo shoot green bean swiss chard seakale pumpkin onion chickpea gram corn pea. Brussels sprout coriander water chestnut gourd swiss chard wakame kohlrabi beetroot carrot watercress. Corn amaranth salsify bunya nuts nori azuki bean chickweed potato bell pepper artichoke.",
    }
];


function seedDB() {
		/*
    Campground.remove({}, function(err){
	
       if(err) {
           console.log(err);
       }
           console.log("removed campgrounds from DB"); 
        
        // add a few campgrounds
        data.forEach(function(seed){
             Campground.create(seed, function(err, campground){
                 if(err){
                     console.log(err);
                 } else {
                     console.log("created campground");
					 
                     Comment.create(
                         {
                             text: "This place is great, but I wish there was internet",
                             author: "Homer"
                         }, function(err, comment){
                             
                             if(err) {
                                 console.log(err);
                             } else {                                                          
                                campground.comments.push(comment);
                                campground.save();
                                 console.log("Created a comment");
                             }
                     });
                 }
             })
        });        

    });  
    */


    // add a few comments
}

module.exports = seedDB;
