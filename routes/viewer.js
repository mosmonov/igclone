const express = require('express');
const viewer = express.Router();
const db = require('sqlite');


// base url /viewer
viewer.get('/users',(req, res) => {

  db.all('SELECT * FROM Users')
    .then(v => {
      console.log('here')
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});

viewer.get('/posts', (req, res) => {
  // get list of posts //
  db.all('SELECT * FROM Posts')
    .then(v => {
      // console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});

viewer.get('/follows', (req, res) => {
  // get list of followers table //
  db.all('SELECT * FROM Follows')
    .then(v => {
      // console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});

module.exports = viewer;
