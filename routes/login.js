const express = require('express');
const login = express.Router();
const db = require('sqlite')
const parser = require('body-parser');

// middleware
login.use(parser.urlencoded({
    extended: true
}));
login.use(parser.json());

// base url of route /login

// user login route
login.post('/', (req, res) => {
  const username = req.body.username; // issue with sqlite taking @ symbol?
  const password = req.body.password;
  console.log("login params: " + username + " " + password);
  // get list of users //
  db.get(`SELECT * FROM Users WHERE email LIKE ${username}`) // throws error that it can't find "column = username"
    .then(v => {
      /* if statement logic to ensure password is correct serialize user into session with passport */
      res.header('Content-Type','application/json');
      res.send({ v })
    })
    .catch(err => console.log(err.stack))
});

// user signup route
login.post('/signup', (req, res) => {
  // get list of users //
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  console.log( username, password, password2)

  if (password !== password2 ) {
    // FE — some front end  logic to signify passwords don't match
    res.redirect('/')
  } else {
  db.get("SELECT * FROM Users")
    .then(() => {
      console.log("in create user")
      return db.run("INSERT INTO Users (email, password) VALUES (?,?)", [`${username}`, `${password}`])
    })
    .then((user) => {
      console.log(user)
      res.header('Content-Type','application/json');
      res.send({ user }) // doesn't render info as expected
    })
    .catch(err => console.log(err.stack))
  }
});

// exports route
module.exports = login;
