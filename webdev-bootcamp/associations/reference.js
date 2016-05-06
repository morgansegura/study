var mongoose = require("mongoose");
mongoose.connect("mongodb://localhost/blog_demo_ref");

var User = require("./models/user");
var Post = require("./models/post");