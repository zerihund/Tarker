'use strict';
//----------------------------------------------------------------------------------------
//set up modules and necessary plugins
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const img = require('./modules/img-handler');
const fs = require('fs');
const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));

//--------------------------------------------------------------------------------------

const upload = multer({dest: 'upload'});

//---------------------------------------------------------------------------------------
//database thing
const db = require('./modules/data-handler');
const connection = db.connect();
const bodyParser = require('body-parser');

//-----------------------------------------------------------------------------------------
//set up passport and log in procedure
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
app.use(passport.initialize());
app.use(passport.session());

passport.use(new LocalStrategy((username, password, done)=>{
  console.log('user named '+ username +'tries to logs in');
  const valid = db.checkCredentials(connection, username,  password);
  if(valid){
    return done(null, false);
  }
  else{
    return done(null, {username: username} );
  }
}));
app.post('/login',
    passport.authenticate('local', {successRedirect: '/', failureRedirect: '/node/xyz', session: false}));

//----------------------------------------------------------------------------------------
//add user to user database
app.post('/signup/',(req, res)=>{
  console.log('sign up');
  const data = [
    req.body.username,
    req.body.email,
    req.body.password
  ];
  db.insertUser(connection, data, res );
});

//check user exists
app.post('/usercheck', (req, res)=>{
  console.log('user check');
  db.checkUser(connection, req.body.username, res);
});

//check email exists
app.post('/emailcheck', (req, res)=>{
  console.log('email check');
  db.checkEmail(connection, req.body.email, res);
});

//--------------------------------------------------------------------------------------------------------
//set up the http and https redirection
//set up secure certification for site
app.set('trust proxy');
const sslkey = fs.readFileSync('/etc/pki/tls/private/ca.ket');
const sslcert = fs.readfileSync('/etc/pki/tls/certs/ca.crt');

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