const express = require('express');

const db_utils = require('../modules/db_utils');
const auth_utils = require('../modules/auth_utils')

router = express.Router();

router.get('/:comp_user/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    
    db_utils.getAllProjects(req.params.comp_user)
    .then(data => res.send(data))
    .catch(err => {res.status(500).send(err)})
})

router.get('/:id', (req, res) => {
    console.log(req.params.id)
    db_utils.getProjectInfo(req.params.id)
    .then(data => {console.log(data)
        res.send(data)})
    .catch(err=> console.log(err))

})

router.post('/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.createProject(req.body.title, req.body.start_date, req.body.end_date, req.body.app_limit, req.body.comp_id)
    .then(data => {
        res.send(data.toString())})
    .catch(err=> console.log(err))
})

router.delete('/:project_id/:token/:username', (req, res)=>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    username=req.params.username

    db_utils.delteProject(req.params.project_id, username)
    .then(data => res.send(data))
    .catch(err => res.status(500).send(err))

})

module.exports = router;
