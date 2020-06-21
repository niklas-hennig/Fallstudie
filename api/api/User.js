const express = require('express');

const db_utils = require('../modules/db_utils')

const router = express.Router();

function parseBody(body){
  const infos = {};
  for (key in body){
      infos[key] = body[key]
      }
    return infos;
};


router.get('/:username/:type', (req, res)=>{
  username = req.params.username
  type = req.params.type
  if (type=='f') isFreelancer=true
  else isFreelancer=false
  db_utils.getUserInfo(username, isFreelancer)
  .then(data => {
    res.send(data)
  })
  .catch(err => {console.log(err)
    res.status(500).send(err)})
})

//Returns cookie in answer, requires username, password, email and others in body
router.post('/Freelancer', (req, res) => {
  console.log(req.body)
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
    if (!req.body.name||!req.body.surname) return res.status(400).send('No or incomplete name provided');
    name = req.body.name
    surname = req.body.surname
    if (!req.body.gender) return res.status(400).send('No gender provided')
    gender = req.body.gender

    db_utils.findUser(username, null, true)
    .then(id => {
      if (id){
        if (id.length>0){
          res.status(400).send('User already exists')
        }else{
          db_utils.createFreelancer(username, email, password, name, surname, gender)
          .then(id => res.send(id.toString()))
          .catch(err => {
            res.status(200).send(err)
          })
        }
      }else{
        db_utils.createFreelancer(username, email, password, name, surname, gender)
          .then(id =>res.send(id.toString()))
          .catch(err => res.status(200).send(err))
      }
    })
  }
  )

  router.post('/CompanyUser', (req, res) => {
    console.log(req.body)
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
    if (!req.body.name||!req.body.surname) return res.status(400).send('No or incomplete name provided');
    name = req.body.name
    surname = req.body.surname
    if (!req.body.gender) return res.status(400).send('No gender provided')
    gender = req.body.gender
    if(!req.body.company_name) return res.status(400).send('No comapny name Provided')

    
    db_utils.checkIfCompanyExists(req.body.company_name)
    .then(comp_id =>{
      db_utils.createCompUser(username, email, password, name, surname, gender, comp_id)
      .then(id => res.status(200).send('created successful'))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(400).send('Company could not be found'))

  }
  )

  router.post('/Password/:username/:type', (req, res) => {
    db_utils.checkIfUserExists(req.params.username, req.params.type)
    .then(data => {
      db_utils.setPasswordToken(req.params.username, req.params.type)
      .then(data => {
        console.log(data.rows[0].token)
        res.send("token created")
      })
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))
  })

  router.put('/Password/:username/:type/:token/:password', (req, res) => {
    db_utils.setNewPassword(req.params.username, req.params.type, req.params.token, req.params.password)
    .then(data => res.send('password updated'))
    .catch(err => res.status(500).send(err))
  })
  
  router.delete('/:username/:type', (req, res) => {
    cookie = req.cookies["Auth"]
    if(!req.params.username || !req.params.type) return res.status(400).send('User not specified')
    username = req.params.username
    type = req.params.type
  
    db_utils.deleteUser(username, type)
    .then(res.send('User deleted'))
    .catch(err => {res.status(500).send(err);
      res.status(500).send('Unable to delete User')
    })
  })
  
  

  router.put('/Freelancer', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;

    infos = parseBody(req.body);

    db_utils.updateFreelancer(username, req.body.password, req.body.email, infos)
    .then(res.send('User Information updated'))
    .catch(err => {
      if (!err) res.status(400).send('Please Provide Information to update')
      else res.status(500).send('Unable to update user information')
    })
  
  })

  router.put('/CompanyUser', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;

    infos = parseBody(req.body);

    db_utils.updateCompUser(username, req.body.password, req.body.email, infos)
    .then(res.send('User Information updated'))
    .catch(err => {
      if (!err) res.status(400).send('Please Provide Information to update')
      else res.status(500).send('Unable to update user information')
    })
  
  })

module.exports = router;