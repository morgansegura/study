var mongoose = require("mongoose");

// Campground Schema
var commentSchema = new mongoose.Schema({
    text: String,
    author: String
});

module.exports = mongoose.model("Comment", commentSchema);