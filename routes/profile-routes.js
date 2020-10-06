const router = require("express").Router();
const User = require("../models/user-models.js");


const authCheck = (req,res,next)=>{
    if(!req.user){
        // user is not logged in
        res.redirect("/auth/login");
    }else{
        next();
    }
};

router.get("/",authCheck,(req,res)=>{
    // res.send("you are logged in this is your profile :" + req.user.username);
    res.render("profile.ejs",{user:req.user});
});

router.get("/solved/:tag",authCheck,(req,res)=>{
    // res.send("solved page");
    User.findOne({googleId:req.user.googleId}).then(function(record){
        res.render("solved_problems_page.ejs",{problems:record.Codeforces[0].problems,user:record,tag:req.params.tag});
    });
});

module.exports = router;