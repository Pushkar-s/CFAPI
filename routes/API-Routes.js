var router = require("express").Router();
const request = require('request');
const User = require("../models/user-models.js");
const assert = require("assert");

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
    res.render("profileform.ejs",{user:req.user});
});



router.get("/cfhandle",authCheck,(req,res)=>{

    var search_term = req.query.username;
    console.log(req.user.googleId);
    var url = 'http://codeforces.com/api/user.status?handle='+ search_term ;
    request(url, function (error, response, body) {
        // eval(require('locus'));
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      var data = JSON.parse(body);
        console.log(search_term);
      if(response.statusCode==200){
            console.log("user " +  req.user.googleId);
            User.findOne({googleId:req.user.googleId}).then(function(record){
                
                assert(record.googleId===req.user.googleId);
                if(record.Codeforces.length===1)record.Codeforces.$pop();
                if(record.Codeforces.length===0)record.Codeforces.push({handle:search_term});
                data["result"].forEach(function(submission){ // for each submitted solution wrong or all correct
                    var flag = true;
                        // assert(record.Codeforces[0].problems.length===1);
                        // assert(record.Codeforces[0].problems[0].name==="Zero Array");
                    record.Codeforces[0].problems.forEach(function(dbproblem){ // check if this submission is already in database
                        if(dbproblem.name === submission["problem"].name){
                            flag = false;
                            // break; "you cannot use break statement in foreach loop but in normal loop you can"
                            var verd;
                            if(submission["verdict"] === "OK")verd = true;
                            else verd = false;
                            dbproblem.verdict = ((dbproblem.verdict)||(verd));
                        }
                    });
                    if(flag==true){ // means this is a submission for a problem never tried before.
                        var verd = false;
                        if(submission["verdict"]==="OK")verd = true;
                        else verd = false;
                        
                        var pbid = submission["problem"].contestId + submission["problem"].index;
                        record.Codeforces[0].problems.push({
                            problemID: pbid,
                            name: submission["problem"].name,
                            tags: submission["problem"].tags,
                            rating : submission["problem"].rating,
                            verdict : verd
                        });
                    }
                });
                record.save().then(function(){
                    res.render("profile.ejs",{user:record});
                });
            });

                            
      }else{
          res.send("Either Codeforces is down or you have entered incorrect username");
      }

    });
});


router.get("/refresh",authCheck,(req,res)=>{
    User.findOne({googleId:req.user.googleId}).then(function(record){
        assert(record.googleId === req.user.googleId);
        if(record.Codeforces.length === 1) { // means we are using record already present since this is refresh route
            var search_term = record.Codeforces[0].handle;
            var url = 'http://codeforces.com/api/user.status?handle='+ search_term ;
            request(url, function (error, response, body) {
                    // eval(require('locus'));
                console.error('error:', error);
                console.log('statusCode:', response && response.statusCode);
                var data = JSON.parse(body);
                if (response.statusCode == 200) {
                    data["result"].forEach(function(submission){ // for each submitted solution wrong or all correct
                        var flag = true;
                        record.Codeforces[0].problems.forEach(function(dbproblem){ // check if this submission is already in database
                            if(dbproblem.name === submission["problem"].name){
                                flag = false;
                                // break; "you cannot use break statement in foreach loop but in normal loop you can"
                                var verd;
                                if(submission["verdict"] === "OK")verd = true;
                                else verd = false;
                                dbproblem.verdict = ((dbproblem.verdict)||(verd));
                            }
                        });
                        if(flag==true){ // means this is a submission for a problem never tried before.
                            var verd = false;
                            if(submission["verdict"]==="OK")verd = true;
                            else verd = false;
                            
                            var pbid = submission["problem"].contestId + submission["problem"].index;
                            record.Codeforces[0].problems.push({
                                problemID: pbid,
                                name: submission["problem"].name,
                                tags: submission["problem"].tags,
                                rating : submission["problem"].rating,
                                verdict : verd
                            });
                        }
                    });
                    record.save().then(function(){
                        res.render("profile.ejs",{user:record});
                    });
                }
            });
        }
    });
});


module.exports = router;
