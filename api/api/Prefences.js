const express = require('express');

const db_utils = require('../modules/db_utils')

const router = express.Router();

router.get('/:username', (req, res) => {
    if (!req.params.username) return res.status(400).send('No username provided')
    else{
        db_utils.getPrefences(req.body.username)
        .then(data => res.send(data))
        .catch(err => res.status(500).send(err))
    }
})

router.get('/', (req, res) => {
    db_utils.getAllPrefences()
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

router.put('/:username', (req, res) => {
    if(!req.params.username) return res.status(400).send('No username Provided')
    if(!req.body.prefence) return res.status(400).send('No prefence provided')

    db_utils.assignPrefence(req.params.username, req.body.prefence)
    .then(data => res.send('successful'))
    .catch(err => res.status(500).send(err))
})

router.delete('/:username/:prefence', (req, res) => {
    if(!req.params.username) return res.status(400).send('No username Provided')
    if(!req.params.prefence) return res.status(400).send('No prefence provided')
    
    db_utils.deletePrefenceAssignment(req.params.username, req.params.prefence)
    .then(data => res.send('successful'))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})


module.exports = router;