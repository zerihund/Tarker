const giveContent =(username, id)=>{
  return `
<!-- <div style="width: 30px; display: block">Test</div> -->
<div class="topnav">
    <div class="topnav-left">
      <img class = "logo" src="res/media/logo/logo.png" alt="logo">
        <form class="topnav-searchbar-form" action="" method="get">
            <input class="search-input" type="text" placeholder="search" name="search">
            <button class="search-btn" type="submit"><i class="fa fa-search"></i></button>
        </form>

    </div>
    <div class="topnav-right">
        <div id="login-dropdown" class="login-dropdown">
            <ul class="login-dropdown-content">
                <li href="#smth">some function</li>
                <li href="#smth">some function</li>
            </ul>

        </div>
        <img src="res/media/profilepic/default.png" alt="profile pic">
        <p id="username">${username}</p>
        <button id="user-icon" class="user-icon">
            <i class="fa fa-caret-down fa-2x " aria-hidden="true"></i>
        </button>
    </div>
</div>
<aside>
  <button id="random">RANDOM</button>
  <button id="liked">LIKED</button>
  <button id="create">CREATE</button>
</aside>

<h1>The Sound And The Fury</h1>
<main id="${id}">
    <div class="card">
      <div class="author-date">
        <p>William Faulkner</p>
        <p>-</p>
        <p>1929</p>
      </div>
      <p class="media-story">
          Through the fence, between the curling flower spaces, I could see them
          hitting. They were coming toward where the flag was and I went along the
          fence. Luster was hunting in the grass by the flower tree. They took the flag
          out, and they were hitting. Then they put the flag back and they went to the
          table, and he hit and the other hit. Then they went on, and I went along the
          fence. Luster came away from the flower tree and we went along the fence
          and they stopped and we stopped and I looked through the fence while
          Luster was hunting in the grass.
      </p>
      <div class="impression">
        <i class="fa fa-caret-up" onclick="likeOrNot()"></i>
        <span >50</span>
        <i class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
        <span>600</span>
      </div>
      <button class="add" id="add1">+</button>
      <button class="see" id="see1">...</button>
      <div class="comment-box" id="xsee1">
        <div class="comment-container">
          <div class="comment">
            <p class="commenter">Silvia</p>
            <p class="comment-time">1930</p>
            <p class="comment-text">I understand nothing</p>
          </div>
          <div class="comment">
            <p class="commenter">Kissa</p>
            <p class="comment-time">1931</p>
            <p class="comment-text">U suck Silvia</p>
          </div>
          <div class="comment">
            <p class="commenter">Koira</p>
            <p class="comment-time">1932</p>
            <p class="comment-text">U suck Kissa</p>
          </div>
          <div class="comment">
            <p class="commenter">Silvia</p>
            <p class="comment-time">09/12/1933</p>
            <p class="comment-text">You want past this wall? Pay respects to this video. Treat this video like your favorite of them all.﻿</p>
          </div>
          <div class="self-comment">
            <p class="self-commenter">Alexander</p>
            <p class="self-comment-time">09/13/1933</p>
            <p class="comment-text">I am become death. Destroyer of World</p>
          </div>
        </div>
        <form class="write-comment" enctype="multipart/form-data" id="fxsee1">
          <input type="text" name="usercomment">
          <button type="submit"> > </button>
        </form>
      </div>
    </div>

  <div class="card">
    <div class="author-date">
      <p>William Faulkner</p>
      <p>-</p>
      <p>1929</p>
    </div>
    <p class="media-story">
      Here, caddie." He hit. They went away across the pasture. I held to the
      fence and watched them going away.<br>
      "Listen at you, now." Luster said. "Aint you something, thirty three years
      old, going on that way. After I done went all the way to town to buy you
      that cake. Hush up that moaning. Aint you going to help me find that
      quarter so I can go to the show tonight."<br>
      They were hitting little, across the pasture. I went back along the fence to
      where the flag was. It flapped on the bright grass and the trees.<br>
      "Come on." Luster said. "We done looked there. They aint no more coming
      right now. Les go down to the branch and find that quarter before them
      niggers finds it."<br>
      It was red, flapping on the pasture. Then there was a bird slanting and
      tilting on it. Luster threw. he flag flapped on the bright grass and th
      e trees. I held to the fence.
    </p>
    <div class="impression">
      <i class="fa fa-caret-up" onclick="likeOrNot()"></i>
      <span>400</span>
      <i class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
      <span>60</span>
    </div>
    <button class="add" id="add2">+</button>
    <button class="see" id="see2">...</button>
    <div class="comment-box" id="xsee2">
      <div class="comment-container">
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">1930</p>
          <p class="comment-text">I understand nothing</p>
        </div>
        <div class="comment">
          <p class="commenter">Kissa</p>
          <p class="comment-time">1931</p>
          <p class="comment-text">U suck Silvia</p>
        </div>
        <div class="comment">
          <p class="commenter">Koira</p>
          <p class="comment-time">1932</p>
          <p class="comment-text">U suck Kissa</p>
        </div>
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">09/12/1933</p>
          <p class="comment-text">You want past this wall? Pay respects to this video. Treat this video like your favorite of them all.﻿</p>
        </div>
        <div class="self-comment">
          <p class="self-commenter">Alexander</p>
          <p class="self-comment-time">09/13/1933</p>
          <p class="comment-text">I am become death. Destroyer of World</p>
        </div>
      </div>
      <form class="write-comment" enctype="multipart/form-data" id="fxsee2">
        <input type="text" name="usercomment">
        <button type="submit"> > </button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="author-date">
      <p>William Faulkner</p>
      <p>-</p>
      <p>1929</p>
    </div>
    <p class="media-story">

        <img src="res/media/img/cake.jpg" alt="cake">
        "Shut up that moaning." Luster said. "I cant make them come if they aint coming, can I.
        If you dont hush up, mammy aint going to have no birthday for you. If you dont hush,
        you know what I going to do. I going to eat that
        cake all up. Eat them candles, too. Eat all them thirty three candles. Come
        on, n find
        one of they balls. Here. Here they is. Way over yonder. See." He came to
        the fence and pointed his arm. "See them. They aint coming back here no
        more. Come on.

    </p>
    <div class="impression">
      <i class="fa fa-caret-up" onclick="likeOrNot()"></i>
      <span>20</span>
      <i class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
      <span>60</span>
    </div>
    <button class="add" id="add3">+</button>
    <button class="see" id="see3">...</button>
    <div class="comment-box" id="xsee3">
      <div class="comment-container">
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">1930</p>
          <p class="comment-text">I understand nothing</p>
        </div>
        <div class="comment">
          <p class="commenter">Kissa</p>
          <p class="comment-time">1931</p>
          <p class="comment-text">U suck Silvia</p>
        </div>
        <div class="comment">
          <p class="commenter">Koira</p>
          <p class="comment-time">1932</p>
          <p class="comment-text">U suck Kissa</p>
        </div>
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">09/12/1933</p>
          <p class="comment-text">You want past this wall? Pay respects to this video. Treat this video like your favorite of them all.﻿</p>
        </div>
        <div class="self-comment">
          <p class="self-commenter">Alexander</p>
          <p class="self-comment-time">09/13/1933</p>
          <p class="comment-text">I am become death. Destroyer of World</p>
        </div>
      </div>
      <form class="write-comment" enctype="multipart/form-data" id="fxsee3">
        <input type="text" name="usercomment">
        <button type="submit"> > </button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="author-date">
      <p>William Faulkner</p>
      <p>-</p>
      <p>1929</p>
    </div>

      <p class="media-story">
        <video controls>
          <source src="res/media/vid/2017.mp4" type="video/mp4">
        </video>
        We went along the fence and came to the garden fence, where our shadows
        were. My shadow was higher than Luster's on the fence. We came to the
        hroken place and went through it.
      </p>

    <div class="impression">
      <i class="fa fa-caret-up" onclick="likeOrNot()"></i>
      <span>20</span>
      <i class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
      <span>60</span>
    </div>
    <button class="add" id="add4">+</button>
    <button class="see" id="see4">.</button>
    <div class="comment-box" id="xsee4">
      <div class="comment-container">
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">1930</p>
          <p class="comment-text">I understand nothing</p>
        </div>
        <div class="comment">
          <p class="commenter">Kissa</p>
          <p class="comment-time">1931</p>
          <p class="comment-text">U suck Silvia</p>
        </div>
        <div class="comment">
          <p class="commenter">Koira</p>
          <p class="comment-time">1932</p>
          <p class="comment-text">U suck Kissa</p>
        </div>
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">09/12/1933</p>
          <p class="comment-text">You want past this wall? Pay respects to this video. Treat this video like your favorite of them all.﻿</p>
        </div>
        <div class="self-comment">
          <p class="self-commenter">Alexander</p>
          <p class="self-comment-time">09/13/1933</p>
          <p class="comment-text">I am become death. Destroyer of World</p>
        </div>
      </div>
      <form class="write-comment" enctype="multipart/form-data" id="fxsee4">
        <input type="text" name="usercomment">
        <button type="submit"> > </button>
      </form>
    </div>
  </div>

  <div class="card">
    <div class="author-date">
      <p>William Faulkner</p>
      <p>-</p>
      <p>1929</p>
    </div>
    <p class="media-story">
      <audio controls>
        <source src="res/media/bgm/mysixth.mp3" type="audio/mp3">
      </audio>
        "Wait a minute." Luster said. "You snagged on that nail again. Cant you
        never crawl through here without snagging on that nail."<br>
        Caddy uncaught me and we crawled through. Uncle Maury said to not let
        anybody see us, so we better stoop over, Caddy said. Stoop over, Benjy. Like this, see.
        We stooped over and crossed the garden, where the flowers
        rasped and rattled against us. The ground was hard. We climbed the
        fence, where the pigs were grunting and snuffing. I expect they're sorry
        because one of them got killed today, Caddy said. The ground was hard,
        churned and knotted. Keep your hands in your pockets, Caddy said. Or
        they'll get froze. You dont want your hands froze on Christmas, do you.
    </p>
    <div class="impression">
      <i class="fa fa-caret-up" onclick="likeOrNot()"></i>
      <span>20</span>
      <i class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
      <span>60</span>
    </div>
    <button class="add" id="add5">+</button>
    <button class="see" id="see5">...</button>
    <div class="comment-box" id="xsee5">
      <div class="comment-container">
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">1930</p>
          <p class="comment-text">I understand nothing</p>
        </div>
        <div class="comment">
          <p class="commenter">Kissa</p>
          <p class="comment-time">1931</p>
          <p class="comment-text">U suck Silvia</p>
        </div>
        <div class="comment">
          <p class="commenter">Koira</p>
          <p class="comment-time">1932</p>
          <p class="comment-text">U suck Kissa</p>
        </div>
        <div class="comment">
          <p class="commenter">Silvia</p>
          <p class="comment-time">09/12/1933</p>
          <p class="comment-text">You want past this wall? Pay respects to this video. Treat this video like your favorite of them all.﻿</p>
        </div>
        <div class="self-comment">
          <p class="self-commenter">Alexander</p>
          <p class="self-comment-time">09/13/1933</p>
          <p class="comment-text">I am become death. Destroyer of World</p>
        </div>
      </div>
      <form class="write-comment" enctype="multipart/form-data" id="fxsee5">
        <input type="text" name="usercomment">
        <button type="submit"> > </button>
      </form>
    </div>
  </div>
</main>

<section id="popup2" class="modal modal2 ">
  <form id="14" enctype="multipart/form-data" method="post" class="follow_form">
    <input type="file" name="media" accept="media">
    <textarea name="story"></textarea>
    <input type="submit">
  </form>
</section>

<section id="popup1" class="modal modal2 ">
  <form id="0" enctype="multipart/form-data" method="post" class="follow_form">
    <input type="file" name="media" accept="media">
    <input type="text" name="title">
    <textarea name="story"></textarea>
    <input type="submit">
  </form>
</section>
<script>
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
        media_story.innerHTML = \`<img src="res/media/${json[i].media}" alt="cake">${json[i].content}\`;
      }
      else if(json[i].media.substring(0,3) === 'bgm'){
        media_story.innerHTML = \`
          <audio controls>
            <source src="res/media/${json[i].media}" type="audio/mp3">
          </audio>${json[i].content}\`;
      }
      else if(json[i].media.substring(0,3) === 'vid'){
        media_story.innerHTML = \`
          <video controls>
            <source src="res/media/${json[i].media}" type="video/mp4">
          </video>${json[i].content}\`;
      }
      else{
        media_story.innerHTML = json[i].content;
      }

      const impress = document.createElement('div');
      impress.className = 'impression';
      impress.innerHTML =
          \`<i id='+${json[i].story_Id}' class="fa fa-caret-up" onclick="likeOrNot()"></i>
          <span>${json[i].like}</span>
          <i id='-${json[i].story_Id}' class="fa fa-caret-down" onclick="dislikeOrNot()"></i>
          <span>${json[i].dislike}</span>\`;

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
      commentbox.id = \`xsee${json[i].story_Id}\`;
      commentbox.className = 'comment-box';
      const comment_container = document.createElement('div');
      comment_container.className = 'comment-container';
      comment_container.id = \`xseek${json[i].story_Id}\`;
      json[i].comment.forEach(x =>{
        if(x.name !== document.querySelector('#username').value){
          comment_container.innerHTML+=\`<div class="comment">
            <p class="commenter">${x.name}</p>
            <p class="comment-time">${x.comment_time}</p>
            <p class="comment-text">${x.comment}</p>
          </div>\`
        }
        else{
          comment_container.innerHTML+=\`<div class="comment">
            <p class="self-commenter">${x.name}</p>
            <p class="self-comment-time">${x.comment_time}</p>
            <p class="self-comment">${x.comment}</p>
          </div>\`
        }
      });
      commentbox.appendChild(comment_container);
      commentbox.innerHTML +=
          \`<form class="write-comment" enctype="multipart/form-data" id="fxsee${json[i].story_Id}">
            <input type="text" name="usercomment">
            <button type="submit"> > </button>
          </form>\`;

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
      body: \`storyid=${storyid}&userid=${userid}&usercomment=${fd.get(
      'usercomment')}\`
    })
    .then((res) => res.json())
    .then(json =>{
      console.log(json);
      const commentContainer = document.getElementById(\`xseek${storyid}\`);
      //commentContainer.innerHTML = '';
      json.forEach(x =>{
        if(x.name !== document.querySelector('#username').value){
          commentContainer.innerHTML+=\`<div class="comment">
            <p class="commenter">${x.name}</p>
            <p class="comment-time">${x.comment_time}</p>
            <p class="comment-text">${x.comment}</p>
          </div>\`
        }
        else{
          commentContainer.innerHTML+=\`<div class="comment">
            <p class="self-commenter">${x.name}</p>
            <p class="self-comment-time">${x.comment_time}</p>
            <p class="self-comment">${x.comment}</p>
          </div>\`
        }
      })
    });
  });
})};
</script>`
};

module.exports = {
  giveContent:giveContent
};