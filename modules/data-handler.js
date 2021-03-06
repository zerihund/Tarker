const mysql = require('mysql2');
const math  = require('./math');

//set up connection to the database using the .env file
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
//insert user to the data base for registration
const insertUser = (connection, data, res) =>{
  connection.query(
      'INSERT INTO user (name, email, password, photo) VALUE (?,?,?,?);', data,
        (err, results) =>{
          console.log(err);
          console.log(results);
          res.send('User registered success. Yay!!!!!!');
        },
  );
};
//upload user pic or profile picture
const uploadprofile = (connection, data, res) =>{
  console.log(`UPDATE user SET photo = '${data[1]}' WHERE user_Id = '${data[0]}'`);
  connection.query(
      `UPDATE user SET photo = '${data[1]}' WHERE user_Id = '${data[0]}'`,
      (err, result)=>{
        console.log(err);
        console.log(result);
        res.send('profilepic updated');
      }
  )
};
// moderator remove user when it is necessary
const  removeUser = (connection, id, res)=> {
  console.log(`DELETE FROM user where user_Id = ${id}`);
  connection.query(
      `DELETE FROM user where user_Id = ${id}`,
      (err, results)=>{
        console.log(err);
        console.log(results);
        res.send('remove succeeded: ' + id);
      }
  )
};
//remove a story content is offensive or contain copy right fragment
const removeStory =(connection, id, res)=>{
  console.log(`UPDATE story
      SET content="This Content has been removed due to copy right issue or it is offensive to some groups", media =""
      WHERE story_Id= '${id}'`);
  connection.query(
      `UPDATE story
      SET content="This Content has been removed due to copy right issue or it is offensive to some groups", media =""
      WHERE story_Id= '${id}'`,
      (err,results)=>{
        console.log(results);
        res.send('remove succeeded: ' + id);
      }
  )
};
//remove comment by moderator when it is not appropriate
const removeComment = (connection, id, res)=>{
  connection.query(
      `UPDATE comments
       SET comment="some comment has been removed"
       WHERE comments.comment_Id ='${id}'`,
      (err,result)=>{
        console.log(result);
        res.send('remove succeeded: ' +id);
      })
};
//check if user already exists when I user tries to register
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
        `SELECT * FROM user WHERE name = '${username}' AND password = '${password}'`,
        (err, results) => {
          const exist = results.length;
          if (exist === 1) {
            resolve(results[0])
          } else {
            resolve('not exist')
          }
        })
  })
};
//story sending and graping process
//send story
const getInitStory = (connection)=>{
  console.log('--init-');
  return new Promise((resolve)=>{
    connection.execute(
      `SELECT c.story_Id, c.parent_story, c.content, c.media, c.title
       FROM (SELECT a.story_Id FROM story a, story b WHERE a.story_Id=b.parent_story GROUP BY a.story_Id) Isparent,story c
       WHERE c.story_Id != Isparent.story_Id GROUP BY c.story_Id`,
      (err, results)=> {
        const y = math.random(results.length);
        resolve(results[y]);
      }
    )
  })
};

//get story of certain id
const getStoryByID = (connection, id)=>{
  console.log('----init----');
  return new Promise((resolve)=>{
    connection.query(
        `SELECT c.story_Id, c.parent_story, c.content, c.media, c.title
         FROM story c
         WHERE c.story_Id = '${id}'`,
        (err, results)=> {
          console.log(err);
          console.log(results);
          if(results.length === 0){
            resolve('FoRtHoSeWhOaReLoSt');
          }
          else{
            console.log(results[0]);
            resolve(results[0]);
          }

        }
    )
  })
};
//getting children story of  a given story
const getChildrenStory = (connection,id)=>{
  console.log('get children story of story '+id);
  return new Promise((resolve)=>{
    connection.query(
        `SELECT d.story_Id, d.parent_story, d.content, d.media, d.title
         FROM story c, story d
         WHERE c.story_id = d.parent_story AND c.story_Id = '${id}'`,
        (err, results)=>{
          console.log(results);
          if(results.length === 0){
            console.log('--n---o---c-h----i-l--d---r--e---n');
            resolve([]);
          }
          else{
            console.log('==========');
            const y = math.random(results.length);
            console.log(y);
            console.log(results[y]);
            resolve(results[y]);
          }
        }
    )
  })
};
//get liked story of a user of with given id
const getlikedStory = (connection, userid) =>{
  console.log('get liked  story of user with id: '+ userid);
  return new Promise((resolve)=>{
    connection.query(
        `SELECT story_Id
         FROM Views
         WHERE user_Id = '${userid}' AND like_story = 1`,
        (err, results)=>{
          console.log('------l-i-k-e------');
          console.log(err);
          if(results.length === 0){
            resolve('SpEcIaLsToRyFoRiDiOt');
          }
          else{
            const y = math.random(results.length);
            resolve(results[y].story_Id);
          }
        }
    )
  })
};
//get parent of story of a story with a given id
const getParentStory = (connection, id) =>{
  console.log('get parent story of story '+ id);
  return new Promise((resolve)=>{
    connection.query(
      `SELECT c.story_Id, c.parent_story, c.content, c.media, c.title
       FROM story c, story d
       WHERE c.story_id = d.parent_story AND d.story_Id = '${id}'`,
      (err, results)=>{
        console.log(err);
        console.log('--p-a--r--e-nt--');
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
//check if user like/dislike a given story before
const checkOpinion = (connection, data, res) =>{
  console.log(`SELECT like_story FROM Views WHERE Views.user_Id = ${data[0]} && Views.story_Id= '${data[1]}'`);
  connection.query(
      `SELECT like_story FROM Views WHERE Views.user_Id = ${data[0]} && Views.story_Id= '${data[1]}'`,
      (err, result) =>{
        console.log('+++++++++++++++++++++++++++++++');
        console.log(result);
        if(result.length !== 0){
          console.log('yep');
          console.log(result[0]);
          if(result[0].like_story > 0){
            res.send('like');
          }else{
            res.send('hate');
          }
        }
        else{
          console.log('nope');
          res.send('nope')
        }
})
};
//put user like/dislike into views table
 const putOpinion= (connection, data) =>{
   //data[0]<1 means they are liking for the first time so insert
   // else update because they have liked before
   console.log(`SELECT * FROM Views WHERE Views.user_Id = ${data[1]} && Views.story_Id= '${data[3]}'`);
   console.log(`INSERT INTO Views (Views.user_Id,Views.story_Id,Views.like_story,Views.view_count)
                 VALUES(${data[1]},'${data[3]}',${data[2]}, 5)`);
   console.log(`UPDATE Views
                 SET Views.like_story = ${data[2]}
                 WHERE Views.user_Id = ${data[1]} && Views.story_Id= '${data[3]}'`);
   connection.query(
       `SELECT * FROM Views WHERE Views.user_Id = ${data[1]} && Views.story_Id= '${data[3]}'`,
       (err, result) =>{
         console.log(result);
          if(result.length === 0){
            connection.query(
                `INSERT INTO Views (Views.user_Id,Views.story_Id,Views.like_story,Views.view_count)
                 VALUES(${data[1]},'${data[3]}',${data[2]}, 5)`,
                (err, results)=>{
                  console.log('insert');
                  console.log(results);
                  return(results);
                }
            )
          }
          else{
            console.log('update');
            connection.query(
                `UPDATE Views
                 SET Views.like_story = ${data[2]}
                 WHERE Views.user_Id = ${data[1]} && Views.story_Id= '${data[3]}'`,
                (err, results)=>{
                  console.log(results);
                  return(results);
                }
            )
          }
       });
 };

const upload = (connection, data, res)=>{
  console.log('<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<');
  const author = data[0];
  const parent = data[1];
  const title = data[2];
  const story = data[3];
  const file = data[4];
  console.log(author +' '+ parent +' '+title + ' '+ file +' '+ story);
  const storyid = math.idGenerate();
  console.log(`INSERT INTO story (story_Id, title,content,parent_story,media,story_Flag) VALUES ('${storyid}','${title}','${story}','${parent}','something here', null)`);
  console.log(storyid);
  connection.query(
      //'INSERT INTO story (story_Id,content,parent_story,media,story_Flag) VALUES (12345,"heloolwo oid",14,"ddi",null)',
      `INSERT INTO story (story_Id, title,content,parent_story,media,story_Flag)
       VALUES ('${storyid}','${title}','${story}','${parent}','${file}', null);`
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
// inserting comment in to the database
const comment = (connection, req, res)=>{
  connection.query(
      `INSERT INTO comments (user_Id,story_Id,comment)
        VALUES(${req.session.passport.user[0].id},'${req.body.storyid}','${req.body.usercomment}')`,
      (err, results)=>{
        console.log(err);
        console.log(results);
        connection.query(
            `SELECT user.name, comments.comment, comments.comment_time 
       FROM comments, user 
       WHERE comments.story_id = ? AND user.user_Id = comments.user_Id`, req.body.storyid,
            (error, result)=>{
              console.log(error);
              console.log(result);
              res.send(result);
            }
        )
      }
  )
};
//check moderator credential
const checkModerator = (connection, data, res)=>{
  connection.query(
      `SELECT * FROM moderator WHERE name = '${data[0]}' AND PASSWORD = '${data[1]}'`,
      (err, result)=>{
        if(result.length ===0){
          res.send('allowed');
        }
        else{
          res.send('forbidden');
        }
      }
  )
};
//get list of user from the database for the moderator
const getUser = (connection, res)=>{
  connection.query(
      'SELECT user_Id, name FROM user',
      (err, result)=>{
        res.send(result);
      })
};
//get list of all stories from the database for the moderator
const getAllStory = (connection, res)=>{
  connection.query(
      'SELECT story_Id, content, media FROM story',
      (err, result)=>{
        res.send(result);
      }
  )
};
//get all comment form the database for the moderator
const getAllComment = (connection, res)=>{
  connection.query(
      'SELECT comment_Id, comment FROM comments',
      (err, result)=>{
        res.send(result);
      }
  )
};
//module export to the server handler.js
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
  putOpinion:putOpinion,
  comment:comment,
  removeUser:removeUser,
  removeStory:removeStory,
  getlikedStory:getlikedStory,
  getChildrenStory:getChildrenStory,
  getStoryByID:getStoryByID,
  checkOpinion:checkOpinion,
  removeComment:removeComment,
  checkModerator:checkModerator,
  getUser:getUser,
  getAllStory:getAllStory,
  getAllComment:getAllComment,
  uploadprofile:uploadprofile
};