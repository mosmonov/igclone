const express = require('express');
const profile = express.Router();
const db = require('sqlite');
const parser = require('body-parser');

profile.use(parser.urlencoded({
    extended: true
}));
profile.use(parser.json());

// base url /profile
profile.get('/:user', (req, res) => {
  // get list of users //
  const username = req.params.user;
  db.get("SELECT * FROM Users WHERE email = ?" , username)
    .then(userInfo => {
      // console.log(v)
      res.send({userInfo})
      // values to display in front end for editing in profile
      console.log(userInfo.id)
      console.log(userInfo.email)
      console.log(userInfo.f_name)
      console.log(userInfo.l_name)
      console.log(userInfo.l_name)
    })
    .catch(err => console.log(err.stack))
});

module.exports = profile;
