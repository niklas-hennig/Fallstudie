const express = require('express');

const auth_utils = require('../modules/auth_utils')
const fs = require('fs');

const FileType = require('file-type');

const router = express.Router();

router.get('/:username/:token', (req, res) => {
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    fs.readdir('./files/'+req.params.username ,function(err, list){
        console.log(list)
        file = list[0] //kein ordnen nach Datum möglich sowhl mtime als auch ctime in fs.statSync(file) sind undeined, rest ist gesetzt
        res.download('./files/'+req.params.username+'/'+file)
    })
    
})

router.post('/:username/:token', (req, res)=>{
    if(!auth_utils.validateToken(req.params.token)) return res.status(401).send('not signed in')
    new Promise((resolve, reject) => {
        if (!fs.existsSync('files/'+req.params.username)){
            fs.mkdir('files/'+req.params.username, (err) => {
                if(err) reject(err)})
        }
        FileType.fromBuffer(req.files.file.data)
        .then(type => {
            fs.writeFile('files/'+req.params.username+'/resume_'+req.params.username+'.'+type.ext, req.files.file.data, (err) => {
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