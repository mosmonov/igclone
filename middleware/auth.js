const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

//      pasport user serialization
// ———————————————————————————————————
passport.serializeUser((user, done) =>  {
  // console.log('SERIALIZED USER WITH ID: ' + user.id );
  done(null, user);
});

passport.deserializeUser((user, done) => {
  // console.log('about to deserializeUser')
  // console.log(user.id)
  // console.log('DESERIALIZED USER WITH ID: ' + user.id);
  done(null, user.id);
});

//        passport auth strategy
// ———————————————————————————————————
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('----------------')
    console.log(username, password)
    console.log('----------------')
    db.get(`SELECT id, username FROM users WHERE username = '${username}' AND password = '${password}';`)
      .then((row) => {
        console.log(row, '------------')
        if (!row) return done(null, false);
        return done(null, row);
      })
      .catch(err => console.error(err.stack))
  }
));

module.exports = passport;
