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


router.post("/todos",authCheck,(req,res)=>{
    var nt = req.body.description;
    var title = req.body.title;
    console.log("created Note: ", nt);

    User.findOne({googleId:req.user.googleId}).then(function(record){
        record.Codeforces[0].problems.forEach(function(dbproblem){ // check if this submission is already in database
            if(dbproblem.name === title){
                dbproblem.note = nt;
            }
        });
        record.save(function(err, todo) {
            if (err) return console.error(err);
            console.log("save successful");
            // console.log(res.json(req.body));
            res.json(req.body);
            return req.body;
        });
    });
});

router.delete('/todos/:id',authCheck,(req,res)=> {
    var title = req.params.id;
    // delete the todo from the DB
    User.findOne({googleId:req.user.googleId}).then(function(record){
        record.Codeforces[0].problems.forEach(function(dbproblem){ // check if this submission is already in database
            if(dbproblem.name === title){
                dbproblem.note = "";
            }
        });
        record.save(function(err, todo) {
            if (err) return console.error(err);
            console.log("DELETE successful");
            // console.log(res.json(req.body));
            res.json(req.body);
            return req.body;
        });
    });
});



router.get("/usertags",authCheck,(req,res)=>{
    var tag = req.query.tag;
    User.findOne({googleId:req.user.googleId}).then(function(record){
        record.Codeforces[0].usertags.push(tag);
        record.save().then(function(){
            res.render("profile.ejs",{user:record});
        });
    });
});

router.get("/usertags/:rtag",authCheck,(req,res)=>{
    var rtag = req.params.rtag;
    User.findOne({googleId:req.user.googleId}).then(function(record){
        record.Codeforces[0].usertags.pull(rtag);
        record.save().then(function(){
            res.render("profile.ejs",{user:record});
        });
    });
});




module.exports = router;








    