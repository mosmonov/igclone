const express = require('express')
const app = express();
const passport = require('./middleware/auth');
const session = require('express-session');
const parser = require('body-parser');
const port = 3001;
const morgan = require('morgan');
const db = require('sqlite')

//                  db integration
//————————————————————————————————————————————————
const DB_NAME = './data/db.sqlite'; // defines db filepath + filename

//                  middleware
//————————————————————————————————————————————————

app.use(express.static('./public'));
app.use(morgan('dev'));
app.use(parser.json());
app.use(session({ secret: 'lol bai',  resave: false, saveUninitialized : false }));
app.use(passport.initialize());
app.use(passport.session());

//                    routes
//————————————————————————————————————————————————

const api = require('./routes/api'); // going to create some sort of super-admin route to view all data, ya heard?
app.use('/api', api);

// const login = require('./routes/login'); // routes for login and signup.
const login = require('./routes/login'); // routes for login, exposed
app.use('/login', login);

const signup = require('./routes/signup'); // routes for login, exposed
app.use('/signup', signup);

// route protects all others below from access unless user is logged in
app.use((req, res, next) => {
  console.log('USER AUTHENTICATION STATUS : ' + req.isAuthenticated());

  if (req.isAuthenticated()) {
    console.log('WELCOME, ' + req.session.passport.user.username)

    console.log('******')
    console.log(' USER : ' + req.session.passport.user.username)
    console.log(' ID : ' + req.session.passport.user.id)
    console.log('******')
    return next();
  }
  // replace with some fancy visual to tell them not logged in.
  return res.send('not logged in')
});




const profile = require('./routes/profile'); // route for viewing and editing own profile.
app.use('/profile', profile);


const post = require('./routes/posts'); // route to make a post
app.use('/post', post);


// MAIN PAGE FOR FEED
app.get('/feed', (req,res) => {
  db.all(`SELECT *
          FROM Posts
          INNER JOIN Follows on Follows.followed = Posts.user_id
          INNER JOIN Users on Follows.user_id = Users.id`)
    .then((posts) => {
      // let data = JSON.parse(posts);
      // data.posts = posts
      // // data.currentUser = req.session.passport.user;
      res.json(posts)
    })
    .catch(err => console.error(err.stack))
})

// LOGOUT
app.use('/logout', (req , res) => {
  req.logout();
  res.redirect('/');
});



// app.get('/info', (req,res) => {
//   // PASSPORT STORES USER SESSION INFO TO req.session? *** NEED TO FIGURE THIS OUT! - AC
//
//   console.log('----------------------------')
//   console.log(req.session)
//   console.log(req.user)
//   console.log('----------------------------')
//   res.setHeader('Content-Type', 'application/json');
//   res.send(req.user)
//   // DB — CREATE LOGIC TO PULL ALL POSTS FROM A LOGGED IN USER'S FOLLOWED USERS BASED ON ID NUMBER STORED IN SESSION OBJECT
//   // FE - RENDER POSTS WITH ASSOCIATED INFO
// })

//              start db + start server
//————————————————————————————————————————————————

// V IMPORTANT STUFF
// Sqlite statements return promises so to start things off we inialize the db session and if needed, clear previous data
Promise.resolve()
  .then(() => db.open(DB_NAME, { Promise })) // starts DB Session
  .then(() => db.migrate({ force : 'last' })) // uncomment and restart server once to reset db
  .then(app.listen(port)) // start server
  .then(()=> { console.log('------------------------------------------------------') })
  .then(()=> { console.log("Instagram Clone Project Running on "  + port + ".") })
  .then(()=> { console.log("Happy posting, nerd!") })
  .then(()=> { console.log('------------------------------------------------------') })
  .then(()=> { console.log('\n') })
  .catch(err => console.error(err.stack))
