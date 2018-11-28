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
          res.send('ok');
        },
  );
};
//check if user already exists
const checkUser = (connection, username, res)=>{
  connection.query(
    'SELECT * FROM user WHERE name = ?',  username,
      (err, results, fields) =>{
        console.log(results.length);
        res.send();
      },
  )
};

//check if user email already exists
const checkEmail = (connection, email, res)=>{
  connection.query(
      'SELECT * FROM user WHERE email = ?',  email,
      (err, results, fields) =>{
        console.log(results.length);
        res.send();
      },
  )
};
//check user credential
const checkCredentials = (connection, username, password)=>{
  connection.execute(
    `SELECT COUNT(name) FROM user WHERE name = ${username} AND password = ${password}`,
    (err, results, fields) =>{
      console.log(results);
      return results[0] != 0;
    },
  )
};
//log user in

//story-------------------------------------------------
//send story
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
  checkCredentials: checkCredentials
};