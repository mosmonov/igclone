const express = require('express');
const posts = express.Router();
const db = require('sqlite');
const parser = require('body-parser');

const AUTH = require('../middleware/auth.js')

console.log(AUTH)

// middleware
posts.use(parser.urlencoded({
    extended: true
}));
posts.use(parser.json());

// get posts by USER ID
posts.get('/:userid', (req, res) => {
  // get list of users //
  const username = req.params.userid
  db.get(`SELECT id FROM Users WHERE email = ?`, username)
    .then(v => {
      console.log(v)
      // res.send(v)
      return v;
    })
    .then(v => {
      return db.get('SELECT * FROM Posts WHERE user_id = ?', v)
    })
    .then(userPosts => {
      console.log("here!" + userPosts);
    })
    .catch(err => console.log(err.stack))
});

// create posts from form
posts.post('/create', (req, res) => {
  // get list of users //
  // console.log('here')
  const user = req.body.userid;
  const image = req.body.image;
  const words = req.body.summary;

  console.log( user + " " + image + " " + words)

  db.get("SELECT * FROM Posts")
    .then(() => {
      db.exec(`INSERT INTO Posts (user_id, description, url) VALUES ('${user}','${words}','${image}')`)
    })
    .catch(err => console.log(err.stack))
});

// get posts of followed users
posts.get('/:userid/feed', (req, res) => {
  // get list of users //
  db.all(`SELECT Follows.user_id as fuser_id,
      Follows.followed as fid,
      Users.username as uname,
      Posts.url as purl,
      Posts.description as pdesc
      FROM Follows 
     INNER JOIN Users ON Follows.user_id = Users.id
     INNER JOIN Posts ON Follows.followed = Posts.user_id
      WHERE user.id = ${req.params.userid}`) //taking the params from the request and parsing it in. 
    .then(v => {
      console.log()
      // return res.send(v)
      // return db.get('SELECT post * FROM Posts WHERE name = id and post = posts ', [])
    })
    .catch(err => console.log(err.stack))
});


module.exports = posts;
