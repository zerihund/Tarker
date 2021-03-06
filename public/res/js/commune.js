'use strict';
let name_error = true;
let email_error = true;
let password_error = true;

//------------------------------------------------------------------------------
//check the data and check if user is able to submit
const allowSubmit = ()=>{
  console.log('ccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccccc');
  console.log(name_error);
  console.log(email_error);
  console.log(password_error);
  document.getElementById('signUpButton').disabled = !(!name_error &&
      !email_error && !password_error);
};

allowSubmit();
//------------------------------------------------------------------------------
//concerning log in form
document.querySelector('.login-form')
.addEventListener('submit', evt => {
  evt.preventDefault();
  const username = evt.target.elements['username'].value;
  const password = evt.target.elements['password'].value;
  const errorMsg = document.querySelector('#signIn-error');
  fetch('/node/login', {
      method: 'POST',
      headers: new Headers({
        'Content-Type': 'application/x-www-form-urlencoded',
      }),
      body: `username=${username}&password=${password}`
    })
     .then((res) => {
       console.log(res);
       try{
         window.location.replace(res.url);
       }
       catch (e) {
        console.log(e);
       }
    })
});
//concerning sign up form
const nameinput = document.querySelectorAll('.sign-up-form input')[0];
const email = document.querySelectorAll('.sign-up-form input')[1];
const password = document.querySelectorAll('.sign-up-form input')[2];
const passwordcheck = document.querySelectorAll('.sign-up-form input')[3];
const error_span = document.querySelectorAll('.form-error');
//check user existence when out of focus of name input
nameinput.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(evt.target.value === '' ){
    error_span[0].innerText = '*Must have username*';
  }
  else if (evt.target.value.length<3 || evt.target.value.length>15){
    error_span[0].innerText ='*must have at least 3 characters*'
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
          else{
            error_span[0].style.color = '#c61766';
          }
          allowSubmit();
        })
  }
});

//check email existence when out of focus of name input
email.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(evt.target.value === ''){
    error_span[1].innerText = '*Must have email';
  }
  else if(evt.target.value.length<5|| !evt.target.value.includes('@')|| !evt.target.value.includes('.')){
    error_span[1].innerText = '*incorrect email format*';
  }
  else{
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
      if (text === 'email ok'){
        error_span[1].style.color = 'green';
        email_error = false;
      }else{
        error_span[0].style.color = '#c61766';
      }
      allowSubmit();
    })
  }
});
//password check
password.addEventListener('focusout', (evt)=>{
  console.log('focusout on' + evt.target.value);
  if(evt.target.value === ''){
    error_span[2].innerText = '*must have password*';
  }
  else if(evt.target.value.length<5){
    error_span[2].innerText = '*password must be at least 5 characters*';
  }
});
//check password matches retyping
passwordcheck.addEventListener('focusout', (evt) =>{
  console.log('focusout on' + evt.target.value);
  if(passwordcheck.value !== password.value){
    password.value = '';
    passwordcheck.value = '';
    password.focus();
    password_error = false;
  }
  else{
    password_error = false;
    error_span[2].innerHTML = 'OK';
    error_span[2].style.color = 'green';
    error_span[3].style.color = 'green';
    error_span[3].innerHTML = 'OK';
  }
  allowSubmit();
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
      if(text === 'User registered success. Yay!!!!!!'){
        document.getElementById('popup2').style.display = 'none';
        document.getElementById('popup1').style.display = 'block';
      }
      console.log(text);
    })
  }
});

