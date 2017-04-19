const express = require('express');
const auth = express();
const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


// function hashPassword(password, salt) {
//   var hash = crypto.createHash('sha256');
//   hash.update(password);
//   hash.update(salt);
//   return hash.digest('hex');
// }

//          user serialization
// ———————————————————————————————————
passport.serializeUser(function(user, done) {
  console.log(' in serialize user')
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  console.log(' in deserialize user')
  db.get(`SELECT id FROM Users WHERE id IS '${id}'`, (err, row) => {
    if (!row) return done(null, false);
    return done(null, row)
  })
});

//               user auth
// ———————————————————————————————————
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log(' in auth strategy')
    console.log(username)
    console.log(password)
    db.get(`SELECT email, password FROM Users WHERE email IS '${username}' AND password IS '${password}'`, (err, row) => {
      if (!row) return done(null, false);
      return done(null, row);
    })
  }
));


module.exports = passport;
