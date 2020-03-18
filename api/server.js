const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client} = require('pg');
const cookieParser = require('cookie-parser');

const API_PORT = 2001;
const app = express();
app.use(cors());
const router = express.Router();

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// this is our get method
// this method fetches all available data in our database
router.get('/getData', (req, res) => {
    return res.json({"test": "t"})
});

router.get('/testDB', (req, res) => {
    pool.query('SELECT * FROM user_account', (db_err, data) => {
      if(db_err) console.log(db_err)
        return res.json(data.rows)
      })
})

router.get('/setCookie', (req, res) => {
  res.cookie('testCookie', 'Cookie-system workin', { maxAge: 21600, httpOnly: true });
  return res.send('Cookie has been set');
})

router.get('/testCookie', (req, res) => {
  return res.json(req.cookies)
})

router.get('/clearCookie', (req, res) => {
  res.clearCookie('testCookie');
  return res.send('Cookie has been cleared')
})

router.post('/User', (req, res) => {
  if (!req.body.email) return res.status(400).send('No email provided');
  if (!req.body.username) return res.status(400).send('No username provided');
  if (!req.body.password) return res.status(400).send('No password provided');

  pool.query('SELECT id FROM user_account WHERE email = $1', [req.body.email], (err, data,) => {
    if (data) return res.status(400).send('User already registered')
    return
  })
  console.log('creating user' + req.body.email)
  pool.query('INSERT INTO user_account (username, password, email) VALUES ($1, $2, $3)', 
              [req.body.username, req.body.password, req.body.email], (err, data) => {
                if (err) console.log(err)
                return 
              })
  console.log('last line')
  return res.status(200).send('User created')
  }
)

router.delete('/User/:username', (req, res) => {
  console.log(req)
  if (!req.params.username) return res.status(400).send('No username provided');
  pool.query('DELETE FROM user_account WHERE username=$1', req.params.username, (err, data) => {
    console.log(err)
    console.log(data)
  })
  return res.send('User deleted')

})


// append /api for our http requests
app.use('/api', router);

// launch our backend into a port
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));