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

router.get('/:name', (req, res)=>{
    if(!req.params.name) return res.status(400).send('No name provided')

    db_utils.getCompanyInfo(req.params.name)
    .then(data => res.send(data))
    .catch(err => res.send(500).send(err))
})

router.post('/', (req, res) => {
    if (!req.body.name) return res.status(400).send('No name provided')
    name = req.body.name
    if (!req.body.street) return res.status(400).send('No street provided')
    street = req.body.street
    if (!req.body.number) return res.status(400).send('No number provided')
    number = req.body.number
    if (!req.body.postcode) return res.status(400).send('No postcode provided')
    postcode = req.body.postcode
    if (!req.body.city) return res.status(400).send('No city provided')
    city = req.body.city
    if (!req.body.country) return res.status(400).send('No country provided')
    country = req.body.country

    db_utils.createCompany(name, street, number, postcode, city, country)
    .then(data => res.send('Company created'))
    .catch(err => res.send(500).send(err))

})

router.put('/', (req, res) => {
    if (!req.body.name) return res.status(400).send('No name provided')
    name = req.body.name

    infos = parseBody(req.body);

    db_utils.updateCompanyInfo(infos)
    .then(res.send('Infos updated'))
    .catch(err => res.status(500).send(err))


})

router.delete('/:name', (req, res) => {
    if(!req.params.name) return res.status(400).send('No name provided')

    db_utils.deleteCompany(name)
    .then(res.send('Company deleted'))
    .catch(err => res.status(500).send(err))
})

module.exports = router;