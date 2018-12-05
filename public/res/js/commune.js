'use strict';
let name_error = true;
let email_error = true;
let password_error = true;
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
const error_span = document.querySelectorAll('.form-error');
//check user existence when out of focus of name input
nameinput.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(evt.target.value === ''){
    error_span[0].innerText = '*Must have username';
  }
  else{
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
    }).then(
        text => {
          error_span[0].innerText = text;
          name_error = true;
          if (text === 'Username ok.'){
            error_span[0].style.color = 'green';
            name_error = false;
          }
        })
  }
});

//check email existence when out of focus of name input
email.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(evt.target.value === ''){
    error_span[1].innerText = '*Must have email';
  }else{
    fetch('/node/emailcheck', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `email=${evt.target.value}`
    })
    .then(res => res.text())
    .then(text =>{
      error_span[1].innerText = text;
      email_error = true;
      if (text === 'email ok.'){
        error_span[1].style.color = 'green';
        email_error = false;
      }
    })
  }
});

//check password matches retyping
passwordcheck.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(passwordcheck.value !== password.value){
    password.value = '';
    passwordcheck.value = '';
    password.focus();
    password_error = true;
  }
  else{
    password_error = false;
    error_span[2].innerHTML = 'OK';
    error_span[2].style.color = 'green';
    error_span[3].style.color = 'green';
    error_span[3].innerHTML = 'OK';
  }
});

//sign up user to user database
document.querySelector('.sign-up-form')
.addEventListener('submit', evt => {
  evt.preventDefault();
  const username = evt.target.elements['username'].value;
  const email = evt.target.elements['email'].value;
  const password = evt.target.elements['password'].value;
  if(!name_error && !email_error && !password_error){
    fetch('/node/signup/', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `username=${username}&email=${email}&password=${password}`
    })
    .then((res) => res.text())
    .then( text => {
      document.body.innerHTML = text;
    })
  }
});

