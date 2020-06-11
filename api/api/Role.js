const express = require('express');

const db_utils = require('../modules/db_utils');

router = express.Router();

router.get('/', (req, res) =>{
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    username = req.cookies['Auth']['username']

    if(req.cookies['Auth']['type']!='f') return res.status(403).send("Not allowed")

    db_utils.getPersonalizedRoles(username)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

router.get('/:id', (req, res) => {
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    username = req.cookies['Auth']['username']

    if(req.cookies['Auth']['type']!='f') return res.status(403).send("Not allowed")

    db_utils.getRole(req.params.id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router;