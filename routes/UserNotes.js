const router = require("express").Router();
const { db } = require("../models/user-models.js");
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
    User.findOne({googleId:req.user.googleId}).then(function(record){
        res.render("userNotes.ejs",{userNotes:record.UserNotes,user:record});
    });
});


router.post("/addNote",authCheck,(req,res)=>{
    var shortnt = req.body.shortdescription;
    var longnt = req.body.longdescription;
    var titlef = req.body.title;
    console.log("created Note: ", titlef);
    console.log(typeof titlef);
    // shortnt = "hello \n first \n defaultStatus";

    console.log(shortnt)
    console.log(typeof shortnt);
    // console.log(typeof nt);
    User.findOne({googleId:req.user.googleId}).then(function(record){

        record.UserNotes.push({
            title : titlef,
            shortDescription: shortnt,
            longDescription : longnt
        });

        record.save(function(err, note) {
            if (err) return console.error(err);
            console.log("save successful");
            // console.log(res.json(req.body));
            res.json(req.body);
            return req.body;
        });
    });
});


router.delete('/deleteNote/:id',authCheck,(req,res)=> {
    var delid = req.params.id;
    console.log(delid);
    User.findOne({googleId:req.user.googleId}).then(function(record){
        record.UserNotes.pull({_id: delid});
        record.save(function(err, note) {
            if (err) return console.error(err);
            console.log("DELETE successful");
            // console.log(res.json(req.body));
            res.json(req.body);
            return req.body;
        });
    });
});



router.post("/editNote",authCheck,(req,res)=>{
    var shortnt = req.body.shortdescription;
    var longnt = req.body.longdescription;
    var titlef = req.body.title;
    var modid = req.body.modid;
    console.log("edit Note: ", titlef);
    console.log(modid);
    console.log(shortnt)
    // console.log(typeof shortnt);
    // console.log(typeof nt);
    console.log(longnt)
    User.findOne({googleId:req.user.googleId}).then(function(record){

        record.UserNotes.forEach(function(dbnote) {
            if (dbnote._id == modid) {
                dbnote.title = titlef;
                dbnote.shortDescription = shortnt;
                dbnote.longDescription = longnt;
            }
        });

        record.save(function(err, note) {
            if (err) return console.error(err);
            console.log("save successful");
            // console.log(res.json(req.body));
            res.json(req.body);
            return req.body;
        });
    });
});



module.exports = router;