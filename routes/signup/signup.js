/**
  All tests done succesfully
**/
var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var async = require('async')

var router =express.Router();

var signup=router.post('/signup',function(req,res){
    var connection = req.app.get('connection');
    var userName = req.body['username'];
    var password = req.body['password'];

    if(userName === undefined || password === undefined || userName.length <= 0 || password.length <= 0){
      res.json({
        "status":"404",
        "error": "Invalid username or password"
      });
      return;
    }

    var timestamp = new Date().toISOString().slice(0, 19).replace('T', ' ');
    const saltRounds = 10;
    bcrypt.genSalt(saltRounds, function(err, salt) {
    bcrypt.hash(password, salt, function(err, hash) {

            var q= `INSERT INTO users VALUES ('','${userName}','${hash}','${timestamp}');`;
            connection.query(q,function(err,result){

            if(err){
              console.log(err);
              res.json({
                "status":"404",
                "error":err
              });
            }
            else {
              res.json({
                "status":"200",
                "result":result
              });
            }
          });
      });
    });
});

module.exports = router;
