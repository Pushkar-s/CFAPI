const mongoose = require("mongoose");
const keys = require("../config/keys.js");
const assert = require("assert");
const request = require('request');
const testUser = require("../models/testuser-models.js");

// ES6 promise
mongoose.Promise = global.Promise;



describe('Test Database',function(){

    before(function(done){
        // before is the first thing which runs when we try for test tells mocha that wait for this to complete
        // and done(); ensures that its completed 
        this.enableTimeouts(false);
        mongoose.connect(keys.mongodb.dbURL,{ useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false },()=>{
            console.log("connected to mongodb");
        });
        return mongoose.connection.once('open',function(){
            console.log("connection has been made");
            done();
        }).on('error',function(error){
            console.log("connection error");
        });
    });

    // this before each will drop will help now for not having duplicates of same mario for now
    beforeEach(function(done){
        this.enableTimeouts(false);
        // Drop the collection
        mongoose.connection.collections.testusers.drop(function(){
            done();
        });
    });

    var data;
    var search_term = "dementorx";
    it('get data using request',function(done){
        // var url = 'http://codeforces.com/api/user.status?handle='+search_term+'&from=1&count=10';
        var url = 'http://codeforces.com/api/user.status?handle='+search_term;
        request(url, function (error, response, body) {
            assert(error===null);
            data = JSON.parse(body);
            done();
        });
    });

    // Describe tests
    describe('collecting record of dementorx and Saving it to database',function(){

        var x
        beforeEach(function(done){
            x = new testUser({
                username   : "Pushkar Soni",
                googleId   : "1234",
                Codeforces : [{
                    handle : search_term// from dementorx
                    
                }]
            });
            x.save().then(function(){
                done();
            });
        });
        


        it('find a record of pushkar',function(done){
                testUser.findOne({googleId:"1234"}).then(function(record){
                    assert(record.googleId==="1234");
                    data["result"].forEach(function(submission){
                        var flag = true;
                            // assert(record.Codeforces[0].problems.length===1);
                            // assert(record.Codeforces[0].problems[0].name==="Zero Array");
                        record.Codeforces[0].problems.forEach(function(dbproblem){
                            if(dbproblem.name===submission["problem"].name){
                                flag = false;
                                // break; "you cannot use break statement in foreach loop but in normal loop you can"
                                var verd;
                                if(submission["verdict"]==="OK")verd = true;
                                else verd = false;
                                dbproblem.verdict = ((dbproblem.verdict)||(verd));
                            }
                        });
                        if(flag==true){
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
                        done();
                    });
                });
                // done();
        });


    });


      



} );


