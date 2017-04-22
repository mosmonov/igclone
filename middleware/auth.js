const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//      pasport user serialization
// ———————————————————————————————————
passport.serializeUser((user, done) =>  {
  console.log('SERIALIZED USER WITH ID: ' + user.id );
  done(null, user);
});

passport.deserializeUser((id, done) => {
  console.log('DESERIALIZED USER WITH ID: ' + id );
  done(null, id);
});

//        passport auth strategy
// ———————————————————————————————————
passport.use(new LocalStrategy(
  (username, password, done) => {
    db.get(`SELECT id, username FROM Users WHERE username IS '${username}' AND password = '${password}'`)
      .then((row) => {
        if (!row) return done(null, false);
        return done(null, row);
      })
      .catch(err => console.error(err.stack))
  }
));

module.exports = passport;
