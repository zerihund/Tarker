'use strict';
const mysql = require('mysql2');

const connect = () => {
  // create the connection to database
  const connection = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_DATABASE,
    password: process.env.DB_PASS,
  });
  return connection;
};
//user--------------------------------------------------
//insert user
//check if user already exists
//check user credential
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
};