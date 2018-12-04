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
       <p>
       ${file.story} 
      </p>        
     </div>
   </div>

`;
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

//close button turns login's display to none
const loginClose= document.querySelector('#login-close');
loginClose.onclick = (event)=> {
  document.getElementById('popup').style.display = "none";
};

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