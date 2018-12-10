document.querySelector('.login-form').addEventListener('submit', evt => {
  evt.preventDefault();
  const name = evt.target[1];
  const password  = evt.target[3];
  fetch('/node/moderatorlog', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `name=${name}&password=${password}`
  }).then(res=>res.text()).then(text => {
    console.log(text);
    if(text === 'allowed'){
      alert(`Welcome moderator ${name}`);
      document.getElementById('popup').style.display = 'none';
      populate();
    }
    else{
      document.getElementById('signIn-error').innerText = 'YOU ARE NOT SUPPOSED TO BE HERE'
    }
  })
});

const populate = ()=>{
  fetch('/node/userlist/')
  .then(res => res.json())
  .then(userlist => {
    console.log('get user list');
    console.log(userlist);
    showUser(userlist);

    fetch('/node/storylist/').then(res => res.json())
    .then(story => {
      console.log('get story list');
      console.log(story);
      showStory(story);

      fetch('/node/commentlist/')
      .then(res=>res.json())
      .then(commentlist =>{
          console.log('get comment');
          console.log(commentlist);
          showComment(commentlist);
          addFunc();
        }
      )
    })
  })
};

const showUser = (userlist) =>{
  const main = document.getElementById('userlist');
  main.innerHTML ='';
  userlist.forEach(x => {
    const card = document.createElement('div');
    const username = document.createElement('p');
    username.innerText = x.name;
    const rmbutton = document.createElement('button');
    rmbutton.id = x.user_Id;
    rmbutton.className = 'rmUser';
    rmbutton.innerText = 'remove';

    card.appendChild(username);
    card.appendChild(rmbutton);
    main.appendChild(card);
  })
};

const showStory = (story)=>{
  const main = document.getElementById('storylist');
  main.innerHTML ='';
  story.forEach(x => {
    const card = document.createElement('div');
    const media_story = document.createElement('p');
    media_story.className = 'media-story';
    if(x.media !== null){
      if(x.media.substring(0,3) === 'img'){
        media_story.innerHTML = `<img src="res/media/${x.media}" alt="cake">${x.content}`;
      }
      else if(x.media.substring(0,3) === 'bgm'){
        media_story.innerHTML = `
          <audio controls>
            <source src="res/media/${x.media}" type="audio/mp3">
          </audio>${x.content}`;
      }
      else if(x.media.substring(0,3) === 'vid'){
        media_story.innerHTML = `
          <video controls>
            <source src="res/media/${x.media}" type="video/mp4">
          </video>${x.content}`;
      }
      else{
        media_story.innerHTML = x.content;
      }
    }
    else{
      media_story.innerHTML = x.content;
    }

    const rmbutton = document.createElement('button');
    rmbutton.className = 'rmStory';
    rmbutton.id = x.story_Id;
    rmbutton.innerText = 'remove';

    card.appendChild(media_story);
    card.appendChild(rmbutton);
    main.appendChild(card);
  })
};

const showComment = (commentlist)=>{
  const main = document.getElementById('commentlist');
  main.innerHTML ='';
  commentlist.forEach(x => {
    const card = document.createElement('div');
    const commenttext = document.createElement('p');
    commenttext.innerText = x.comment;

    const rmbutton = document.createElement('button');
    rmbutton.className = 'rmComment';
    rmbutton.id = x.comment_Id;
    rmbutton.innerText = 'remove';

    card.appendChild(commenttext);
    card.appendChild(rmbutton);
    main.appendChild(card);
  })
};

// app.post('/removeUser',(req,res)=>{
//   db.removeUser(connection,req.body.userid,res);
// });
// //remove the content and media and replace it in the data base by the moderator
// app.post('/removeStory',(req,res)=>{
//   db.removeStory(connection,req.body.storyid, res);
// });
// app.post('/removeComment',(req,res)=>{
//   db.removeComment(connection,req.body.commentid,res);
// });
const addFunc = ()=>{
  document.querySelectorAll('.rmStory').forEach(x =>{
    x.addEventListener('click', evt =>{
      console.log(evt.target.id);
      const y = evt.target.id;
      fetch('/node/removeStory', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `storyid=${y}`
      })
      .then(res => res.text())
      .then(text => {
        console.log(text);
        populate();
      })
    })
  });

  document.querySelectorAll('.rmComment').forEach(x =>{
    x.addEventListener('click', evt =>{
      console.log(evt.target.id);
      const y = evt.target.id;
      fetch('/node/removeComment', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `commentid=${y}`
      })
      .then(res => res.text())
      .then(text => {
        console.log(text);
        populate();
      })
    })
  });

  document.querySelectorAll('.rmUser').forEach(x =>{
    x.addEventListener('click', evt =>{
      console.log(evt.target.id);
      const y = evt.target.id;
      fetch('/node/removeUser', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `userid=${y}`
      })
      .then(res => res.text())
      .then(text => {
        console.log(text);
        populate();
      })
    })
  })
};
