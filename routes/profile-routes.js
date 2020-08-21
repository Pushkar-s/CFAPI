const router = require("express").Router();

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

module.exports = router;