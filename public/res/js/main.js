//grab story index.html version-------------------------------------------------
const grabStory = ()=>{
  console.log('dis run 2');
  const main = document.querySelector('main');
  fetch('/node/grabstory')
  .then(res => res.json())
  .then(json =>{
    main.innerHTML = '';
    document.querySelector('h1').innerText = json[0].title;
    for(let i = 0; i<json.length;i++)
    {
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
          `<i id='+${json[i].story_Id}' class="fa fa-caret-up"></i>
          <span>${json[i].like}</span>
          <i id='-${json[i].story_Id}' class="fa fa-caret-down"></i>
          <span>${json[i].dislike}</span>`;

      const add = document.createElement('button');
      add.className = 'add';
      add.innerText = '+';
      add.id = 'add'+json[i].story_Id;
      add.addEventListener('click',evt =>{

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

      container.appendChild(author_date);
      container.appendChild(media_story);
      container.appendChild(impress);
      container.appendChild(add);
      container.appendChild(see);
      container.appendChild(commentbox);
      main.appendChild(container);
    }
  })
};

grabStory();
//------------------------------------------------------------------------------
//close button turns modal display to none
document.querySelector('#login-close').onclick = (event)=> {
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
  if(event.target === document.getElementById('user-icon')) {
    document.getElementById('login-dropdown').style.display = "block";
  }
  else if(event.target !== document.getElementById('user-icon')){
    document.getElementById('login-dropdown').style.display = "none";
  }
};
//close the sign up form
document.querySelector('#signup-close').onclick = ()=> {
  document.getElementById('popup2').style.display = "none";
};

window.onclick =(event)=>{
  if(event.target.id === 'popup2'){
    document.getElementById("popup").style.display ="none";
    document.getElementById("popup2").style.display ="none";
  }
  else if (event.target.id === 'popup'){
    document.getElementById("popup").style.display ="none";
    document.getElementById("popup2").style.display ="none";
  }
};

document.querySelector('#random').addEventListener('click',()=>{
  grabStory();
});




