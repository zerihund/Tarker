//for handle image processing on server
//change picture size

const sharp = require('sharp');
const resize = (filepath, width, newfilepath) =>{
  sharp(filepath)
      .resize(width)
      .toFile(newfilepath);

};