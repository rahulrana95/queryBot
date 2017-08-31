var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');

var router =express.Router();
var app = express();

var mysql = require('mysql')
var connection = mysql.createConnection({
  host     : 'testbot.c0ccjbvvdqns.us-east-2.rds.amazonaws.com',
  user     : 'maniax',
  password : '9068390682Rr',
  database : 'testing',
  port     : 3306
});



app.set('port', process.env.PORT || 3000 );

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var home=router.get('/',function(req,res){

  res.json({
    "status":200
  });

});

app.use(home);

app.use(

router.post('/api',function(req,res){

    var query=req.body.query;
    var dateTime=req.body.dateTime;


    var q= `INSERT INTO new_table VALUES ('','${query}','${dateTime}');`;
    connection.query(q,function(err,result){
      if(err){
        console.log(err);
        res.json({
          "status":"404"
        });
      }
      else {
        res.json({
          "status":"200"
        });
        connection.end();

      }


    });





})
);


var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
