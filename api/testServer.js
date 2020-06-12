const express = require('express')
const cookieParser = require('cookie-parser');
const axios = require('axios');

const testUser = require('./tests/testUser')
const testPrefence = require('./tests/testPrefence');
const testCompany = require('./tests/testCompany');

const app = express();
app.use(cookieParser());

async function test (t) {

    await testUser.test();

    await testPrefence.test();

    await testCompany.test();
    


    console.log('testing Company; Method: get => 200')
    await axios.get('http://localhost:80/api/Company/testcomany', {
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {console.error(err)})

    


   

    setTimeout(function(){
        console.log('testing Authentification; Method: Get => 200, Cookie');
        axios.post('http://localhost:80/api/Authentification/', {
            username: 'testuser',
            password: 'test',
            type: 'f'
        }).then((res) => {
        console.log(res.headers['set-cookie'][0])
        token = res.headers['set-cookie'][0]
    }).catch((err) => console.log(err))}, 500);
    
    
}

test();
