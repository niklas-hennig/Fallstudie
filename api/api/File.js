const express = require('express');

const auth_utils = require('../modules/auth_utils')
const fs = require('fs');

const FileType = require('file-type');

const router = express.Router();

router.get('/:username/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    new Promise ((resolve, reject) => {
        fs.readdir(req.params.username,function(err, list){
            file = list[0] //kein ordnen nach Datum möglich sowhl mtime als auch ctime in fs.statSync(file) sind undeined, rest ist gesetzt
            fs.readFile(req.params.username+'/'+ file, (err, data) => {
                if(err) reject(err)
                else resolve(data)
            })
        })
    })
    .then(data => {
        FileType.fromBuffer(data)
        .then(type => {
            res.setHeader('Content-Type', type.mime);
            res.send(data)
            console.log(type.mime)
        })
    })
    .catch(err => {
        console.log(err)
        res.status(500).send(err)
    })
})

router.post('/:username/:token', (req, res)=>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    new Promise((resolve, reject) => {
        if (!fs.existsSync(req.params.username)){
            fs.mkdir(req.params.username, (err) => {console.log("1")
                reject(err)})
        }
        FileType.fromBuffer(req.files.file.data)
        .then(type => {
            fs.writeFile(req.params.username+'/resume.'+type.ext, req.files.file.data, (err) => {
                if(err) reject(err)
                else resolve()
            })
        })
    })
    .then(d =>{
        res.send("file written")
    })
    .catch(err => {console.log(err)
        res.status(500).send(err)})
})

module.exports = router;