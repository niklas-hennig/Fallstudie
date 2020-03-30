const express = require('express');
var cors = require('cors');
const bodyParser = require('body-parser');
const { Pool, Client} = require('pg');
const cookieParser = require('cookie-parser');
const jwt = require('jsonwebtoken');
//const fileUpload = require('express-fileupload');

const auth_utils = require('./modules/authentication')
const db_utils = require('./modules/db_utils')

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


app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());
//app.use(fileUpload());

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
  const decoded = jwt.verify(req.cookies["Auth"], config.get('myprivatekey'));
  cookieDate = Date(decoded['time']);
  console.log(cookieDate);
  console.log(Date());
  console.log(Date() - cookieDate);
  if (decoded['auth']=='true') return res.send('Auth successfull'); else res.send('Auth failed')
})

router.get('/testList/:parameter/:values', (req, res)=>{
  list = req.params.values
  list = list.split(',')
  query_string = 'SELECT * FROM user_account WHERE ' + req.params.parameter + ' in (' +"'" + list.join("','") + "')"
  console.log(req.params.list);
  console.log(query_string)
  pool.query(query_string)
  .then(data => console.log(data.rows))
  .catch(err => console.error(err))
  res.send(list)
})

router.get('/testQuery', (req, res) => {
  console.log(req.query)
  res.send(req.query);
})

//User Management, for creating the request body must contain username, email and password; for Update only username is required
//For Delete /api/User/:username should be used; get Functionality is not imlemented, shloud be used with Authentification
router.post('/User', (req, res) => {
  if (!req.body.username) return res.status(400).send('No username provided');
  username = req.body.username;
  if (!req.body.email) return res.status(400).send('No email provided');
  email = req.body.email;
  if (!req.body.password) return res.status(400).send('No password provided');
  password = req.body.password;

  db_utils.findUser(username)
  .then(id => {
    if (id){
      if (id.length>0){
        res.status(400).send('User already exists')
      }else{
        db_utils.createUser(username, email, password)
        .then(id => res.send(toString(id)))
        .catch(err => res.status(500).send(err))
      }
    }else{
      db_utils.createUser(username, email, password)
        .then(id => res.send(toString(id)))
        .catch(err => res.status(500).send(err))
    }
  })
}
)

router.delete('/User/:username', (req, res) => {
  if (!req.params.username) return res.status(400).send('No username provided');
  username = req.params.username
  db_utils.deleteUser(username)
  .then(res.send('User deleted'))
  //.catch(res.status(500).send('Unable to delete User'))
})

router.put('/User', (req, res) => {
  if (!req.body.username) return res.status(400).send('No username provided');
  username = req.body.username
  db_utils.updateUser(username, req.body.password, req.body.email)
  .then(res.send('User Information updated'))
  .catch(err => {
    if (!err) res.status(400).send('Please Provide Information to update')
    else res.status(500).send('Unable to update user information')
  })

})

//Authentification: to authenticate use get; query should be /api/Authentification/<username>/<password>. Returning Cookie
router.get('/Authentification/:username/:password', (req, res) => {
  if (!req.params.username) return res.status(400).send('No username provided');
  username = req.params.username
  if (!req.params.password) return res.status(400).send('No password provided');
  password = req.params.password

  auth_utils.getAuthentification(username, password)
  .then(res_cookie => 
    res.cookie('Auth', res_cookie).send('Authentification successful'))
  .catch(err => {console.log(err)
    res.status(400).send(err)})

})

router.delete('/Authentification', (req, res) => {
  res.clearCookie('Authentification');
  return res.send('Authentification cleared')
})


// append /api for our http requests
app.use('/api', router);
app.listen(API_PORT, () => console.log(`LISTENING ON PORT ${API_PORT}`));