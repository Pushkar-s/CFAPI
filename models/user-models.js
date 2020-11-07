const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const notesSchema = new Schema({
    title            : { type: String, required: true},
    shortDescription : { type: String },
    longDescription  : { type: String },
    createdAt        : { type: Date, default: Date.now()}
});

const problemSchema = new Schema({
    problemID : String,
    name      : String,
    tags      : [{type: String}],
    rating    : Number,
    verdict   : Boolean,
    note      : String,
    othertags : [{type: String}]
});
const codeforcesSchema = new Schema({
    handle   : String,
    problems : [problemSchema],
    usertags : [{type: String}]
});


const userSchema = new Schema({
    username    : String,
    googleId    : String,
    Codeforces  : [codeforcesSchema],
    UserNotes   : [notesSchema]
});

const User = mongoose.model('user',userSchema);

module.exports = User;