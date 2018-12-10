document.querySelector('.login-form').addEventListener('submit', evt => {
  evt.preventDefault();
  const name = evt.target[1];
  const password  = evt.target[3];
  fetch('/node/moderatorlog', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `name=${name}&password=${password}`
  }).then(res=>res.text()).then(text => {
    console.log(text);
    if(text === 'allowed'){
      alert(`Welcome moderator ${name}`);
      document.getElementById('popup').style.display = 'none';
      populate();
    }
    else{
      document.getElementById('signIn-error').innerText = 'YOU ARE NOT SUPPOSED TO BE HERE'
    }
  })
});

const populate = ()=>{
  fetch('/node/userlist/')
  .then(res => res.json())
  .then(userlist => {
    console.log('get user list');
    console.log(userlist);
    showUser(userlist);

    fetch('/node/storylist/').then(res => res.json())
    .then(story => {
      console.log('get story list');
      console.log(story);

      fetch('/node/commentlist/')
      .then(res=>res.json())
      .then(commentlist =>{
          console.log('get comment');
          console.log(commentlist);
        }
      )
    })
  })
};

const showUser = (userlist) =>{
  const main = document.getElementById('userlist');
  main.innerHTML ='';
  userlist.forEach(x => {
    const card = document.createElement('div');
    const username = document.createElement('p');
    username.innerText = x.name;
    const rmbutton = document.createElement('button');
    rmbutton.id = x.user_Id;

    card.appendChild(username);
    card.appendChild(rmbutton);
    main.appendChild(card);
  })
};
