var express = require('express');
var reload = require('reload');
var bodyParser = require('body-parser');
var bcrypt = require('bcrypt');

var router =express.Router();
var app = express();

var mysql = require('mysql')
var connection = mysql.createPool({
  host     : 'testbot.c0ccjbvvdqns.us-east-2.rds.amazonaws.com',
  user     : 'maniax',
  password : '9068390682Rr',
  database : 'testing',
  port     : 3306
});



app.set('port', process.env.PORT || 3000 );

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: false }));


var home=router.get('/complaint',function(req,res){
    var off=10*parseInt(req.query.offset);

    var q= `SELECT * FROM complaint WHERE statusCheck = 1 LIMIT 10 OFFSET ${off} `;
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
app.use(home);

var pagination=router.get('/pagination',function(req,res){

    var q= `SELECT COUNT(*) AS entries FROM complaint`;
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
app.use(pagination);


var loginpost=router.post('/loginpost',function(req,res){

    var userName = req.body['username'];
    var password = req.body['password'];
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
app.use(loginpost);

var loginverify=router.get('/loginverify',function(req,res){

    var userName = req.query.username;
    var password = req.query.password;

    /*bcrypt.compare(password, hash, function(err, res) {
    // res == true
  });*/

    var q= `SELECT * FROM users WHERE userName = ${userName}`;
    connection.query(q,function(err,result){

      if(err){
        console.log(err);
        res.json({
          "status":"404",
          "error":err
        });
      }
      else {

        for(var r in result){
          bcrypt.compare(password, result[r].password, function(err, res) {
              //check = 1
          });
        }

        res.json({
          "status": "200",
          "result": res
        });
      }
    });
});
app.use(loginverify);

app.use(

router.post('/api',function(req,res){


    var firstName = req.body['first name'];
    var lastName = req.body['last name'];
    var messengerUserId = req.body['messenger user id'];
    var details = req.body['details'];
    var photo = req.body['photo'];
    var address = req.body['address'];
    var city = req.body['city'];
    var country = req.body['country'];
    var gender = req.body['gender'];
    var description = req.body['Description'];
    var mapURL = req.body['map url'];
    var state = req.body['state'];
    var statusCheck = 1;


    var q= `INSERT INTO complaint VALUES ('','${firstName}','${lastName}','${messengerUserId}','${details}','${photo}','${address}','${city}','${country}','${gender}','${description}','${mapURL}','${state}','${statusCheck}');`;
    connection.query(q,function(err,result){

      if(err){
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
})
);

var server = app.listen(app.get('port'), function() {
  console.log('Listening on port ' + app.get('port'));
});

reload(server, app);
