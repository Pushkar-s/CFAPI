const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const problemSchema = new Schema({
    problemID: String,
    name: String,
    tags: [{type: String}],
    rating : Number,
    verdict : Boolean
});
const codeforcesSchema = new Schema({
    handle : String,
    problems : [problemSchema]
});

const userSchema = new Schema({
    username   : String,
    googleId   : String,
    Codeforces : [codeforcesSchema]
});

const User = mongoose.model('testuser',userSchema);

module.exports = User;