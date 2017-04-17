const express = require('express');
const api = express.Router();

// base url /api/
api.get('/', (req,res) => {
  res.send('api');
});

module.exports = api;
