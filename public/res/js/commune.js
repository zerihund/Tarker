'use strict';
//------------------------------------------------------------------------------
//concerning log in form
document.querySelector('.login-form')
.addEventListener('submit', evt => {
  evt.preventDefault();
  const username = evt.target.elements['username'].value;
  const password = evt.target.elements['password'].value;
  fetch('/node/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `username=${username}&password=${password}`
    })
    .then((res) => res.text())
    .then(text => console.log(text))
});


//------------------------------------------------------------------------------
//concerning sign up form
const nameinput = document.querySelectorAll('.sign-up-form input')[0];
const email = document.querySelectorAll('.sign-up-form input')[1];
const password = document.querySelectorAll('.sign-up-form input')[2];
const passwordcheck = document.querySelectorAll('.sign-up-form input')[3];

//check user existence when out of focus of name input
nameinput.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  fetch('/node/usercheck', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `username=${evt.target.value}`
  })
  .then(res => {
    console.log(res);
    return res.text();
  }).then(text => console.log(text))
});

//check email existence when out of focus of name input
email.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  fetch('/node/emailcheck', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `email=${evt.target.value}`
  })
  .then(res => res.text())
  .then(text =>{
    console.log(text);
  })
});

//check password matches retyping
passwordcheck.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(passwordcheck.value != password.value){
    password.value = '';
    passwordcheck.value = '';
    password.focus();
  }
});

//sign up user to user database
document.querySelector('.sign-up-form')
.addEventListener('submit', evt => {
  evt.preventDefault();
  const username = evt.target.elements['username'].value;
  const email = evt.target.elements['email'].value;
  const password = evt.target.elements['password'].value;
  fetch('/node/signup/', {
    method: 'POST',
    headers: new Headers({
      'Content-Type': 'application/x-www-form-urlencoded',
    }),
    body: `username=${username}&email=${email}&password=${password}`
  })
  .then((res) => res.text())
  .then( text => {
    console.log(text);
  })
});

//------------------------------------------------------------------------------