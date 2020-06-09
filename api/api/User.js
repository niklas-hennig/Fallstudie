const express = require('express');

const db_utils = require('../modules/db_utils')

const router = express.Router();

function parseBody(body){
    infos = {'name': null,
            'surname':null,
            'street': null,
            'number':null,
            'postcode':null,
            'city':null,
            'iban':null,
            'ktn_owner':null,
            'expirience':null,
            'company_name': null,
            'street_bill':null,
            'number_bill':null,
            'postcode_bill':null,
            'city_bill':null,
            'description':null
    };

    if (body.name) infos['name'] = body.name;
    if (body.surname) infos['surname'] = body.surname;
    if (body.street) infos['street'] = body.street;
    if (body.number) infos['number'] = body.number;
    if (body.postcode) infos['postcode'] = body.postcode;
    if (body.city) infos['city'] = body.city;
    if (body.iban) infos['iban'] = body.iban;
    if (body.ktn_owner) infos['ktn_owner'] = body.ktn_owner;
    if (body.expirience) infos['expirience'] = body.expirience;
    if (body.company_name) infos['company_name'] = body.company_name;
    if (body.street_bill) infos['street_bill'] = body.street_bill;
    if (body.number_bill) infos['number_bill'] = body.number_bill;
    if (body.postcode_bill) infos['postcode_bill'] = body.postcode_bill;
    if (body.city_bill) infos['city_bill'] = body.city_bill;
    if (body.description) infos['description'] = body.description;

    return infos;
};

//Returns cookie in answer, requires username, password, email and others in body
router.post('/Freelancer', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
    if (!req.body.name||!req.body.surname) return res.status(400).send('No or incomplete name provided');
  
    infos = parseBody(req.body);

    db_utils.findUser(username, null, true)
    .then(id => {
      if (id){
        if (id.length>0){
          res.status(400).send('User already exists')
        }else{
          db_utils.createFreelancer(username, email, password, infos)
          .then(id => res.send(id.toString()))
          .catch(err => {
            res.status(200).send(err)
          })
        }
      }else{
        db_utils.createFreelancer(username, email, password, infos)
          .then(id =>res.send(id.toString()))
          .catch(err => res.status(200).send(err))
      }
    })
  }
  )

  router.post('/CompanyUser', (req, res) => {
    if (!req.body.username) return res.status(400).send('No username provided');
    username = req.body.username;
    if (!req.body.email) return res.status(400).send('No email provided');
    email = req.body.email;
    if (!req.body.password) return res.status(400).send('No password provided');
    password = req.body.password;
    if (!req.body.company_name) return res.status(400).send('No company provided');
  
    infos = parseBody(req.body);

    db_utils.checkIfCompanyExists(infos['company_name'])
    .then(comp_id =>{
      console.log('creating')
      db_utils.createCompUser(username, email, password, infos, comp_id)
      .then(id => res.status(200).send('created successful'))
      .catch(err => res.status(500).send(err))
    })
    .catch(err => res.status(500).send(err))

  }
  )
  
  router.delete('/:username/:type', (req, res) => {
    if (!req.params.username) return res.status(400).send('No username provided');
    username = req.params.username
    if (!req.params.type) return res.status(400).send('No type provided');
    type = req.params.type
  
    db_utils.deleteUser(username, type)
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