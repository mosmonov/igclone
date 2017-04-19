const express = require('express');
const posts = express.Router();
const db = require('sqlite');
const parser = require('body-parser');

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
  db.all(`SELECT followed * FROM follows WHERE user_id = ?`, v)
    .then(v => {
      console.log(v)
      // return res.send(v)
      return db.get('SELECT post * FROM Posts WHERE name = id and post = posts ', [id.lastid])
    })
    .catch(err => console.log(err.stack))
});


module.exports = posts;
