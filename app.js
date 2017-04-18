const express = require('express')
const app = express();
const parser = require('body-parser');
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

//                external routes
//————————————————————————————————————————————————

const api = require('./routes/api'); // going to create some sort of super-admin route to view all data, ya heard?
app.use('/api', api);

const login = require('./routes/login'); // route for login and signup.
app.use('/login', login);

const profile = require('./routes/profile'); // route for login and signup.
app.use('/profile', profile);

//                   routes
//————————————————————————————————————————————————

app.get('/', (req,res)=>{
  // if user logged in, render followed users
    // else prompt login

})





//                 start
//————————————————————————————————————————————————


// V IMPORTANT STUFF
// Sqlite statements return promises so to start things off we inialize the db session and if needed, clear previous data
Promise.resolve()
  .then(() => db.open(DB_NAME, { Promise })) // starts DB Session
  // .then(() => db.migrate({ force : 'last' })) // uncomment to reset db
  .then(app.listen(port)) // start server
  .then(()=> { console.log('Server running on port: '  + port) })
  .catch(err => console.error(err.stack))
