const express = require('express')
const app = express();
const parser = require('body-parser');
const port = 3001;
const morgan = require('morgan');
const db = require('sqlite');

//                  db integration
//————————————————————————————————————————————————
const DB_NAME = './data/db.sqlite';

//                  middleware
//————————————————————————————————————————————————
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(parser.json());

//                external routes
//————————————————————————————————————————————————

// login route using passport for authentication
const login = require('./routes/login');
app.use('/login', login);

// api route
const api = require('./routes/api');
app.use('/api', api);


//                   routes
//————————————————————————————————————————————————

/*
  TODO
  ...
  ...
  ...
*/

app.get('/', (req, res) => {
  //render page placeholder
  res.send('Hi');
})

//                 start
//————————————————————————————————————————————————

Promise.resolve()
  .then(() => db.open(DB_NAME, { Promise }))
  .then(() => db.migrate({ force : 'last' }))
  .then(app.listen(port))
  .then(()=> { console.log('Server running on port: '  + port) })
  .catch( err => console.error(err.stack))
