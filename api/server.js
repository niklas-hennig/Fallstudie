const express = require('express');
const fs = require('fs');
var cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client} = require('pg');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
//const fileUpload = require('express-fileupload');

const User = require('./api/User');
const Authentification = require('./api/Authentification');
const Prefence = require('./api/Prefence')
const Company = require('./api/Company')
const Role = require('./api/Role')
const Application = require('./api/Application')
const Test = require('./api/Test');

const API_PORT = 2001;
const app = express();
app.use(cors());
const router = express.Router();
const htmlRouter = express.Router();
const config = require('config');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

router.get('/Company', (req, res) => {
  pool.query('SELECT * FROM company;')
  .then(data => {
    console.log(data.rows[0])
    res.send(data.rows[0])
  })
  .catch(err => {
    res.status(500).send(err)
  })
})


htmlRouter.get('/', (req, res) => {
  fs.readFile('../react-app/build/index.html', (err, data) => {
    if (err) res.status(500).send(err);
    res.end(data);
  })
})


htmlRouter.get('*', (req, res) => {
  if (!req.path.match('\/auth\/.*')){
    fs.readFile('../react-app/build/'+req.path, (err, data) => {
      if (err) res.status(500).send(err);
      res.end(data);
    })
  }else{
    res.status(400).send('not authenticated')
  }
})


// append /api for our http requests
app.use('/api', router);
app.use('/api/User', User);
app.use('/api/Authentification', Authentification);
app.use('/api/Prefence', Prefence);
app.use('/api/Company', Company)
app.use('/api/Role', Role);
app.use('/api/Application', Application)
app.use('/api/Test', Test);
app.use('/', htmlRouter);

app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));