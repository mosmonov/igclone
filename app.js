const express = require('express')
const app = express();
const passport = require('./middleware/auth');
const session = require('express-session');
const parser = require('body-parser');
const cookieParser = require('cookie-parser');
const port = 3001;
const morgan = require('morgan');
const db = require('sqlite')

//                  db integration
//————————————————————————————————————————————————
const DB_NAME = './data/db.sqlite'; // defines db filepath + filename

//                  middleware
//————————————————————————————————————————————————

app.use('/', express.static('./public'));
app.use(morgan('dev'));
app.use(parser.json());
app.use(cookieParser());
app.use(session({ secret: 'lol bai',  resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());

//                external routes
//————————————————————————————————————————————————

const api = require('./routes/api'); // going to create some sort of super-admin route to view all data, ya heard?
app.use('/api', passport.authenticate('local'), api);

const login = require('./routes/login'); // routes for login and signup.
app.use('/login', login);

const profile = require('./routes/profile'); // route for viewing and editing own profile.
app.use('/profile', passport.authenticate('local'), profile);

const posts = require('./routes/posts'); // route CRUD functions for posts
app.use('/posts', passport.authenticate('local'), posts);


//                   routes
//————————————————————————————————————————————————

app.get('/home', (req,res) => {
  res.send('Homepage with feed');
  // PASSPORT STORES USER SESSION INFO TO req.session? *** NEED TO FIGURE THIS OUT! - AC
  console.log(req.session)
  // DB — CREATE LOGIC TO PULL ALL POSTS FROM A LOGGED IN USER'S FOLLOWED USERS BASED ON ID NUMBER STORED IN SESSION OBJECT
  // FE - RENDER POSTS WITH ASSOCIATED INFO
})

//                 start
//————————————————————————————————————————————————


// V IMPORTANT STUFF
// Sqlite statements return promises so to start things off we inialize the db session and if needed, clear previous data
Promise.resolve()
  .then(() => db.open(DB_NAME, { Promise })) // starts DB Session
  // .then(() => db.migrate({ force : 'last' })) // uncomment and restart server once to reset db
  .then(app.listen(port)) // start server
  .then(()=> { console.log('Server running on port: '  + port) })
  .catch(err => console.error(err.stack))
