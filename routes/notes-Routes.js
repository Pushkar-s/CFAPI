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
