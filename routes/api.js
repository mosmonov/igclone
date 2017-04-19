const express = require('express');
const api = express.Router();
const db = require('sqlite');

// base url /api
api.get('/users',(req, res) => {
  // get list of users //
  db.all('SELECT * FROM Users')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))

});

api.get('/posts', (req, res) => {
  // get list of posts //
  db.all('SELECT * FROM Posts')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))

});

api.get('/follows', (req, res) => {
  // get list of followers table //
  db.all('SELECT * FROM Follows')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))

});

module.exports = api;
