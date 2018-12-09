let  thumbsUp ,thumbsDown,dislikeDisplay,likeDisplay,numOfLikes,numOfDislikes;



  console.log(`like system made for ${theLikeId}`);
  numOfLikes = 0;
  numOfDislikes = 0;
  likeDisplay = document.getElementById(`${theLikeDisplay}`);//Todo: dynamic value
  likeDisplay.innerHTML = numOfLikes;
  dislikeDisplay = document.getElementById(`${theDislikeDisplay}`);//Todo: dynamic value
  dislikeDisplay.innerHTML = numOfDislikes;
  thumbsUp = document.getElementById(`${theLikeId}`);//Todo: dynamic value
  thumbsDown = document.getElementById(`${theDislikeId}`);//Todo: dynamic value

  let likeExecuted = false;
  let dislikeExecuted = false;

  let likeDatabaseValue = 0;
  const likeValueToDb = () => {
    likeDatabaseValue = numOfLikes + numOfDislikes;
    if (likeDatabaseValue == 1 && numOfDislikes == 1) {
      likeDatabaseValue = -1;

    }
    console.log(`likeDatabaseValue = ${likeDatabaseValue}`);
    sendToDb();
  };
//adds 1 each time you click like
  let likable = 0;
//modulo determines whether its a like or unlike
  let likeModulo = 0;
//adds 1 each time you click dislike
  let dislikable = 0;
//modulo determines whether its a dislike or undislike
  let dislikeModulo = 0;
//this value determines if its the first opinion or subsequent opinion
// i.e insert to database or update database. updated after each action
  let insertOrUpdateCounter = likable + dislikable;

//shows on webpage number of likes
  const showLike = () => {
    likeDisplay.innerHTML = numOfLikes;
  };
  const blueLike = () => {
    thumbsUp.style.color = "blue";
  };
  const unBlueLike = () => {
    thumbsUp.style.color = "black";
  };

//shows on webpage number of dislikes
  const showDislike = () => {
    dislikeDisplay.innerHTML = numOfDislikes;
  }
  const redDislike = () => {
    thumbsDown.style.color = "red";
  };
  const unRedDislike = () => {
    thumbsDown.style.color = "black";
  };
  const addLike = () => {
    likeExecuted = true;
    numOfLikes++;
    showLike();
    blueLike();
  };

  const addDislike = () => {
    dislikeExecuted = true;
    numOfDislikes++;
    showDislike();
    redDislike();
  };
  const removeLike = () => {
    likeExecuted = false;
    numOfLikes--;
    showLike();
    unBlueLike();
  };
  const removeDislike = () => {
    dislikeExecuted = false;
    numOfDislikes--;
    showDislike();
    unRedDislike();
  };
  /**like only happens if like.executed= false.
   if i like, like.executed= true and i cant like again, then add 1 to likes.
   if dislike is true (meaning they had first disliked), make dislike.executed=false;
   and if dislike.executed is true at that point then subtract 1 from dislikes and set it to false
   display dislike- basically do nothing
   if dislike.executed is not true then that means they haven't disliked before
   liking and so i don't have to subtract from the dislike.
   */
  const like = () => {
    //add to like
    if (likeExecuted === false) {
      addLike();
    }
    //remove dislike
    if (dislikeExecuted === true) {
      removeDislike();
    }
    insertOrUpdateCounter++;
    console.log(insertOrUpdateCounter);
    likeValueToDb();
  };

  /**dislike only happens if dislike.executed=false.
   if i dislike, set dislike.executed=true and add 1 to dislike.

   in that instance of disliking, if they had already liked, i.e like.executed= true
   then set like.executed=false and subtract 1 from likes and then display it.
   if like.executed=false then they havent liked it prior and no subtraction is
   necessary from the num of liked
   */
  const dislike = () => {
    //dislike
    if (dislikeExecuted === false) {
      addDislike();
    }

    //remove like
    if (likeExecuted === true) {
      //unlike();
      removeLike();
    }
    insertOrUpdateCounter++;
    console.log(insertOrUpdateCounter);
    likeValueToDb();
  };
  /*you can only unlike if it has been liked
  i.e likeExecuted=true
  */
  const unlike = () => {
    if (likeExecuted === true) {
      removeLike();
    }
    insertOrUpdateCounter++;
    console.log(insertOrUpdateCounter);
    likeValueToDb();
  };
  /*You can only undislike if you have disliked
  */
  const unDislike = () => {
    if (dislikeExecuted === true) {
      removeDislike();
    }
    insertOrUpdateCounter++;
    console.log(insertOrUpdateCounter);
    likeValueToDb();
  };

  const likeOrNot = () => {
    if (likeModulo === 1) {
      unlike();
    }
    else if (likeModulo == 0) {
      like();
    }
    likable++;
    likeModulo = likable % 2;
  };

//increases likable each time it is clicked so we know is it a like or unlike
  const dislikeOrNot = () => {
    if (dislikeModulo == 1) {
      unDislike();
    }
    else if (dislikeModulo == 0) {
      dislike();
    }
    dislikable++;
    dislikeModulo = dislikable % 2;
  };
//fetch sends to server-handler.js 'opinion'
  const sendToDb = (storyid, value) => {
    fetch('/node/opinion/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      //Todo:storyID must be changed to dynamic value, and also userId
      body: `firstLike=${insertOrUpdateCounter}&userId=11&likeDatabaseValue=${value}&storyID=${storyid}`
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
    evt.target.className = 'fa fa-caret-down clicked'
  }
  else{
    sendToDb(storyId, 0);
    evt.target.className = 'fa fa-caret-down unclicked'
  }
}));

document.querySelectorAll('.fa-caret-up').forEach(button => button.addEventListener('click', evt =>{
  console.log(evt.target.id);
  const storyId  = evt.target.id.substring(1);
  if(evt.target.className === 'fa fa-caret-up unclicked'){
    sendToDb(storyId, 1);
    evt.target.className = 'fa fa-caret-up clicked'
  }
  else{
    sendToDb(storyId, 0);
    evt.target.className = 'fa fa-caret-up unclicked'
  }
}));};

/*--------------------------------------------------------------------------------------------------------------*/
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

      const impress = document.createElement('div');
      impress.className = 'impression';
      let likeBtnId=`+${json[i].story_Id}`;
      let dislikeBtnId =`-${json[i].story_Id}`;
      let likeAmountDisplay=`likeAmountOf${json[i].story_Id}`;
      let dislikeAmountDisplay=`dislikeAmountOf${json[i].story_Id}`;

      impress.innerHTML =
          `<i id='${likeBtnId}' class="fa fa-caret-up unclicked" onclick="likeOrNot()"></i>
          <span id='${likeAmountDisplay}' >${json[i].like}</span>
          <i id='${dislikeBtnId}' class="fa fa-caret-down unclicked" onclick="dislikeOrNot()"></i>
          <span id='${dislikeAmountDisplay}' >${json[i].dislike}</span> <script src="res/js/contentLikes.js"></script>`;
      /** I put this function to run each time one of these are created*/




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
      return 0;
    }
  }).then(x =>{
    getform();
    addFunctoLike();
  });

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
});
//add story to chosen story
document.querySelector('#liked').addEventListener('click',()=>{
  console.log('get liked story');
});

//call up form for creating original story
document.querySelector('#create').addEventListener('click',()=>{
  document.getElementById('popup1').style.display='block'
});
//Todo: copy the for each and the fetch for the

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


