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
  // pull form values from post request
  const username = req.body.username;
  const password = req.body.password;

  console.log("login params: " + username + " " + password);
  // get list of users //
  db.get(`SELECT * FROM Users WHERE email LIKE '${username}'`) // throws error that it can't find "column = username"
    .then(v => {
      /* if statement logic to ensure password is correct serialize user into session with passport */
      res.header('Content-Type','application/json');
      res.send({ users : v })
    })
    .catch(err => console.log(err.stack))
});

// user signup route
login.post('/signup', (req, res) => {
  // future additions :
    // check to see if username exisits
    // force passwords to match

  // pull form values from post request
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  if (password !== password2 ) {
    // FE — some front end  logic to signify passwords don't match
    res.redirect('/')
  } else {

  db.all("SELECT * FROM Users WHERE email = ?", username)
    .then((v) => {
      if (v.length > 0){
        // FE - Replace with response to thorw error that a user already exists with this name
        console.log('USER EXISTS')
        res.redirect('/')
        return;
      } else {
        db.get("SELECT * FROM Users")
          .then(() => {
            db.exec(`INSERT INTO Users (email, password) VALUES ('${username}','${password}')`)
          })
          .then(() => {
            res.redirect('/')
          })
          .catch(err => console.log(err.stack))
        }
    })
  }
});

// exports route
module.exports = login;
