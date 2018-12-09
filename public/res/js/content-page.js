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
        //commentContainer.innerHTML = '';
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
      document.getElementById('hidden-unseen').value = evt.target.innerText;
      document.getElementById('hidden-unseen').select();
      document.execCommand('copy');
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
    //--
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
        media_story.innerHTML = `
          <video controls>
            <source src="res/media/${json[i].media}" type="video/mp4">
          </video>${json[i].content}`;
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
    impress.innerHTML =
        `<i id='+${json[i].story_Id}' class="fa fa-caret-up" onclick="likeOrNot()"></i>
          <span>${json[i].like}</span>
          <i id='-${json[i].story_Id}' class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
          <span>${json[i].dislike}</span>`;

    const add = document.createElement('button');
    add.className = 'add';
    add.innerText = '+';
    add.id = 'add'+json[i].story_Id;
    add.addEventListener('click',evt =>{
      console.log(evt.target.id);
      document.getElementById('popup2').style.display='block';
      document.querySelector('.follow_form').id = 'f'+evt.target.id;
    });

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
};

const grabStory = ()=>{
  console.log('dis run 2');
  const main = document.querySelector('main');
  fetch('/node/grabstory')
  .then(res => res.json())
  .then(json => {
    displayStoryByJson(json);
  })
};
//init functions: get story to display inside main tag
grabStory();
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
  document.querySelector('#liked').disabled = false;
  document.querySelector('#random').className = 'on';
  document.querySelector('#random').disabled = true;
});
//add story to chosen story
document.querySelector('#liked').addEventListener('click',()=>{
  console.log('get liked story');
  document.querySelector('#liked').className = 'on';
  document.querySelector('#liked').disabled = true;
  document.querySelector('#random').className = 'off';
  document.querySelector('#random').disabled = false;
  fetch('/node/likestory')
  .then(res => res.json())
  .then(json => {
    displayStoryByJson(json);
  })
});

//call up form for creating original story
document.querySelector('#create').addEventListener('click',()=>{
  document.getElementById('popup1').style.display='block'
});

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
//copy story to share
// document.querySelectorAll('.storyid').forEach(x => x.addEventListener('click',evt =>{
//   document.getElementById('hidden-unseen').value = '12345';
//   document.getElementById('hidden-unseen').select();
//   document.execCommand('copy');
// }));



