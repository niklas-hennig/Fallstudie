const jwt = require('jsonwebtoken');
const db_utils = require('./db_utils');
const config = require('config');



module.exports={
    createToken: function(username){
        private = jwt.sign({auth: 'true', time: Date.now()}, config.get('myprivatekey'))
        cookie_content = {username: username, private}
        return cookie_content
    },

    getAuthentification: function(username, password, type){
        return new Promise((resolve, reject) => {
            db_utils.findUser(username, null, type)
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