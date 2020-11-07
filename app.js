var express = require("express");
var app  = express();
const request = require('request');
const authRoutes = require("./routes/OAuthRoutes.js");
const profileRoutes = require("./routes/profile-routes.js");
const passportSetup = require("./config/passport-setup.js");
const APIRoutes     = require("./routes/API-Routes.js");
const userNotesRoutes= require("./routes/UserNotes.js");
// const notes         = require("./routes/notes-Routes.js");
const mongoose = require("mongoose");
const keys = require("./config/keys.js");
const cookieSession = require("cookie-session");
const passport = require("passport");


var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static(__dirname+"/public"));




app.use(cookieSession({
    maxAge : 24*60*60*1000,//mili seconds 
    keys : [keys.session.cookieKey,'y']
}));

// initialize passport
app.use(passport.initialize());
app.use(passport.session());

// connect to mongoose
mongoose.connect(keys.mongodb.dbURL,{ useNewUrlParser: true, useUnifiedTopology: true },()=>{
    console.log("connected to mongodb");
});
mongoose.connection.once('open',function(){
    console.log("connection has been made");
                        // mongoose.connection.collections.users.drop(function(){
                        //     console.log("database collection dropped");
                        // });
}).on('error',function(error){
    console.log("connection error");
});


app.use("/auth",authRoutes);
app.use("/profile",profileRoutes);
app.use("/userNotes",userNotesRoutes);

app.use("/edit",APIRoutes);

// app.use("/notes",notes);


app.get("/",function(req,res){
    res.render("index.ejs",{user:req.user});
});

app.get("/try",function(req,res) {
    res.render("try.ejs");
});

app.listen(process.env.PORT || 3000,function(){
    console.log("server on port 3000");
});
 