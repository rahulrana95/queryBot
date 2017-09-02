/**
  All tests done succesfully
**/
var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var async = require('async')

var router = express.Router();

var deactivate = router.post('/deactivate',function(req,res){
    var connection = req.app.get('connection');
    console.log(req.body);
    var list = req.body.id;

    if(list === undefined || list.length <= 0){
      res.json({
        "status":"404",
        "error": "Invalid request"
      });
      return;
    }

    //console.log(list.length);
    var i = 0;
    var flag=0;
    for(var k in list){
        i++;
        var v = list[k];
        //console.log(v);
        var q= `UPDATE complaint SET statusCheck = 0 WHERE id = '${v}';`;
        connection.query(q,function(err,result){
        if(i === list.length){

          if(flag === 0 )
          {
            flag=1;
            console.log(k);
            res.json({
              "status":"200",
              "result":result
            });

          }
        }
      });
    }
  });

module.exports = router;
