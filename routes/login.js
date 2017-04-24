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

login.post('/', (req, res) => {
  passport.authenticate('local', (err, user, info) => {
    console.log(`ATTEMPTING TO LOGIN USER '${user.username}'....`)
    console.log(err, user, info)
    if (err) console.log(err);
    if (!user) console.log('USER NOT FOUND!');
    // attempts to login user through passport's logIn method
    req.logIn(user, (err) => {
        if (err) console.error(err.stack);
        console.log(`USER '${user.username}' LOGGED IN!`);
        // console.log(req.session)
        // if we are here, user has logged in!
        res.header('Content-Type', 'application/json');
        res.redirect(`/feed.html`);
    });
  })(req, res);
});

// exports route
module.exports = login;