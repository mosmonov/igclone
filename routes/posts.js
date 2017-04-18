const express = require('express');
const posts = express.Router();
const db = require('sqlite');

// get posts by USER ID
posts.get('/:userid/posts', (req, res) => {
  // get list of users //
  db.all('SELECT * FROM Users')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});

// create posts by USER ID
posts.post('/:userid/posts', (req, res) => {
  // get list of users //
  db.all('SELECT * FROM Users')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});

// get posts of followed users
posts.get('/:userid/feed', (req, res) => {
  // get list of users //
  db.all('SELECT * FROM Users')
    .then(v => {
      console.log(v)
      return res.send(v)
    })
    .catch(err => console.log(err.stack))
});


module.exports = posts;
