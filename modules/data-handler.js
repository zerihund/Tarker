const mysql = require('mysql2');
const math  = require('./math');

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
        (err, results) =>{
          console.log(err);
          console.log(results);
          res.send('User registered success. Yay!!!!!!');
        },
  );
};
//check if user already exists
const checkUser = (connection, username, res)=>{
  connection.query(
    'SELECT * FROM user WHERE name = ?',  username,
      (err, results) =>{
        const exist = results.length;
        console.log(exist);
        if(exist === 1){
          res.send('Username already exists.');
        }
        else{
          res.send('Username ok.');
        }
      },
  )
};

//check if user email already exists
const checkEmail = (connection, email, res)=>{
  connection.query(
      'SELECT * FROM user WHERE email = ?',  email,
      (err, results) =>{
        const exist = results.length;
        if(exist === 1){
          res.send('Email already exists.');
        }
        else{
          res.send('email ok');
        }
      },
  )
};
//check user credential
const checkCredentials = (connection, username, password)=>{
  return new Promise((resolve)=> {
    connection.execute(
        `SELECT user.user_Id FROM user WHERE name = '${username}' AND password = '${password}'`,
        (err, results) => {
          const exist = results.length;
          if (exist === 1) {
            resolve(results[0].user_Id)
          } else {
            resolve('not exist')
          }
        })
  })
};
//log user in

//story-------------------------------------------------
//send story
const getInitStory = (connection)=>{
  console.log('---------------------------------------------init-------------------------------------------');
  return new Promise((resolve)=>{
    connection.execute(
      `SELECT c.story_Id, c.parent_story, c.content, c.media
       FROM (SELECT a.story_Id FROM story a, story b WHERE a.story_Id=b.parent_story GROUP BY a.story_Id) Isparent,story c
       WHERE c.story_Id != Isparent.story_Id GROUP BY c.story_Id`,
      (err, results)=> {
        const y = math.random(results.length);
        const x = Math.floor(Math.random() * results.length);
        console.log(results[0]);
        resolve(results[y]);
      }
    )
  })
};

//get parent of story
const getParentStory = (connection, id) =>{
  console.log('get parent story of story '+ id);
  return new Promise((resolve)=>{
    connection.query(
      `SELECT c.story_Id, c.parent_story, c.content, c.media
      FROM story c, story d
      WHERE c.story_id = d.parent_story AND d.story_Id = '${id}'`,
      (err, results)=>{
        console.log('------abc------');
        resolve(results);
      }
    )
  })
};

//get comments get comment writer, get comments date
const getStoryComment = (connection, id)=>{
  console.log('grab comments of ' + id);
  return new Promise((resolve)=>{
    connection.query(
      `SELECT user.name, comments.comment, comments.comment_time 
       FROM comments, user 
       WHERE comments.story_id = ? AND user.user_Id = comments.user_Id`, id,
      (err, results)=>{
        console.log(results);
        resolve(results);
      }
    )
  })
};

//get story author
const getAuthor = (connection, id)=>{
  console.log('grab author of '+id);
  return new Promise((resolve)=>{
    connection.query(
      `SELECT user.name, writes.story_time 
      FROM writes, user 
      WHERE writes.story_Id='${id}' AND writes.user_Id = user.user_Id`,
      (err, results)=>{
        console.log(results);
        resolve(results);
      }
    )
  })
};
//get from database total like-dislike
const getOpinion = (connection, id)=>{
  console.log('grab opinion of '+id);
  return new Promise((resolve)=>{
    connection.query(
        `SELECT * 
        FROM(SELECT sum(Views.like_story) as minus FROM Views WHERE Views.story_Id = '${id}' AND Views.like_story = -1) minus,
        (SELECT sum(Views.like_story) as plus FROM Views WHERE Views.story_Id = '${id}' AND Views.like_story = 1) added`,
        (err, results)=>{
          console.log(results);
          resolve(results);
        }
    )
  })
};
 const putOpinion= (connection, data) =>{
   connection.query(
       `UPDATE Views
        SET Views.like_story = ${data[1]}
        WHERE Views.user_Id = ${data[0]} && Views.story_Id= ${data[2]}`,
       (err, results)=>{
         console.log(results);
         return(results);
       }
   )
 }
 //UPDATE OR INSERT QUERY
/*      UPDATE Views
        SET Views.like_story =${data[1]}
        WHERE Views.user_Id =${data[0]} and Views.story_Id=${data[2]}`*/
/*
        `INSERT INTO Views (Views.user_Id,Views.story_Id,Views.like_story,Views.view_count)
        VALUES(${data[0]},${data[2]},${data[1]}, 5)`*/

/*const data = [
  req.body.author_id,
  req.body.parent_id,
  req.body.title,
  req.body.story,
  'img'+req.file.filename
];*/
const upload = (connection, data, res)=>{
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');

  const author = data[0];
  const parent = data[1];
  const title = data[2];
  const story = data[3];
  const file = data[4];
  console.log(author +' '+ parent +' '+title + ' '+ story);
  const storyid = math.idGenerate();
  console.log(`INSERT INTO story (story_Id, title,content,parent_story,media,story_Flag) VALUES ('${storyid}','${title}','${story}',${parent},'something here', null)`);
  console.log(storyid);
  connection.query(
      //'INSERT INTO story (story_Id,content,parent_story,media,story_Flag) VALUES (12345,"heloolwo oid",14,"ddi",null)',
      `INSERT INTO story (story_Id, title,content,parent_story,media,story_Flag)
       VALUES ('${storyid}','${title}','${story}',${parent},'${file}', null);`
       , (err, results)=>{
        connection.query(
            `INSERT INTO writes (user_Id,story_Id) VALUES (${author},'${storyid}')`
            ,(error, result)=>{
              console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>');
              console.log(err);
              console.log(error);
              console.log(result);
              console.log(results);
              res.send('123');
            });

      }
  )
};

module.exports = {
  connect:connect,
  insertUser: insertUser,
  checkUser: checkUser,
  checkEmail: checkEmail,
  checkCredentials: checkCredentials,
  getInitStory:getInitStory,
  getParentStory:getParentStory,
  getStoryComment:getStoryComment,
  getAuthor:getAuthor,
  getOpinion:getOpinion,
  upload:upload,
  putOpinion:putOpinion
};