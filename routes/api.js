const express = require('express');
const api = express.Router();
const db = require('sqlite')

// base url /api
api.get('/users', (req, res) => {
  // get list of users //
  db.get("SELECT * FROM Users")
    .then(v => {
      console.log(v)
      res.send(v)
    })
    .catch(err => console.log(err.stack))

});

module.exports = api;
