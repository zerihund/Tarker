document.querySelector('div').addEventListener('click',()=>{
  {
    fetch('http://10.114.32.123/node/ask',{
      method: 'POST'
    }).then(res => {console.log(res);})
  }
})