const express = require('express');
const api = express.Router();
const db = require('sqlite');
const parser = require('body-parser');

// middleware
api.use(parser.urlencoded({
    extended: true
}));
api.use(parser.json());


// create new post
api.post('/create', (req, res) => {
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
api.get('/feed', (req, res) => {
  const payload = {}
  const userId = req.session.passport.user.id

  const userInfo =   db.get(`SELECT
                              id,
                              username,
                              f_name,
                              l_name,
                              bio
                            FROM
                              Users
                            WHERE
                              id = ${userId}`)
                      .then(v => {
                        return v
                      })
                      .catch(err => console.log(err.stack))

  const feedData = db.all(`SELECT
                            Follows.user_id as fuser_id,
                            Follows.followed as fid,
                            Users.username as uname,
                            Posts.url as purl,
                            Posts.description as pdesc
                          FROM Follows
                          INNER JOIN
                            Users ON Follows.user_id = Users.id
                          INNER JOIN
                            Posts ON Follows.followed = Posts.user_id
                          WHERE
                            Follows.followed = ${userId}`) //taking the params from the request and parsing it in.
                .then(v => {
                  return v
                })
                .catch(err => console.log(err.stack))

  Promise.all([userInfo,feedData]).then(v => {
    payload.user = v[0];
    payload.feed = v[1];
    console.log(payload)
    res.send(payload)
  });
});


module.exports = api;
