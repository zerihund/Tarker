const sharp = require('sharp');

const resize = (path, width, newPath)=>{
  sharp(path)
    .resize(width)
    .toFile(newPath)
    .then(result =>{
      console.log(result+'xxxx');
    })
    .catch(err =>{
      console.log(err);
  });
};

module.exports ={
  resize: resize,
};