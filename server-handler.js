'use strict';
//----------------------------------------------------------------------------------------
//set up modules and necessary plugins
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const img = require('./modules/img-handler');
const fs = require('fs');
const app = express();
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const upload = multer({dest: 'public/res'});

//---------------------------------------------------------------------------------------
//database thing
const db = require('./modules/data-handler');
const connection = db.connect();

//-----------------------------------------------------------------------------------------
//concerning passport
//set up passport and log in procedure
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done)=>{
  db.checkCredentials(connection, username,  password).then(valid =>{
    console.log(valid);
    if(valid == true){
      return done(null, {username: username} );
    }
    else{
      return done(null, false);
    }
  })
}));
app.post('/login',
    passport.authenticate('local', {successRedirect: '/node/abc', failureRedirect: '/node/xyz', session: false}));

app.get('/abc', (req, res)=>{
  res.send('You have logged in');
});

app.get('/xyz', (req, res)=>{
  res.send('failed logged in');
});
//----------------------------------------------------------------------------------------
//concerning users
//add user to user database
app.post('/signup/',(req, res)=>{
  const data = [
    req.body.username,
    req.body.email,
    req.body.password
  ];
  db.insertUser(connection, data, res );
});

//check user exists
app.post('/usercheck', (req, res)=>{
  db.checkUser(connection, req.body.username, res);
});

//check email exists
app.post('/emailcheck', (req, res)=>{
  db.checkEmail(connection, req.body.email, res);
});

//-----------------------------------------------------------------------------------------
//concerning stories
//get story to display
app.get('/grabstory', (req, res)=>{
  //get init story
  db.getInitStory(connection)
  .then(results =>
  {
    //get parent story and append it to begin of story branch array
    storyFamily([results])
    .then(storybranch=>{
      //get comments for each story
      familyTalk(storybranch,0).then(familyTalk =>{
        console.log(familyTalk);
        res.send(familyTalk);
      })
    });
  });
});

const storyFamily = (storybranch)=>{
  return new Promise((resolve, reject)=>{
    db.getParentStory(connection,storybranch[0].story_Id)
    .then(results =>{
      storybranch.unshift(results[0]);
      console.log(storybranch);
      if (storybranch[0].parent_story === 0){
        resolve(storybranch);
      }
      else{
        storyFamily(storybranch);
      }
    })
  })

};

const familyTalk = (storybranch, i)=>{
  console.log(storybranch);
  return new Promise((resolve, reject) => {
    db.getStoryComment(connection,  storybranch[i].story_Id)
    .then(result =>{
      storybranch[i].comment = result; //this may not work but let's see
      i++;
      console.log(i);
      if(i < storybranch.length){
        familyTalk(storybranch, i);
      }
      else{
        console.log('99999999');
        resolve(storybranch);
      }
    });
  })};

//--------------------------------------------------------------------------------------------------------
//set up the http and https redirection
//set up secure certification for site
app.set('trust proxy');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.key');
const sslcert = fs.readFileSync('/etc/pki/tls/certs/ca.crt');

const options = {
  key: sslkey,
  cert: sslcert
};

//set http and https set up
const http = require('http');
const https = require('https');
https.createServer(options, app).listen(3000);
http.createServer((req, res)=>{
  console.log('xxxx');
  res.writeHead(302, {'Location': 'https://' + req.headers.host + '/node' + req.url });
  res.end();
}).listen(8000);

console.log('Server init. :) :) :)');