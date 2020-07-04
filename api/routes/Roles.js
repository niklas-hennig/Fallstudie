const express = require('express');

const db_application = require('../modules/db_utils_application');
const db_role = require('../modules/db_utils_role')
const auth_utils = require('../modules/auth_utils');

router = express.Router();

//Gibt alle Rollen zurück, die zu den gewählten Präfenzen passen und die bisher in keiner Bewerbung vorkommen
router.get('/:username/:type/:token', (req, res) =>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    if(req.params.type!='f') return res.status(403).send("Not allowed")
    username = req.params.username
    db_role.getPersonalizedRoles(username)
    .then(data => res.send(data))
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

//Gibt informationen zu einer speziellen Rolle aus
router.get('/:id/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_role.getRole(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

//Gibt alle Informationen zu einer Rolle aus, inklusive des zugehörigen Projekts
router.get('/Freelancer/All/:id/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_role.getRoleFull(req.params.id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

//Gibt zu allen Rollen start und enddatum aus, nur Rollen, die nach dem spezifizierten datum beginnen
router.get('/Timeline/:username/:token/:start_day', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_role.getRoleTimeline(req.params.username, req.params.start_day)
    .then(data => {
        res.send(data.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

//Gibt alle Akzeptierten Bewerbungen zu einer Rolle aus
router.get('/Accepted/All/:role_id/:token', (req, res) =>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_application.getAccepted(req.params.role_id)
    .then(data => {
        res.send(data)
    })
    .catch(err => res.status(500).send(err))
})

//Erstellt eine neue Rolle
router.post('/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    if(!(req.body.title&&req.body.description&&req.body.reqs&&req.body.area&&req.body.payment&&req.body.project_id&&req.body.numberOfFreeancers))
    return res.status(400).send('Information inccomplete')
    db_role.createRole(req.body.title, req.body.description, req.body.reqs, req.body.area, req.body.payment)
    .then(data => {
        db_role.assignRoleToProject(req.body.project_id, data.role_id, req.body.numberOfFreeancers)
        .then(data => {
            res.send(data)
        })
        .catch(err => res.status(500).send(err))
    })
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

module.exports = router;