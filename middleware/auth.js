const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//          user serialization
// ———————————————————————————————————
passport.serializeUser((user, done) =>  {
  console.log('SERIALIZED USER');
  console.log(user)
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  db.get(`SELECT id FROM Users WHERE id IS '${id}'`)
    .then((err, row) => {
      if (!row) return done(null, false);
      console.log('DERIALIZED USER');
      return done(null, row)
    })
    .catch(err => console.error(err.stack))
});

//               user auth
// ———————————————————————————————————
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('IN AUTH STRATEGY')
    console.log('USERNAME :' + username)
    db.get(`SELECT id, email, password FROM Users WHERE email IS '${username}' AND password = '${password}'`)
      .then((row) => {
        if (!row) return done(null, false);
        console.log('LOGIN SUCCESS!!!');
        return done(null, row);
      })
      .catch(err => console.error(err.stack))
  }
));


module.exports = passport;
