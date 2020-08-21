var router = require("express").Router();
const request = require('request');




router.get("/:user/:tag",function(req,res){
    var question_tag = req.params.tag;
    var search_term = req.params.user;
    // var url = 'http://codeforces.com/api/user.status?handle='+ search_term + '&from=1&count=10' ;
    var url = 'http://codeforces.com/api/user.status?handle='+ search_term ;// to search from all que

    request(url, function (error, response, body) {
        // eval(require('locus'));
      console.error('error:', error);
      console.log('statusCode:', response && response.statusCode);
      var data = JSON.parse(body);
      res.render("index.ejs",{data:data,question_tag:question_tag})
    });

});

module.exports = router;