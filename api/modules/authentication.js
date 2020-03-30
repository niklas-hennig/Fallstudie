const jwt = require('jsonwebtoken');
const db_utils = require('./db_utils');
const config = require('config');



module.exports={
    createToken: function(username){
        cookie_content = jwt.sign({username: username, auth: 'true', time: Date.now()}, config.get('myprivatekey'))
        return cookie_content
    },

    getAuthentification: function(username, password){
        return new Promise((resolve, reject) => {
            db_utils.findUser(username)
            .then(data => {
                if (password==data.password){
                    cookie = this.createToken(username)
                    resolve(cookie)
                }else{
                    reject('Wrong username or password')
                }
            })
            .catch(err => {
                reject(err)})
        })
    }
}