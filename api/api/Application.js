const express = require('express');

const db_utils = require('../modules/db_utils');

router = express.Router();

router.post('/:role_id', (req, res) => {
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    if(req.cookies['Auth']['type']!='f') return res.status(403).send("Not allowed")
    username = req.cookies['Auth']['username']

    db_utils.assignApplication(username, req.params.role_id)
    .then(res.send('Application created'))
    .catch(err => res.status(500).send(err))
    
})

router.get('/:project_id', (req, res) => {
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    if(req.cookies['Auth']['type']=='f') return res.status(403).send("Not allowed")

    db_utils.getApplication(req.params.project_id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

module.exports = router;