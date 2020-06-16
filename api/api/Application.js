const express = require('express');

const db_utils = require('../modules/db_utils');
const auth_utils = require('../modules/auth_utils');

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
    //if (!req.cookies['Auth']) return res.status(401).send("Not signed in")
    //if(req.cookies['Auth']['type']=='f') return res.status(403).send("Not allowed")

    db_utils.getApplication(req.params.project_id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)})
})

router.get('/Freelancer/:username/:token', (req, res) => {
    console.log("requesting apps")
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')

    db_utils.getApplicationsFreelancer(req.params.username)
    .then(data => {
        console.log(data.rows)
        res.send(data.rows)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.delete('/:role_id/:username/:token',(req, res)=>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_utils.deleteApplication(req.params.role_id, req.params.username)
    .then(data => res.send(data))
    .catch(err=> {console.log(err)
        res.status(500).send(err)})

})

module.exports = router;