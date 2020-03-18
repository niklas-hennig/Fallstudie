function validateBody(req) {
    if (!req.body.email) return 'No email provided';
    if (!req.body.username) return 'No username provided';
    if (!req.body.password) return 'No password provided';
    return
}

module.exports=validateBody;