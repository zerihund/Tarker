const mysql = require('mysql2');

//set up connection to the database
const connect = ()=>{
  const x = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS
  });
  console.log('Connection to database established');
  return x;
};
//user--------------------------------------------------
//insert user
const insertUser = (connection, data, res) =>{
  connection.query(
      'INSERT INTO user (name, email, password) VALUE (?,?,?);', data,
        (err, results, fields) =>{
          console.log(err);
          res.send('User registered success. Yay!!!!!!');
        },
  );
};
//check if user already exists
const checkUser = (connection, username, res)=>{
  connection.query(
    'SELECT * FROM user WHERE name = ?',  username,
      (err, results, fields) =>{
        const exist = results.length;
        console.log(exist);
        if(exist == 1){
          res.send('Username already exists.');
        }
        else{
          res.send('Username ok :P.');
        }
      },
  )
};

//check if user email already exists
const checkEmail = (connection, email, res)=>{
  connection.query(
      'SELECT * FROM user WHERE email = ?',  email,
      (err, results, fields) =>{
        const exist = results.length;
        if(exist == 1){
          res.send('Email already exists.');
        }
        else{
          res.send('email ok :)');
        }
      },
  )
};
//check user credential
const checkCredentials = (connection, username, password)=>{
  return new Promise((resolve, reject)=> {
    connection.execute(
        `SELECT * FROM user WHERE name = '${username}' AND password = '${password}'`,
        (err, results, fields) => {
          const exist = results.length;
          if (exist == 1) {
            resolve(true)
          } else {
            resolve(false)
          }
        })
  })
};
//log user in

//story-------------------------------------------------
//send story
const getInitStory = (connection)=>{
  console.log('xxxx');
  return new Promise((resolve, reject)=>{
    connection.executeSql(
      ``,
      (err, results)=>{
        console.log(results);
        resolve(results);
      }
    )
  })
};

const getParentStory = (connection, id) =>{
  console.log('get parent story of story '+id);
  return new Promise((resolve, reject)=>{
    connection.executeSql(
      ``, id,
      (err, results)=>{
        console.log(results);
        resolve(results);
      }
    )
  })
};

const getStoryComment = (connection, id)=>{
  console.log('grab comments of' + id);
  return new Promise((resolve, reject)=>{
    connection.executeSql(
        ``, id,
        (err, results)=>{
          console.log(results);
          resolve(results);
        }
    )
  })
};

//get story, get story like, get story dislike, get story author, get story date
//send like-dislike

//comments
//get comments, get comment writer, get comments date
//send comments, send user

module.exports = {
  connect:connect,
  insertUser: insertUser,
  checkUser: checkUser,
  checkEmail: checkEmail,
  checkCredentials: checkCredentials,
  getInitStory:getInitStory,
  getParentStory:getParentStory,
  getStoryComment:getStoryComment
};