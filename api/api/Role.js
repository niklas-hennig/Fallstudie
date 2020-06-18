const express = require('express');

const db_utils = require('../modules/db_utils');
const auth_utils = require('../modules/auth_utils');
const c = require('config');

router = express.Router();

router.get('/:username/:type/:token', (req, res) =>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    if(req.params.type!='f') return res.status(403).send("Not allowed")
    username = req.params.username

    db_utils.getPersonalizedRoles(username)
    .then(data => res.send(data))
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

router.get('/:id/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.getRole(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/Freelancer/All/:id/:token', (req, res) => {
    console.log(req.params.id)
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.getRoleFull(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/Timeline/:username/:token/:start_day', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.getRoleTimeline(req.params.username, req.params.start_day)
    .then(data => {
        console.log(data.rows)
        res.send(data.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.get('/Accepted/All/:role_id/:token', (req, res) =>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.getAccepted(req.params.role_id)
    .then(data => {
        res.send(data)
    })
    .catch(err => res.status(500).send(err))
})

router.post('/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    console.log(req.body)
    db_utils.createRole(req.body.title, req.body.description, req.body.reqs, req.body.area, req.body.payment)
    .then(data => {
        console.log("created role, id:")
        console.log(data.role_id)
        db_utils.assignRoleToProject(req.body.project_id, data.role_id, req.body.numberOfFreeancers)
        .then(data => {
            console.log("assigned role:")
            console.log(data)
            res.send(data)
        })
        .catch(err => res.status(500).send(err))
    })
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

module.exports = router;