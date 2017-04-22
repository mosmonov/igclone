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
    console.log('IN passport.authenticate')
    console.log(err, user, info)
    if (err) console.log(err);
    if (!user) console.log(user);

    req.logIn(user, (err) => {
    	console.log('LOGGED IN')
        // if (err) return next(err);
        console.log('SESSION')
        console.log(req.session)
        // if we are here, user has logged in!
        res.header('Content-Type', 'application/json');

        res.send({
            success: true,
        });
    });
  })(req, res);
});

// exports route
module.exports = login;
