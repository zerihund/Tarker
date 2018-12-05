//-----------------------------------------------------------------------------
const grabStory = ()=>{
  const main = document.querySelector('main');
  fetch('/node/grabstory')
  .then(res => res.json())
  .then(json =>{
    main.innerHTML = '';
    const title = document.createElement('h');
    title.innerText = json[0].title;
    title.style.backgroundColor = 'yellow';
    main.appendChild(title);

    for(let i = 0; i<json.length;i++){
      console.log(json[i]);
      const container = document.createElement('div');
      container.id = json[i].story_Id;
      container.className = 'card';

      const author_date = document.createElement('dive');
      author_date.className = 'author-date';
      const author = document.createElement('p');
      author.className = 'author';
      author.innerText = json[i].author;

      const time = document.createElement('p');
      time.className = 'time';
      time.innerText = json[i].time;
      author_date.appendChild(author);
      author_date.appendChild(time);

      const like = document.createElement('p');
      like.innerText = json[i].like;
      like.style.color = 'blue';

      const dislike = document.createElement('p');
      dislike.innerText = json[i].dislike;
      dislike.style.color = 'red';

      const media_story = document.createElement('div');
      media_story.className = 'media-story';

      const text = document.createElement('p');
      text.innerText = json[i].content;
      text.className = 'story';

      media_story.appendChild(text);
      if(json[i].media.substring(0,3) === 'img'){
        const img = document.createElement('img');
        img.src = 'res/media/'+json[i].media;
        media_story.appendChild(img);
      }
      else if(json[i].media.substring(0,3) === 'bgm'){
        const aud = document.createElement('audio');
        aud.src = 'res/media/'+json[i].media;
        media_story.appendChild(aud);
      }
      else if(json[i].media.substring(0,3) === 'vid'){
        const vid = document.createElement('vid');
        vid.src = 'res/media/'+json[i].media;
        media_story.appendChild(vid);
      }

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
      container.appendChild(like);
      container.appendChild(dislike);
      container.appendChild(commentbox);

      main.appendChild(container);
    }
  });
};
//init functions
grabStory();


//------------------------------------------------------------------------------
//close button turns modal display to none
const loginClose= document.querySelector('#login-close');
loginClose.onclick = (event)=> {
  document.getElementById('popup').style.display = "none";
};
// Get the modal
// When the user clicks anywhere outside of the modal, close it
/**window.onclick = function(event) {
  if (event.target == document.getElementById('popup2')) {
    document.getElementById('popup2').style.display = "none";
  }
};
 */

//toggles the mobile dropdown menu on or off
window.onclick = (event)=> {
  if(event.target == document.getElementById('user-icon')) {
    document.getElementById('login-dropdown').style.display = "block";
  }
  else if(event.target != document.getElementById('user-icon')){
    document.getElementById('login-dropdown').style.display = "none";
  }
};

const signupClose= document.querySelector('#signup-close');
signupClose.onclick = (event)=> {
  document.getElementById('popup2').style.display = "none";
};
const  modalSignUp =document.querySelector("#popup2");

window.onclick =(event)=>{
  if(event.target ===modalSignUp){
    modalSignUp.style.display ="none";
  }
};
