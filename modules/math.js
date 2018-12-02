//return random integer from 0 to max-1 (array.length -1)
const random = (max)=>{
  Math.floor(Math.random() * max);
};

//zerihund do your wilson thing here :3

const lowerBound = (upVotes, n = 0, confidence = 0.95) => {
  if (n === 0) {
    return 0
  }
  else {
    // the widely accepted wilson level
    const z = stats.probit(1 - (1 - confidence) / 2)

    // the fraction of up votes
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