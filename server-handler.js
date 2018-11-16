const express = require('express');
const multer = require('multer');
const app = express();
const upload = multer({dest: 'upload'});

app.use(express.static('public'));
app.get('/', (req, res)=>{
  res.send(':v :v :v');
});
app.post('/ask', (req, res)=>{
  res.send('answered');
  console.log('asked');
});

app.listen(3000);
console.log('Server init.');