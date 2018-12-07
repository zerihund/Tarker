console.log('dis run');
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
        media_story.innerHTML = img + json[i].content;
      }
      else if(json[i].media.substring(0,3) === 'bgm'){
        const aud = document.createElement('audio');
        aud.src = 'res/media/'+json[i].media;
        aud.controls = true;
        media_story.innerHTML = aud + json[i].content;
      }
      else if(json[i].media.substring(0,3) === 'vid'){
        const vid = document.createElement('vid');
        vid.controls = true;
        vid.src = 'res/media/'+json[i].media;
        media_story.innerHTML = vid + json[i].content;
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
      for(let j=0;j<json[i].comment.length;j++){
        const comment_segment = document.createElement('div');
        const comment_writer = document.createElement('p');
        comment_writer.innerText = json[i].comment[j].name;
        const comment_time = document.createElement('p');
        comment_time.innerText = json[i].comment[j].comment_time;
        const comment = document.createElement('p');
        comment.innerText = json[i].comment[j].comment;

        comment_segment.appendChild(comment_writer);
        comment_segment.appendChild(comment_time);
        comment_segment.appendChild(comment);
        commentbox.appendChild(comment_segment);
      }
      commentbox.style.fontSize = 'small';
      commentbox.style.backgroundColor = 'wheat';

      container.appendChild(author_date);
      container.appendChild(media_story);
      container.appendChild(impress);
      container.appendChild(add);
      container.appendChild(see);

      main.appendChild(container);
    }
  });
};
//init functions
grabStory();

//add story
document.querySelectorAll('.add').forEach(x => x.addEventListener('click',evt =>{
  console.log(evt.target.id);
  document.getElementById('popup2').style.display='block';
  document.querySelector('.follow_form').id = 'f'+evt.target.id;

  window.addEventListener('click',(evt)=>{
    if(evt.target.id === 'popup2'){
      document.getElementById('popup2').style.display='none';
    }
  });
}));

document.querySelectorAll('.see').forEach(x => x.addEventListener('click',evt =>{
  console.log(evt.target.id);
  if(document.getElementById('x'+evt.target.id).style.display==='block'){
    document.getElementById('x'+evt.target.id).style.display='none';
  }
  else{
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
  .then((res) => {
  });
}));

//------------------------------------------------------------------------------
//close button turns modal display to none


