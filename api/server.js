const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client} = require('pg');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');

const auth_utils = require('./modules/authentication')

const API_PORT = 2001;
const app = express();
app.use(cors());
const router = express.Router();
const config = require('config');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

auth_utils.test();

// (optional) only made for logging and
// bodyParser, parses the request body to be a readable json format
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

// Testing Endpoints for different Functionalities, do not use in Production only for in-browser-testing
router.get('/getData', (req, res) => {
    return res.json({"test": "t"})
});

router.get('/testDB', (req, res) => {
    pool.query('SELECT NOW()', (db_err, data) => {
      if(db_err) console.log(db_err)
        return res.json(data.rows)
      })
})

router.get('/setCookie', (req, res) => {
  res.cookie('testCookie', 'Cookie-system working', { maxAge: 21600, httpOnly: true });
  return res.send('Cookie has been set');
})

router.get('/testCookie', (req, res) => {
  return res.json(req.cookies)
})

router.get('/clearCookie', (req, res) => {
  res.clearCookie('testCookie');
  return res.send('Cookie has been cleared')
})

router.get('/testAuth', (req, res) => {
  console.log(req)
  const decoded = jwt.verify(req.cookies["Authentification"], config.get('myprivatekey'));
  if (decoded['auth']=='true') return res.send('Auth successfull'); else res.send('Auth failed')
})



//User Management, for creating the request body must contain username, email and password; for Update only username is required
//For Delete /api/User/:username should be used; get Functionality is not imlemented, shloud be used with Authentification
router.post('/User', (req, res) => {
  if (!req.body.email) return res.status(400).send('No email provided');
  if (!req.body.username) return res.status(400).send('No username provided');
  if (!req.body.password) return res.status(400).send('No password provided');

  pool.query('SELECT id FROM user_account WHERE email = $1', [req.body.email], (err, data,) => {
    if (data) return res.status(400).send('User already registered')
    return
  })
  pool.query('INSERT INTO user_account (username, password, email) VALUES ($1, $2, $3) RETURNING user_id', 
              [req.body.username, req.body.password, req.body.email], (err, data) => {
                if (err) console.log(err)
                return res.status(200).send('User created with id: ' + data.rows[0].user_id)
              })
  }
)

router.delete('/User/:username', (req, res) => {
  if (!req.params.username) return res.status(400).send('No username provided');
  pool.query('DELETE FROM user_account WHERE username=$1', [req.params.username], (err, data) => {
    if (err) console.log(err)
    return
  })
  return res.send('User deleted')

})

router.put('/User', (req, res) => {
  if (!req.body.username) return res.status(400).send('No username provided');
  if (req.body.password) {
  pool.query('UPDATE user_account SET password=$1 WHERE username=$2', [req.body.password, req.body.username], (err, data) => {
    if (err) console.log(err)
    return
  })
  }

  if (req.body.email) {
    pool.query('UPDATE user_account SET email=$1 WHERE username=$2', [req.body.email, req.body.username], (err, data) => {
      if (err) console.log(err)
      return
    })
    }
  
  return res.send('User updated')

})

//Authentification: to authenticate use get; query should be /api/Authentification/<username>/<password>. Returning Cookie
router.get('/Authentification/:username/:password', (req, res) => {
  if (!req.params.username) return res.status(400).send('No username provided');
  if (!req.params.password) return res.status(400).send('No password provided');

  pool.query('SELECT password FROM user_account WHERE username=$1', [req.params.username], (err, data)=> {
      if (req.params.password==data.rows[0].password) return res.cookie('Authentification', jwt.sign({username: req.params.username, auth: 'true'}, config.get('myprivatekey')), { maxAge: 21600, httpOnly: true }).send('Authentification successful')
      else return res.status(400).send('Wrong username or pasword')
  })

})



// append /api for our http requests
app.use('/api', router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));