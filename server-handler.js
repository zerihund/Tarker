'use strict';
//----------------------------------------------------------------------------------------
//set up modules and necessary plugins
require('dotenv').config();
const express = require('express');
const multer = require('multer');
const img = require('./modules/img-handler');
const fs = require('fs');
const app = express();
app.set('trust proxy', 1);
const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static('public'));
const vidupload = multer({dest: 'public/res/media/vid'});
const audupload = multer({dest: 'public/res/media/bgm'});
const imgupload = multer({dest: 'public/res/media/img'});
const passport = require('passport');
const morgan = require('morgan');
app.use(morgan('dev'));
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
let MemoryStore = session.MemoryStore;
const cookieParser = require('cookie-parser');
//nodeJs builtin module, we might need to use this one
const wilson = require('wilson-score');
//const contentGiver = require('./modules/content');
//---------------------------------------------------------------------------------------
//database thing
const db = require('./modules/data-handler');
const connection = db.connect();

//-----------------------------------------------------------------------------------------
//concerning passport
//set up passport and log in procedure. also session
app.use(session({
  name: 'app.sid',
  secret: 'MNoVPKGEZrXLeevEIijOCjvLb6rAexvmRHr57hsdiphJv3mJhEXweWB4g25B',
  resave: false,
  saveUninitialized: false,
  store: new MemoryStore(),
  cookie: { secure: true, maxAge:8640000000 }
}));

app.use(passport.initialize());
app.use(passport.session());

// app.all('*', (req, res, next)=>{
//   next();
// });

passport.serializeUser(function(user, done) {
  done(null, user);
});

passport.deserializeUser(function(id, done) {
  done(err, user);
});

passport.use(new LocalStrategy((username, password, done)=>{
  db.checkCredentials(connection, username,  password).then(valid =>{
    console.log(valid);
    if(valid === 'not exist'){
      return done(null, false);
    }
    else{
      return done(null, {username: username, id: valid});
    }
  })
}));

app.post('/login', passport.authenticate('local', {failureRedirect: '/node/', session: true}), (req, res)=>{
  return new Promise(((resolve) => {
    console.log('xx');
    req.session.save();
    resolve();
  })).then(()=>{
    console.log(req.session.passport);
    console.log(req.user);
    console.log(req.isAuthenticated());
    res.redirect('/node/content.html');
  });
});

app.get('/abc/', (req, res)=>{
  console.log(req);
  res.send('success-log-in');
});

app.get('/xyz/', (req, res)=>{
  res.send('failed log in');
});

app.post('/check/', (req, res)=>{
  console.log(req);
  res.send(':v')
});
//----------------------------------------------------------------------------------------
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
//get random story to display
app.get('/grabstory', (req, res)=> {
  //get init story
  console.log('    ');
  console.log('--g-r--a--b-r-');
  db.getInitStory(connection).then(results => {
    //get parent story and append it to begin of story branch array
    findParent([results], res);
  })
});

//get a story that the user has liked
app.get('/likestory', (req, res)=>{
  console.log('    ');
  console.log('get favorite story of user id '+req.session.user.id);
  db.getlikedStory(connection,  req.session.user.id)
  .then(id =>{
    db.getStoryByID(id)
  .then(story =>{
    findChildren([story], res);
    })
  })
});

//get story by id
app.get('/storybyid', (req, res)=>{
  console.log('    ');
  console.log('get story id '+storyid);
    db.getStoryByID(req.body.storyid)
    .then(story =>{
      findChildren([story], res);
    })
});

//get children of a story
const findChildren = (storybranch, res)=>{
  if(storybranch[0].parent_story === 0){
    console.log('--find children story--');
    findParent(storybranch, res);
  }
  else{
    db.getChildrenStory(connection,storybranch[0].story_Id)
    .then(results =>{
      storybranch.push(results[0]);
      console.log('1111');
      findParent(storybranch, res);
    })
  }
};
//get story from top to end
//get parent story
const findParent = (storybranch, res)=>{
  if(storybranch[0].parent_story === 0){
    familyTalk(storybranch, 0, res);
  }
  else{
    db.getParentStory(connection,storybranch[0].story_Id)
    .then(results =>{
      storybranch.unshift(results[0]);
      console.log('1111');
      findParent(storybranch, res);
    })
  }
};

//get comments
const familyTalk = (storybranch, i, res)=>{
  db.getStoryComment(connection,  storybranch[i].story_Id)
  .then(result => {
    storybranch[i].comment = result; //this may not work but let's see
    i++;
    console.log(i);
    if (i < storybranch.length) {
      familyTalk(storybranch, i, res);
    }
    else {
      console.log(storybranch);
      //res.send(storybranch);
      authorTalk(storybranch, 0, res);
    }
  });
};

//get author
const authorTalk = (storybranch, i, res)=>{
  db.getAuthor(connection,  storybranch[i].story_Id)
  .then(result => {
    console.log(result);
    console.log(result.length);
    if(result.length === 0){
      storybranch[i].author = 'undefined';
      storybranch[i].time = 'undefined';
    }
    else{
      storybranch[i].time = result[0].story_time;//this may not work but let's see
      storybranch[i].author = result[0].name;
    }
    i++;
    console.log(i);
    if (i < storybranch.length) {
      authorTalk(storybranch, i, res);
    }
    else {
      console.log('<><><><><>');
      console.log(storybranch);
      storyOpinion(storybranch, 0, res)
      //res.send(storybranch);
    }
  });
};

//get likes and dislikes
const storyOpinion = (storybranch, i, res)=>{
  db.getOpinion(connection,  storybranch[i].story_Id)
  .then(result => {
    storybranch[i].like = result[0].plus;
    storybranch[i].dislike = result[0].minus;//this may not work but let's see
    i++;
    console.log(i);
    if (i < storybranch.length) {
      storyOpinion(storybranch, i, res);
    }
    else {
      console.log('^^^^^^^-------');
      console.log(storybranch);
      //storyOpinion(storybranch, i, res)
      res.send(storybranch);
    }
  });
};

//--------------------------------------------------------------------------------------------------------
//concerning uploading stories----------------------------------------------------------------------------
//upload video
app.post('/uploadvideo/', vidupload.single('media'), (req, res, next)=>{
  next();
});

app.use('/uploadvideo/', (req, res)=>{
  console.log('receiving upload video');
  const data = [
    req.body.author_id,
    req.body.parent_id,
    req.body.title,
    req.body.story,
    'vid/'+req.file.filename
  ];
  console.log(data);
  db.upload(connection,data, res);
});

//----------------------------------------------------------------------
//upload audio
app.post('/uploadaudio/', audupload.single('media'), (req, res, next)=>{
  console.log('receiving upload audio');
  next();
});

app.use('/uploadaudio/', (req, res)=>{
  const data = [
    req.body.author_id,
    req.body.parent_id,
    req.body.title,
    req.body.story,
    'bgm/'+req.file.filename
  ];
    console.log(data);
  db.upload(connection,data, res);
});

//----------------------------------------------------------------------
//upload image
app.post('/uploadimage/', imgupload.single('media'), (req, res, next)=>{
  console.log('receiving upload image');
  next();
});

app.use('/uploadimage/', (req, res)=>{
  const data = [
    req.body.author_id,
    req.body.parent_id,
    req.body.title,
    req.body.story,
    'img/'+req.file.filename
  ];
  console.log(data);
  db.upload(connection,data,res);
});

//upload text only
app.post('/uploadtext/', (req, res)=>{
  const data = [
    req.body.author_id,
    req.body.parent_id,
    req.body.title,
    req.body.story,
    null
  ];
  console.log(data);
  db.upload(connection,data, res);
});

//-------------------------------------------------------------------------------------------------------------
//add like, dislike to +database
app.post('/opinion/', (req, res)=>{
  console.log(`action number ${req.body.firstLike}`);
  console.log(`user-> ${req.body.userId} ,did (${req.body.likeDatabaseValue}) for story-> ${req.body.storyID}`);
  const data =[
    req.body.firstLike,
    req.body.userId,
    req.body.likeDatabaseValue,
    req.body.storyID
  ];
  db.putOpinion(connection,data);
});

//add comments to database
app.post('/comment/', (req, res)=>{
  console.log(req.body.storyid);
  console.log(req.body.userid);
  console.log(req.body.usercomment);
  db.comment(connection, req, res);
});
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