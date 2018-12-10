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
    }
    else{
      document.getElementById('signIn-error').innerText = 'YOU ARE NOT SUPPOSED TO BE HERE'
      populate();
    }
  })
});

const populate = ()=>{
  fetch('/userlist')
  .then(res => res.json())
  .then(json =>{
    console.log('get user list');
    console.log(json);
  })
};