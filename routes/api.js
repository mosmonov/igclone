const express = require('express');
const api = express.Router();
const passport = require('../middleware/auth');

// base url /api/
api.get('/', (req,res) => {
  res.send('api');
});

module.exports = api;
