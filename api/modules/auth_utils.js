const jwt = require('jsonwebtoken');
const db_utils = require('./db_utils_user');
const config = require('config');



module.exports={
    createToken: function(username, type){
        private = jwt.sign({auth: 'true', time: Date.now()}, config.get('myprivatekey'))
        cookie_content = {username: username, type: type, private}
        return cookie_content
    },

    validateToken: function(token){
        private = jwt.verify(token, config.get('myprivatekey'))
        if(private['auth']) return true
        else return false

    },

    getAuthentification: function(username, password, type){
        return new Promise((resolve, reject) => {
            db_utils.findUser(username, null, type)
            .then(data => {
                if (password==data.password){
                    cookie = this.createToken(username, type)
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