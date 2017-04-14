const express = require('express');
const login = express.Router();
const passport = require('../middleware/auth');

// base url /login/
login.get('/', (req,res) => {
  res.send('login page');
});


module.exports = login;
