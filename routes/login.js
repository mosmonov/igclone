const express = require('express');
const login = express.Router();
const db = require('sqlite')
const parser = require('body-parser');
const passport = require('../middleware/auth');


// middleware
login.use(parser.urlencoded({
    extended: true
}));
login.use(parser.json());

//     BASE URL OF ROUTE = /login
// ———————————————————————————————————

login.post('/', passport.authenticate('local'), (req, res) => {
  res.redirect('/home')
  // console.log("RESPONSE",res)
  // console.log("RESPONSE",res.sessionStore)
  // pull form values from post request
  // const username = req.body.username;
  // const password = req.body.password;
  //
  // console.log("login params: " + username + " " + password);
  // // get list of users //
  // db.get(`SELECT * FROM Users WHERE email LIKE '${username}'`) // throws error that it can't find "column = username"
  //   .then(v => {
  //     /* if statement logic to ensure password is correct serialize user into session with passport */
  //     res.header('Content-Type','application/json');
  //     res.send({ users : v })
  //   })
  //   .catch(err => console.log(err.stack))
});

// user signup route
login.post('/signup', (req, res) => {
  // future additions :
    // DB — check to see if username exisits
    // FE/BE — force passwords to match

  // Pulls values from post request
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

  // FE — Simple password match check
  if (password !== password2 ) {
    // FE — some front end  logic to signify passwords don't match
    res.redirect('/')
  } else {
  // FIND ALL USERS W USERNAME = FORM DATA USERNAME
  db.all("SELECT * FROM Users WHERE email = ?", username)
    .then((v) => {
      // CHECK TO SEE IF USER ALREADY EXISTS
      if (v.length > 0){
        // FE - Replace with response to thorw error that a user already exists with this name
        console.log('USER EXISTS')
        // BAIL AND SEND USER BACK TO HOMEPAGE
        res.redirect('/')
        // RETURN TO ESCAPE FUNCTION
        return;
      } else {
        // GET USERS FROM DB
        db.get("SELECT * FROM Users")
          .then(() => {
            // INSERT FORM DATA INTO DB, RETURN NO VALUES
            db.exec(`INSERT INTO Users (email, password) VALUES ('${username}','${password}')`)
            // REDIRECT TO HOMEPAGE
            res.redirect('/')
          })
          .catch(err => console.log(err.stack))
        }
    })
    .catch(err => console.log(err.stack))
  }
});

// exports route
module.exports = login;
