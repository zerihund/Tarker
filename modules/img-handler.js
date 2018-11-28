//for handle image processing on server
//change picture size
'use strict';
const sharp = require('sharp');

const doResize = (filePath, width, newPath, next) => {
  sharp(filePath)
  .resize(width)
  .toFile(newFilePath)
  .then(() => {
    console.log('Resize OK');
    next();
  }).catch(err => {
    console.log(err)
  });
};

module.exports = {
  doResize: doResize,
};