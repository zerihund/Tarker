//return random integer from 0 to max-1 (array.length -1)
const random = (max)=>{
  Math.floor(Math.random() * max);
};

//zerihund do your wilson thing here :3
//let n be the sample size, and pos be the amount of positive(liked stories in our case score =-1)
// calculates the binomial proportion confidence interval
// lower bound of a bernoulli parameter....we take the lower bound to decide which is story is most liked
const wilson = (pos, n) => {
  if (n === 0) {
    return 0
  }
  else {
    //z score for 95% confidence. we can also calculate z using z = Statistics2.pNormalDist(1-(1-confidence)/2) the result is between 1.64 and 2.3
    //for simplicity we use 1.96 most known approximation
    const z = 1.96;
    const pBound = pos/ n;

    return (pBound + z * z / (2 * n) - z *
        Math.sqrt((pBound * (1 - pBound) + z * z / (4 * n)) / n)) /
        (1 + z * z / n)
  }
};

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