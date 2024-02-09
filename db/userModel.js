const mongoose = require("mongoose");
const collection = "records";
// Create Schema
const userSchema = new mongoose.Schema({
    fname: String,
    lname: String,
    age: Number
})

// Creating Model 
const userModel = mongoose.model(collection, userSchema);

module.exports = userModel;