//let likeBtnId,dislikeBtnId,likeAmountDisplay,dislikeAmountDisplay;
const show = (files)=> {

  files.forEach((file) => {

    if(file.mediaType){
      if(file.storyImageUrl){
        showImageStory(file);
      }else{
        showVideoStory(file);
      }

    }else{
      showTextStory(file);
    }

  })
};

const showTextStory = (file)=> {
  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p class="author">${file.author}</p>
       <p class="time">${file.storyDate} </p>
     </div>

     <div class="title"><h2>${file.storyTitle}</h2></div>
     <div class="story">
       <p>${file.story}</p>
       <div class="impression">
    <i id='+${file.storyID}' class="fa fa-thumbs-up" onclick="outerLikeOrNot()"></i>
    <span id='likeAmountOf${file.storyID}' ></span>
    <i id='-${file.storyID}'  class="fa fa-thumbs-down" onclick="outerDislikeOrNot()"></i>
    <span id='dislikeAmountOf${file.storyID}' ></span><script src="res/js/contentLikes.js"></script>
  </div> 
               
     </div>
   </div>

`;
  // createLikeSystem = (theLikeId, theDislikeId, theLikeDisplay, theDislikeDisplay)
  createLikeSystem(`+${file.storyID}`,`-${file.storyID}`,`likeAmountOf${file.storyID}`,`dislikeAmountOf${file.storyID}`);
}

const showVideoStory = (file)=> {

  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p class="author">${file.author}</p>
       <p class="time">${file.storyDate} </p>
     </div>

     <div class="title"><h2>${file.storyTitle}</h2></div>
     <div class="media-story">
       <video controls src="${file.storyVideoUrl}"></video>
       <p>${file.story}
        
      </p>        
     </div>
   </div>

`;
};

function showImageStory(file) {




  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p class="author">${file.author}</p>
       <p class="time">${file.storyDate} </p>
     </div>

     <div class="title"><h2>${file.storyTitle}</h2></div>
     
     <div class="media-story">
       <img  src="${file.storyImageUrl}" alt="random picture">
       <p>${file.story}
       </p>        
     </div>
   </div>

`;
}

fetch('res/js/template.json').then((response)=>{
  return response.json();
}).then((file)=>{
  show(file);

});


/*
* <div class="impression">
    <i id='${likeBtnId}' class="fa fa-thumbs-up" onclick="likeOrNot()"></i>
    <span id='${likeAmountDisplay}' ></span>
    <i id='${dislikeBtnId}'  class="fa fa-thumbs-down" onclick="dislikeOrNot()"></i>
    <span id='${dislikeAmountDisplay}' ></span>
  </div>
* */
/* <div class="impression">
    <i id='+${file.storyID}' class="fa fa-thumbs-up" onclick="likeOrNot()"></i>
    <span id='likeAmountOf${file.storyID}' ></span>
    <i id='-${file.storyID}'  class="fa fa-thumbs-down" onclick="dislikeOrNot()"></i>
    <span id='dislikeAmountOf${file.storyID}' ></span>
  </div> */

/* let likeBtnId=`+${file.storyID}`;
  let dislikeBtnId =`-${file.storyID}`;
  let likeAmountDisplay=`likeAmountOf${file.storyID}`;
  let dislikeAmountDisplay=`dislikeAmountOf${file.storyID}`;*/