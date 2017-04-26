const express = require('express');
const profile = express.Router();
const db = require('sqlite');
const parser = require('body-parser');

profile.use(parser.urlencoded({
    extended: true
}));
profile.use(parser.json());

// base url /profile
profile.get('/', (req, res) => {
  const payload = {}
  const userId = req.session.passport.user.id
  const userInfo =  db.get(`SELECT
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

  const userPosts = db.all(`SELECT
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


  Promise.all([userInfo ,userPosts]).then(v => {
    payload.user = v[0];
    payload.posts = v[1];
    console.log(payload)
    res.send(payload)
  })
  .catch(err => console.log(err.stack));
});

module.exports = profile;
