const express = require('express');

const db_utils = require('../modules/db_utils');
const auth_utils = require('../modules/auth_utils');

router = express.Router();

router.get('/:username/:type/:token', (req, res) =>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    if(req.params.type!='f') return res.status(403).send("Not allowed")
    username = req.params.username

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