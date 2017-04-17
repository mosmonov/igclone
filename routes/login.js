const express = require('express');
const login = express.Router();
const bodyParser = require('body-parser');
const passport = require('passport')
const expressSession = require('express-session');
const LocalStrategy = require('passport-local').Strategy;

passport.serializeUser((user, done) => {
  done(null, user._id);
});

passport.deserializeUser((id, done) => {
  User.findById(id, (err, user) => {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  (username, password, done) => {
    User.findOne({ username: username }, function (err, user) {
      if (err) { return done(err); }
      if (!user) {
        return done(null, false, { message: 'Incorrect username.' });
      }
      if (!user.validPassword(password)) {
        return done(null, false, { message: 'Incorrect password.' });
      }
      return done(null, user);
    });
  }
));

login.post('/', passport.authenticate('local'
              , {  successRedirect: '/',
                   failureRedirect: '/login',
                   failureFlash: true })
              , (req, res) => {
  console.log(req.body);
  console.log('login attempt');
  res.send('login page');
});


module.exports = login
