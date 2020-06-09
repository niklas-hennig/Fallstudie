const express = require('express');

const db_utils = require('../modules/db_utils')

const router = express.Router();


router.post('/Freelancer', (req, res) => {
    console.log(req)
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
  
    db_utils.findUser(username, true)
    .then(id => {
      if (id){
        if (id.length>0){
          res.status(400).send('User already exists')
        }else{
          db_utils.createFreelancer(username, email, password)
          .then(id => res.send(id.toString()))
          .catch(err => {
            res.status(500).send(err)
          })
        }
      }else{
        db_utils.createFreelancer(username, email, password)
          .then(id =>res.send(id.toString()))
          .catch(err => res.status(500).send(err))
      }
    })
  }
  )

  router.post('/CompanyUser', (req, res) => {
    console.log(req)
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
  
    db_utils.findUser(username, false)
    .then(id => {
      if (id){
        if (id.length>0){
          res.status(400).send('User already exists')
        }else{
          db_utils.createCompUser(username, email, password)
          .then(id => res.send(id.toString()))
          .catch(err => {
            res.status(500).send(err)
          })
        }
      }else{
        db_utils.createFreelancer(username, email, password)
          .then(id =>res.send(id.toString()))
          .catch(err => res.status(500).send(err))
      }
    })
  }
  )
  
  router.delete('/:username/:isFreelancer', (req, res) => {
    if (!req.params.username) return res.status(400).send('No username provided');
    username = req.params.username
    if (!req.params.isFreelancer) return res.status(400).send('No type provided');
    isFreelancer = req.params.isFreelancer
  
    db_utils.deleteUser(username, isFreelancer)
    .then(res.send('User deleted'))
    //.catch(res.status(500).send('Unable to delete User'))
  })
  
  router.put('/', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username
    if (!req.body.isFreelancer) return res.status(400).send('No type provided');
    isFreelancer = req.body.isFreelancer
  
    db_utils.updateUser(username, req.body.password, req.body.email, {}, isFreelancer)
    .then(res.send('User Information updated'))
    .catch(err => {
      if (!err) res.status(400).send('Please Provide Information to update')
      else res.status(500).send('Unable to update user information')
    })
  
  })

module.exports = router;