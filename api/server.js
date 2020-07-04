const express = require('express');
const fs = require('fs');
var cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client} = require('pg');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
const fileUpload = require('express-fileupload');

const Users = require('./routes/Users');
const Authentifications = require('./routes/Authentifications');
const Prefences = require('./routes/Prefences')
const Companies = require('./routes/Companies')
const Roles = require('./routes/Roles')
const Projects = require('./routes/Projects');
const Applications = require('./routes/Applications')
const Files = require('./routes/Files');

if (process.env.NODE_PORT) const API_PORT = process.env.NODE_PORT;
else const API_PORT = 80;

const app = express();
app.use(cors());
const router = express.Router();
const htmlRouter = express.Router();
const config = require('config');

let host = 'localhost'
if(process.env.DB_host) host=process.env.DB_host
const pool = new Pool({
    user: 'docker',
    host: host,
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

console.log(pool.query('SELECT NOW()', (err, data)=>{
  if (err) console.log(err)
  else console.log(data)
}))

app.use(fileUpload());
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
  if (!req.path.match('\/api\/.*')){
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
app.use('/api/Users', Users);
app.use('/api/Authentifications', Authentifications);
app.use('/api/Prefences', Prefences);
app.use('/api/Companies', Companies);
app.use('/api/Roles', Roles);
app.use('/api/Projects', Projects);
app.use('/api/Applications', Applications);
app.use('/api/Files', Files);
app.use('/', htmlRouter);


app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));