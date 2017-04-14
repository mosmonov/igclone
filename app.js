const express = require('express')
const app = express();
const bodyParser = require('body-parser');
const port = 3001;
const morgan = require('morgan');

//                  middleware
//————————————————————————————————————————————————
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(bodyParser.json());


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

app.get('/', (req, res) => {
  //render page placeholder
  res.send('Hi');
})

//                 start
//————————————————————————————————————————————————

app.listen(port, ()=>{
  console.log('Server running on port: '  + port);
})
