CONTENTS OF THIS FILE
---------------------

 * Introduction
 * Requirements
 * End-Points

INTRODUCTION
------------

This is the Rest API for the admin panel of civil cops. We have used Nodejs on the back-end as the technology and to wrap it up we have used express js as it's framework.
The database used is mysql.


REQUIREMENTS
------------

This module requires the following modules:

    async        :  2.5.0
    aws-sdk      :  2.106.0
    bcrypt       :  1.0.3
    body-parser  : 1.15.2
    cors         : 2.8.4
    express      : 4.14.0
    mysql        : 2.14.1
    nodemon      : 1.11.0
    reload       : 1.0.0


1. Run npm install           //In the directory of index.js
2. Run npm start

  * Make sure the app is running on port 3000.
  * Configure Database settings in index.js file.
  * Remeber to add 3000 at the end of URL        //e.x: Base_Url.com:3000/endpoints

END-POINTS
------------

This module requires the following modules:

GET
1. /complaint
    parameters = offset               //offset is the number of pages to skip
    Response:
            status: 404           // In case of Error
            status: 200.result    // top 50 records
    e.x: /complaint?offset=4

2. /complaint1
    parameters = offset               //offset is the number of pages to skip
    Response:
            status: 404           // In case of Error
            status: 200.result    // top 50 records where statusCheck = 1
    e.x: /complaint1?offset=4

3. /user
    parameters = id
    Response:
            status: 404           // In case of Error
            status: 200.result    // record corresponding to the id
    e.x: /user?id=2


POST
1. /api
    body = {firstName,lastName,messengerUserId,details,photo,address,city,country,gender,description,mapURL,state,statusCheck}
                                    //In json format and in given order
    Response:
            status: 404             // In case of Error
            status: 200,result      // Record is inserted in complaint database
    e.x: /api

2. /activate
    body = array of id's
    Response:
            status: 404             // In case of Error
            status: 200,result      // activate correspondind ID's
    e.x: /activate

3. /deactivate
    body = array of id's    
    Response:
            status: 404              // In case of Error
            status: 200,result       // deactivate corresponding IDs
    e.x: /deactivate

4. /signup
    body = {username,password}
    Response:
            status: 404              // In case of Error
            status: 200,result       // Insert username and password (in encrypted form) in database
    e.x: /signup

5. /login
    body = {username,password}
    Response:
                status: 404          // In case of Error
                status: 200,result   // Return verifyStatus = 1 if credientials are authentic
    e.x: /login
