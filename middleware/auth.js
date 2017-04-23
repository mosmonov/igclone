const db = require('sqlite');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;


//          user serialization
// ———————————————————————————————————
passport.serializeUser((user, done) =>  {
  console.log('SERIALIZED USER WITH ID: ' + user.id );
  done(null, user);
});

passport.deserializeUser((id, done) => {
  done(null, id);

  // db.get(`SELECT id FROM Users WHERE id = '${id}'`)
  //   .then((err, row) => {
  //     if (!row) return done(null, false);
  //     console.log('DERIALIZED USER');
  //     return done(null, row)
  //   })
  //   .catch(err => console.error(err.stack))
});

//               user auth
// ———————————————————————————————————
passport.use(new LocalStrategy(
  (username, password, done) => {
    console.log('IN AUTH STRATEGY')
    console.log('USERNAME : ' + username)
    db.get(`SELECT id, username FROM Users WHERE username IS '${username}' AND password = '${password}'`)
      .then((row) => {
        if (!row) return done(null, false);
        console.log('LOGIN SUCCESS!!!', row);
        return done(null, row);
      })
      .catch(err => console.error(err.stack))

    // return done(null, {user: 'aaron', id: 1});
  }
));


module.exports = passport;
