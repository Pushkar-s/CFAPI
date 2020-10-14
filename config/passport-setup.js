const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20");
const keys = require("./keys.js");
const User = require("../models/user-models.js");


passport.serializeUser((user,done)=>{
    done(null,user.id);
});

passport.deserializeUser((id,done)=>{
    User.findById(id).then((user)=>{
    done(null,user);
    });
});


passport.use( 
    new GoogleStrategy({
        // options for google strategy
        clientID: keys.google.clientID,
        clientSecret: keys.google.clientSecret,
        callbackURL:'/auth/google/redirect'// this need to be changed cuz its local
    },
    (accessToken,refreshToken,profile,done )=>{
        //passport call back function
        console.log("passport call back function fired");
        // console.log(profile);
        User.findOne({googleId:profile.id}).then((currentUser)=>{
            if(currentUser){
                // user already exists
                console.log('User is :', currentUser);
                done(null,currentUser);
            }else{
                new User({
                    username : profile.displayName,
                    googleId : profile.id
                }).save().then((newUser)=>{
                    console.log('New User created :', newUser);
                    done(null,newUser);
                });
            }
        });
    }) 
);

