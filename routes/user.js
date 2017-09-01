/**
  test: All tests are done successfully 
**/

var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var async = require('async')

var router =express.Router();

var login=router.get('/user',function(req,res){
    var connection = req.app.get('connection');
    var id = req.query.id;

    //console.log(id);

   if(id === undefined){
      res.json({
        "status":"404",
        "error": "id undefined(id not recieved)"
      });
      return;
    }

    var q= `SELECT * FROM complaint WHERE id = ${id}`;
    connection.query(q,function(err,result){
        if(err){
          console.log(err);
          res.json({
            "status":"404",
            "error":err
          });
        }
        else{
          res.json({
            "status": "200",
            "result": result,
            "check" : result.length
          });
        }
    });
});

module.exports = router;
