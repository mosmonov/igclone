const express = require('express');
const signup = express.Router();
const db = require('sqlite')
const parser = require('body-parser');
const passport = require('../middleware/auth');

// middleware
signup.use(parser.urlencoded({
    extended: true
}));
signup.use(parser.json());

//     BASE URL OF ROUTE = /signup
// ———————————————————————————————————

signup.post('/', (req, res) => {
  // Pulls values from post request
  const username = req.body.username;
  const password = req.body.password;
  const password2 = req.body.password2;

console.log(username, password)

  // FE — Simple password match check
  // FIND ALL USERS W USERNAME = FORM DATA USERNAME
  db.all("SELECT * FROM Users WHERE username = ?", username)
    .then((v) => {
      // CHECK TO SEE IF USER ALREADY EXISTS
      if (v.length > 0){
        // FE - Replace with FE response to tell user another user already exists with same name
        console.log('USER EXISTS')
        // BAIL AND SEND USER BACK TO HOMEPAGE, CHANGE TO FE RESPONSE
        // res.redirect('/')
        return res.send({success: false});
      } else {
        // GET USERS FROM DB
        db.get("SELECT * FROM Users")
          .then(() => {
            // INSERT FORM DATA INTO DB, RETURN NO VALUES
            db.exec(`INSERT INTO Users (username, password) VALUES ('${username}','${password}')`)
            // REDIRECT TO HOMEPAGE
            res.redirect('/')
          })
          .catch(err => console.log(err.stack))
        }
    })
    .catch(err => console.log(err.stack))
});

// exports route

module.exports = signup;
