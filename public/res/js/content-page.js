const init =()=>{
  console.log('dis run');
  document.querySelectorAll('.add').forEach(x => x.addEventListener('click',evt =>{
    console.log(evt.target.id);
    document.getElementById('popup2').style.display='block';
    document.querySelector('.follow_form').id = 'f'+evt.target.id;
  }));

//turn on off comment box
  document.querySelectorAll('.see').forEach(x => x.addEventListener('click',evt =>{
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
  }));

  document.querySelectorAll('.write-comment').forEach(x => x.addEventListener('submit',evt =>{
    evt.preventDefault();
    const storyid = evt.target.id.substring(5);
    const authorid = document.querySelector('main').id;
    const fd = new FormData(evt.target);
    fd.append('storyid', storyid);
    fd.append('userid', authorid);
    const settings = {
      method: 'post',
      body: fd,
    };
    fetch('/node/comment/', settings)
    .then((res) => res.json())
    .then(json =>{
      console.log(json);
      const comment_container = document.querySelector(`#xsee${storyid} .comment-container`);
      comment_container.innerHTML = '';
      json.forEach(x =>{
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
      })
    });
  }));
};

const grabStory = ()=>{
  console.log('dis run 2');
  const main = document.querySelector('main');
  fetch('/node/grabstory')
  .then(res => res.json())
  .then(json =>{
    main.innerHTML = '';
    document.querySelector('h1').innerText = json[0].title;
    for(let i = 0; i<json.length;i++){
      console.log(json[i]);
      const container = document.createElement('div');
      container.id = json[i].story_Id;
      container.className = 'card';

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
      if(json[i].media.substring(0,3) === 'img'){
        const img = document.createElement('img');
        img.src = 'res/media/'+json[i].media;
        media_story.appendChild(img);
        media_story.innerHTML = json[i].content;
      }
      else if(json[i].media.substring(0,3) === 'bgm'){
        const aud = document.createElement('audio');
        aud.src = 'res/media/'+json[i].media;
        aud.controls = true;
        media_story.appendChild(aud);
        media_story.innerHTML = json[i].content;
      }
      else if(json[i].media.substring(0,3) === 'vid'){
        const vid = document.createElement('vid');
        vid.controls = true;
        vid.src = 'res/media/'+json[i].media;
        media_story.appendChild(vid);
        media_story.innerHTML = json[i].content;
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

      const see = document.createElement('button');
      see.className = 'see';
      see.innerText = '...';
      see.id = 'see'+json[i].story_Id;

      const commentbox = document.createElement('div');
      commentbox.id = `xsee${json[i].story_Id}`;
      commentbox.className = 'comment-box';
      const comment_container = document.createElement('div');
      comment_container.className = 'comment-container';
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
      init();
    }
  });
};
//init functions: get story to display inside main tag
grabStory();
window.addEventListener('click',(evt)=>{
  if(evt.target.id === 'popup2'){
    document.getElementById('popup2').style.display='none';
  }
});
//add story to chosen story




