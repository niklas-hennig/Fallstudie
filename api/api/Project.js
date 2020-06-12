const express = require('express');

const db_utils = require('../modules/db_utils');

router = express.Router();

router.get('/:comp_id', (req, res) => {
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    if(req.cookies['Auth']['type']=='f') return res.status(403).send("Not allowed")

    db_utils.getAllProjects(req.params.comp_id)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))
})

router.get('/ID/:project id', (req, res) => {
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    if(req.cookies['Auth']['type']!='f') return res.status(403).send("Not allowed")

    db_utils.getProjectInfo(req.params.project_id)
    .then(data => res.send(data))
    .catch(err=> res.status(500).send(err))

})

router.delete('/:project_id', (req, res)=>{
    if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    if(req.cookies['Auth']['type']=='f') return res.status(403).send("Not allowed")
    username=req.cookies['Auth']['username']

    db_utils.delteProject(req.params.project_id, username)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))

})

module.exports = router;
