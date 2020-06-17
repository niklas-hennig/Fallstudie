const express = require('express');

const auth_utils = require('../modules/auth_utils')
const fs = require('fs');

const router = express.Router();

router.get('/:username', (req, res) => {
    new Promise ((resolve, reject) => {
        fs.readFile(req.params.username+'/resume.docx', (err, data) => {
            if(err) reject(err)
            else resolve(data)
        })
    })
    .then(data => res.send(data))
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.post('/:username', (req, res)=>{
    console.log(req.files.file)
    console.log(req.paramsusername)
    new Promise((resolve, reject) => {
        if (!fs.existsSync(req.params.username)){
            fs.mkdir(req.params.username, (err) => reject(err))
        }
    fs.writeFile(req.params.username+'/resume.docx', req.files.file.data, (err) => {
        if(err) reject(err)
        else resolve()
    })
    })
    .then(d =>{
        res.send("file written")
    })
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

module.exports = router;