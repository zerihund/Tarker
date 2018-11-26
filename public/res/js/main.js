const show= (files)=> {

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
}

function showTextStory(file) {
  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p id="author">${file.author}</p>
       <p id="time">${file.storyDate} </p>
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

function showVideoStory(file) {
  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p id="author">${file.author}</p>
       <p id="time">${file.storyDate} </p>
     </div>

     <div class="title"><h2>${file.storyTitle}</h2></div>
     <div class="media-story">
       <video controls src="${file.storyVideoUrl}"></video>
       <p>${file.story}

      </p>
     </div>
   </div>

`;
}

function showImageStory(file) {
  document.querySelector('.main').innerHTML += `
  <div class="card">

     <div class="author-date">
       <p id="author">${file.author}</p>
       <p id="time">${file.storyDate} </p>
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



    fetch('template.json').then((response)=>{
      return response.json();
    }).then((file)=>{
      show(file);
    })
