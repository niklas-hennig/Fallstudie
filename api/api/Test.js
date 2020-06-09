const express = require('express');
const router = express.Router();

const router = express.Router();

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
  if (decoded['auth']=='true') return res.status(200).send('Auth successfull'); else res.status(401).send('Auth failed')
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

module.exports = router;