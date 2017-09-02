var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');
var router = express.Router();
var pagination = router.get('/pagination', function(req, res) {
    var connection = req.app.get('connection');
    var q= `SELECT COUNT(*) AS entries FROM complaint`;
    connection.query(q,function(err, result) {
      if (err) {
        console.log(err);
        res.json({
          "status" : "404",
          "error" : err
        });
      }
      else {
        res.json({
          "status" : "200",
          "result" : result
        });
      }
    });
});
module.exports = router;
