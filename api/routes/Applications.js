const express = require('express');

const db_application = require('../modules/db_utils_application')
const auth_utils = require('../modules/auth_utils');

router = express.Router();

//Alle Bewerbungen für eine Rolle übergabe der Rolen ID, rückgabe als array von JSON
router.get('/:role_id', (req, res) => {
    db_application.getApplication(req.params.role_id)
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)})
})

//Alle Bewerbungen eines Freelancers, Übergabe von Nutzername und gültigem Anmeldetoken, Rückgabe als array von JSON
router.get('/Freelancer/:username/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')

    db_application.getApplicationsFreelancer(req.params.username)
    .then(data => {
        res.send(data.rows)
    })
    .catch(err => {
        res.status(500).send(err)
    })
})

//Alle Bewerbungen für eine Firma, Übergabe von Firmen ID, Rückgabe als Array von JSON
router.get('/Company/:comp_id', (req, res) =>{
    db_application.getApplicationsCompany(req.params.comp_id)
    .then(data => {
        res.send(data)
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

//Anlegen neuer Bewerbung, übergabe von Role_id für die die Bewerbung gilt, Rückgabe von "Application created"
router.post('/:role_id/:username/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    
    username = req.params.username

    db_application.assignApplication(username, req.params.role_id)
    .then(res.send('Application created'))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)})
    
})

//Akzeptieren einer Bewerbung, Übergabe von Role_id, user_id und Nutzername, Antwort mit "accepted"
router.put('/:role_id/:user_id/:username', (req, res)=>{
    db_application.acceptApplication(req.params.role_id, req.params.user_id, req.params.username)
    .then(data => res.send('accepted'))
    .catch(err => res.status(500).send(err))
})

//Löschen bzw. Zurückziehen/Zurückweisen einer Bewerbung, Übergabe von Role_id, Nutzername und Anmeldetoken,
//Rückgabe von Datenbank Ausgabe
router.delete('/:role_id/:username/:token',(req, res)=>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    db_application.deleteApplication(req.params.role_id, req.params.username)
    .then(data => res.send(data))
    .catch(err=> {console.log(err)
        res.status(500).send(err)})

})

module.exports = router;