//return random integer from 0 to max-1 (array.length -1)
const random = (max)=>{
  return Math.floor(Math.random() * max);
};

//zerihund do your wilson thing here :3


//random string
const idGenerate = ()=>{
  const string = '0123456789abcdefghijklmnopqrstuvxyz!@#$%^&*';
  let x ='';
  for(let i=0;i<60;i++){
    x += string[random(string.length-1)];
  }
  return x;
};

module.exports = {
  random : random,
  idGenerate : idGenerate
};