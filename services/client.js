const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const api = express();
api.use(bodyParser.json());
api.use(cors());

api.use(express.static(path.join(__dirname, '../client/build')));
// api.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname + '/client/build/index.html'));
// });
api.get('*', function (req, res) {
  res.sendFile(path.join(__dirname, '../client/build', 'index.html'));
});

api.listen(8082, err => {
    if(err){
        console.log('could not start server');
        console.log(err);
        return;
    }
    console.log('server started successfully on port 8082');
});