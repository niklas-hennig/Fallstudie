const express = require('express');

const auth_utils = require('../modules/authentication')

const router = express.Router();

//Authentification: to authenticate use get; query should be /api/Authentification/ with username, password and type ('f' or 'c') in body. Returning Cookie
router.post('/', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password
    if (!req.body.type) return res.status(400).send('No type provided');
    type = req.body.type
  
    auth_utils.getAuthentification(username, password, type)
    .then(res_cookie => 
      res.cookie('Auth', res_cookie).send('Authentification successful'))
    .catch(err => {console.log(err)
      res.status(400).send(err)})
  })
  
  router.delete('/', (req, res) => {
    res.clearCookie('Authentification');
    return res.send('Authentification cleared')
  })

module.exports = router;