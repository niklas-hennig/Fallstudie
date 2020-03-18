
const jwt = require('jsonwebtoken');

module.exports={
    createToken: function(username){
            return {'Authentification': jwt.sign({username: req.params.username, auth: 'true'}, config.get('myprivatekey'))}
    }
}