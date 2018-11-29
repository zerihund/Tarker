//return random integer from 0 to max-1 (array.length -1)
const random = (max)=>{
  Math.floor(Math.random() * max);
};

module.exports = {
  random:random
};