//return random integer from 0 to max-1 (array.length -1)
const random = (max)=>{
  Math.floor(Math.random() * max);
};

//zerihund do your wilson thing here :3
//let n be the sample size, and pos be the amount of positive(liked stories in our case score =-1)
// calculates the binomial proportion confidence interval
// lower bound of a bernoulli parameter....we take the lower bound to decide which is story is most liked
const lowerBound = (pos, n) => {
  if (n === 0) {
    return 0
  }
  else {
    //z score for 95% confidence. we can also calculate z using z = Statistics2.pnormaldist(1-(1-confidence)/2) the result is between 1.8 and 1.98
    const z = 1.96;
    const pbound = 1.0 * upvotes / n

    return (pbound + z * z / (2 * n) - z *
        Math.sqrt((pbound * (1 - pbound) + z * z / (4 * n)) / n)) /
        (1 + z * z / n)
  }
}

module.exports = {
  random:random,
  lowerBound:lowerBound,
};