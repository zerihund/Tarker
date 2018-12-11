//fetch sends to server-handler.js 'opinion'
const sendToDb = (storyid, value) => {
  fetch('/node/opinion/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    //Todo:storyID must be changed to dynamic value, and also userId
    body: `firstLike=6&userId=11&likeDatabaseValue=${value}&storyID=${storyid}`
  }).then(res => {
    console.log(res);
  })
};

//ADD EVENT LISTENER FOR BUTTONS
const addFunctoLike = () =>{
  document.querySelectorAll('.fa-caret-down').forEach(button => button.addEventListener('click', evt =>{
    console.log(evt.target.id);
    const storyId  = evt.target.id.substring(1);
    if(evt.target.className === 'fa fa-caret-down unclicked'){
      sendToDb(storyId, -1);
      evt.target.className = 'fa fa-caret-down clicked';
      if(document.getElementById(`+${storyId}`).className === 'fa fa-caret-up clicked'){
        document.getElementById(`+${storyId}`).className = 'fa fa-caret-up unclicked';
        document.getElementById(`likeAmountOf${storyId}`).innerText--;
      }
      document.getElementById(`dislikeAmountOf${storyId}`).innerText--;
    }
    else{
      sendToDb(storyId, 0);
      evt.target.className = 'fa fa-caret-down unclicked';
      document.getElementById(`dislikeAmountOf${storyId}`).innerText++;
    }
  }));

  document.querySelectorAll('.fa-caret-up').forEach(button => button.addEventListener('click', evt =>{
    console.log(evt.target.id);
    const storyId  = evt.target.id.substring(1);
    if(evt.target.className === 'fa fa-caret-up unclicked'){
      sendToDb(storyId, 1);
      evt.target.className = 'fa fa-caret-up clicked';
      if(document.getElementById(`-${storyId}`).className === 'fa fa-caret-down clicked'){
        document.getElementById(`-${storyId}`).className = 'fa fa-caret-down unclicked';
        document.getElementById(`dislikeAmountOf${storyId}`).innerText++;
      }
      document.getElementById(`likeAmountOf${storyId}`).innerText++;
    }
    else{
      sendToDb(storyId, 0);
      evt.target.className = 'fa fa-caret-up unclicked';
      document.getElementById(`likeAmountOf${storyId}`).innerText--;
    }
  }));};

const checkOpinion = ()=>{
  document.querySelectorAll('.card').forEach(x => {
    fetch('/node/checkopinion', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `storyid=${x.id}`
    })
    .then(res => {
      return res.text()})
    .then(text =>{
      console.log(text);
      if(text === 'hate'){
        document.getElementById(`-${x.id}`).className = 'fa fa-caret-down clicked';
      }
      else if(text === 'like'){
        document.getElementById(`+${x.id}`).className = 'fa fa-caret-up clicked';
      }
    })
  })
};

//add fetch to comment form
const getform = () =>{
  document.querySelectorAll('.write-comment')
  .forEach(x => {
    x.addEventListener('submit',evt =>{
      evt.preventDefault();
      console.log('xxxxxx');
      const storyid = evt.target.id.substring(5);
      const userid = document.querySelector('main').id;
      const fd = new FormData(evt.target);

      fetch('/node/comment/', {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/x-www-form-urlencoded',
        }),
        body: `storyid=${storyid}&userid=${userid}&usercomment=${fd.get('usercomment')}`
      })
      .then((res) => res.json())
      .then(json =>{
        console.log(json);
        const commentContainer = document.getElementById(`xseek${storyid}`);
        commentContainer.innerHTML = '';
        json.forEach(x =>{
          if(x.name !== document.querySelector('#username').value){
            commentContainer.innerHTML+=`<div class="comment">
            <p class="commenter">${x.name}</p>
            <p class="comment-time">${x.comment_time}</p>
            <p class="comment-text">${x.comment}</p>
          </div>`
          }
          else{
            commentContainer.innerHTML+=`<div class="comment">
            <p class="self-commenter">${x.name}</p>
            <p class="self-comment-time">${x.comment_time}</p>
            <p class="self-comment">${x.comment}</p>
          </div>`
          }
      })
    });
  });
})};

//display story onto main
const displayStoryByJson =(json)=>{
  main = document.querySelector('main');
  main.innerHTML = '';
  document.querySelector('h1').innerText = json[0].title;
  for(let i = 0; i<json.length;i++)
  {
    console.log(json[i]);
    const container = document.createElement('div');
    container.id = json[i].story_Id;
    container.className = 'card';

    const storyid = document.createElement('button');
    storyid.innerText = json[i].story_Id;
    storyid.className = 'storyid';
    storyid.addEventListener('click',evt =>{
      console.log(evt.target.id + ' get clicked');
      document.querySelector('.search-input').value = evt.target.innerText;
      document.querySelector('.search-input').select();
      document.execCommand('copy');
      alert('id copy to clipboard');
    });
    container.appendChild(storyid);
    //writer and time-----------------------------------------
    const author_date = document.createElement('div');
    author_date.className = 'author-date';
    const author = document.createElement('p');
    author.innerText = json[i].author;
    const time = document.createElement('p');
    time.innerText = json[i].time;
    const dash = document.createElement('p');
    dash.innerText = '-';
    author_date.appendChild(author);
    author_date.appendChild(dash);
    author_date.appendChild(time);

    //story and media---------------------------------------
    const media_story = document.createElement('p');
    media_story.className = 'media-story';
    if(json[i].media !== null){
      if(json[i].media.substring(0,3) === 'img'){
        //const img = document.createElement('img');
        // img.src = 'res/media/'+json[i].media;
        // media_story.appendChild(img);
        media_story.innerHTML = `<img src="res/media/${json[i].media}" alt="cake">${json[i].content}`;
      }
      else if(json[i].media.substring(0,3) === 'bgm'){
        media_story.innerHTML = `
          <audio controls>
            <source src="res/media/${json[i].media}" type="audio/mp3">
          </audio>${json[i].content}`;
      }
      else if(json[i].media.substring(0,3) === 'vid'){
        if(json[i].story_Id === 'SpEcIaLsToRyFoRiDiOt'){
          media_story.innerHTML = `
          <video autoplay loop>
            <source src="res/media/vid/rickroll.mp4" type="video/mp4">
          </video>${json[i].content}`;
        }else{
          media_story.innerHTML = `
          <video controls>
            <source src="res/media/${json[i].media}" type="video/mp4">
          </video>${json[i].content}`;
        }
      }
      else{
        media_story.innerHTML = json[i].content;
      }
    }
    else{
      media_story.innerHTML = json[i].content;
    }

      const impress = document.createElement('div');
      impress.className = 'impression';
      let likeBtnId=`+${json[i].story_Id}`;
      let dislikeBtnId =`-${json[i].story_Id}`;
      let likeAmountDisplay=`likeAmountOf${json[i].story_Id}`;
      let dislikeAmountDisplay=`dislikeAmountOf${json[i].story_Id}`;
      let like_value = 0;
      let dislike_value = 0;
      if(json[i].like === null){
        console.log('12345');
        like_value = 0;
      }
      else{
        like_value = json[i].like
      }
      if(json[i].dislike === null){
        console.log('67890');
        dislike_value = 0;
      }
      else {
        dislike_value = json[i].dislike
      }

      console.log(''+like_value+' '+dislike_value);

      impress.innerHTML =
          `<i id='${likeBtnId}' class="fa fa-caret-up unclicked"></i>
          <span id='${likeAmountDisplay}' >${like_value}</span>
          <i id='${dislikeBtnId}' class="fa fa-caret-down unclicked"></i>
          <span id='${dislikeAmountDisplay}' >${dislike_value}</span> <script src="res/js/contentLikes.js"></script>`;
      /** I put this function to run each time one of these are created*/

    const add = document.createElement('button');
    add.className = 'add';
    add.innerText = '+';
    add.id = 'add'+json[i].story_Id;
    add.addEventListener('click',evt =>{
      console.log(evt.target.id);
      document.getElementById('popup1').style.display='block';
      document.querySelector('.follow_form').id = 'f'+evt.target.id;
    });
    // remove button for moderator

    const see = document.createElement('button');
    see.className = 'see';
    see.innerText = '...';
    see.id = 'see'+json[i].story_Id;
    see.addEventListener('click',evt =>{
      console.log(evt.target.id);
      console.log(document.getElementById('x'+evt.target.id));
      if(document.getElementById('x'+evt.target.id).style.display==='block'){
        console.log('off');
        document.getElementById('x'+evt.target.id).style.display='none';
      }
      else{
        console.log('on');
        document.getElementById('x'+evt.target.id).style.display='block';
      }
    });
    const commentbox = document.createElement('div');
    commentbox.id = `xsee${json[i].story_Id}`;
    commentbox.className = 'comment-box';
    const comment_container = document.createElement('div');
    comment_container.className = 'comment-container';
    comment_container.id = `xseek${json[i].story_Id}`;
    json[i].comment.forEach(x =>{
      if(x.name !== document.querySelector('#username').value){
        comment_container.innerHTML+=`<div class="comment">
            <p class="commenter">${x.name}</p>
            <p class="comment-time">${x.comment_time}</p>
            <p class="comment-text">${x.comment}</p>
          </div>`
      }
      else{
        comment_container.innerHTML+=`<div class="comment">
            <p class="self-commenter">${x.name}</p>
            <p class="self-comment-time">${x.comment_time}</p>
            <p class="self-comment">${x.comment}</p>
          </div>`
      }
    });
    commentbox.appendChild(comment_container);
    commentbox.innerHTML +=
        `<form class="write-comment" enctype="multipart/form-data" id="fxsee${json[i].story_Id}">
            <input type="text" name="usercomment">
            <button type="submit"> > </button>
          </form>`;

    container.appendChild(author_date);
    container.appendChild(media_story);
    container.appendChild(impress);
    container.appendChild(add);
    container.appendChild(see);
    container.appendChild(commentbox);
    main.appendChild(container);
  }
  getform();
  addFunctoLike();
  checkOpinion();
};

//grab story from database-backend
const grabStory = ()=>{
  console.log('dis run 2');
  const main = document.querySelector('main');
  fetch('/node/grabstory')
  .then(res => res.json())
  .then(json => {
    displayStoryByJson(json);
  })
};

//upload profile pic onto server
//display user name on page
const updateName = ()=>{
  fetch('/node/custom')
  .then(res => res.text())
  .then(text => {
    if(text === 'YOU ARE NOT ALLOWED HERE'){
      alert('YOU ARE NOT ALLOWED HERE!!!!!!!!');
      window.location.replace('https://10.114.32.123/node/')
    }
    else{
      console.log(text);
      fetch('/node/username')
      .then(res=>res.json())
      .then(json => {
        console.log(json);
        document.getElementById('username').innerText = json.username;
        document.getElementById('profilepic').src = 'res/media/profilepic/'+json.photo
      });
    }
  });
};

window.addEventListener('click',(evt)=>{
  if(evt.target.id === 'popup2'){
    document.getElementById('popup2').style.display='none';
  }

  if(evt.target.id === 'popup1'){
    document.getElementById('popup1').style.display='none';
  }
});

//add function to when you click random button you get a random new story read
document.querySelector('#random').addEventListener('click',()=>{
  grabStory();
  document.querySelector('#liked').className = 'off';
  document.querySelector('#random').className = 'on';
});
//add story to chosen story
document.querySelector('#liked').addEventListener('click',()=>{
  console.log('get liked story');
  document.querySelector('#liked').className = 'on';
  document.querySelector('#random').className = 'off';
  fetch('/node/likestory', {
    method: 'get'
  })
  .then(res => res.json())
  .then(json => {
    displayStoryByJson(json);
  })
});

//call up form for creating original story
document.querySelector('#create').addEventListener('click',()=>{
  document.getElementById('popup1').style.display = 'block';
  const followfrm = document.querySelector('.follow_form');
  followfrm.id= `xadd0`;
  followfrm[0].style.display = 'flex';
  document.getElementById('unseen').style.display = 'block';
});
//Todo: copy the for each and the fetch for the

document.getElementById('getstorybyidform').addEventListener('submit', evt=>{
  evt.preventDefault();
  fetch('/node/storybyid', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `storyid=${evt.target[0].value}`
  })
  .then(res => res.json())
  .then(json => {
    displayStoryByJson(json);
  })
});

//copy story to share with others
document.querySelectorAll('.storyid').forEach(x => x.addEventListener('click',evt =>{
  document.getElementById('hidden-unseen').value = '12345';
  document.getElementById('hidden-unseen').select();
  document.execCommand('copy');
}));

//get all add elements which are to pop up the follow-form
document.querySelectorAll('.add').forEach(x=>x.addEventListener('click', evt=>{
  document.getElementById('popup1').style.display = 'block';
  const followfrm = document.querySelector('.follow_form');
  followfrm.id= `x${evt.target.id}`;
  followfrm[0].style.display = 'none';
  document.getElementById('unseen').style.display = 'none';
}));

//-------------------------------------------------------------------------------------------
//upload profile pic
document.getElementById('profilepic').addEventListener('click',evt=>{
  if(document.getElementById('profileupload').style.display === 'block'){
    document.getElementById('profileupload').style.display = 'none'
  }else{
    document.getElementById('profileupload').style.display = 'block';
  }
});

document.getElementById('profileupload').addEventListener('submit', evt => {
  evt.preventDefault();
  const frm = document.getElementById('profileupload');
  if(frm[0].files[0].type.substring(0,5) !== 'image'){
    console.log('incorrect file type')
  }
  else{
    const fd = new FormData(frm);
    const settings = {
      method: 'post',
      body: fd,
    };
    fetch('/node/uploadprofile',settings)
    .then(res => res.text())
    .then(text => {
      //init functions: get story to display inside main tag
      console.log(text);
      updateName();
    });
  }
});

//---------------------------------------------------------------------------------------------
//upload files and story
document.querySelector('.follow_form').addEventListener('submit',evt =>{
  if(document.querySelectorAll('.follow_form input')[1].files.length === 0){
    uploadMedia('text',evt);}

  else if(document.querySelectorAll('.follow_form input')[1].files[0].type.substring(0,5) === 'audio'){
    uploadMedia('audio',  evt);
  }
  else if(document.querySelectorAll('.follow_form input')[1].files[0].type.substring(0,5) === 'image'){
    uploadMedia('image',  evt);
  }
  else if(document.querySelectorAll('.follow_form input')[1].files[0].type.substring(0,5) === 'video'){
    uploadMedia('video',  evt);
  }
  else {
    console.log('incorrect file type');
  }
});

const uploadMedia = (type, evt)=>{
  console.log('------------------------');
  console.log('trying to /upload'+type+'/');
  evt.preventDefault();
  const fd = new FormData(evt.target);
  const settings = {
    method: 'post',
    body: fd,
  };
  settings.body.append('author_id', document.querySelector('main').id);
  settings.body.append('parent_id', evt.target.id.substring(4));
  settings.body.append('story', document.getElementById('post_story1').value);

  console.log('author: '+settings.body.get('author_id'));
  console.log('parent: '+settings.body.get('parent_id'));
  console.log('file: '+ settings.body.get('file'));
  console.log('title: '+settings.body.get('title'));
  console.log('story: '+settings.body.get('story'));

  fetch('/node/upload'+type+'/', settings)
  .then((res) => {
    document.getElementById('popup1').style.display = 'none';
  });
};
//toggles the mobile dropdown menu on or off
const dropdownMenu = document.querySelector('.login-dropdown-content');
const dropdownButton =document.querySelector('#user-icon');
dropdownMenu.style.display='none';
dropdownButton.addEventListener("click",(evt)=>{
  if(dropdownMenu.style.display==='none'){
    dropdownMenu.style.display='block';
  }else{
    dropdownMenu.style.display='none';
  }
});

//init functions: get story to display inside main tag
grabStory();
updateName();


