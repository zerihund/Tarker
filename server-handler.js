const express = require('express');
const multer = require('multer');
const db = require('./muodules/data-handler');
const app = express();
const upload = multer({dest: 'upload'});

const connection = db.connect();

app.use(express.static('public'));

app.listen(3000);
console.log('Server init.');