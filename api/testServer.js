const express = require('express')
const cookieParser = require('cookie-parser');
const axios = require('axios');

const db_utils = require('./modules/db_utils')

const app = express();
app.use(cookieParser());

async function test (t) {
    
    console.log('testing User; Method: Get => 404')
    await axios.get('http://localhost:2001/api/User', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==404) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no email => 400')
    await axios.post('http://localhost:2001/api/User', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no username => 400')
    await axios.post('http://localhost:2001/api/User', {
        email: 'test@test.test',
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no password => 400')
    await axios.post('http://localhost:2001/api/User', {
        email: 'test@test.test',
        username: "testing"
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post => 200')
    await axios.post('http://localhost:2001/api/User', {
        email: 'test@test.test',
        username: "testing",
        password: "test"
    }).then((test) => {
        if (!test.status==200) console.log(test); else console.log(test.data)
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Post => 400')
    await axios.post('http://localhost:2001/api/User', {
        email: 'test@test.test',
        username: "testing",
        password: "test"
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Put, password => 200')
    await axios.put('http://localhost:2001/api/User', {
        username: 'testing',
        password: 'new',
        email: 'new_email'
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Put, no info => 400')
    await axios.put('http://localhost:2001/api/User', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Delete => 200')
    await axios.delete('http://localhost:2001/api/User/testing', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))

    token = null

    
    setTimeout(function(){
        console.log('testing Authentification; Method: Get => 200, Cookie');
        axios.get('http://localhost:2001/api/Authentification/testuser/test').then((res) => {
        console.log(res.headers['set-cookie'][0])
        token = res.headers['set-cookie'][0]
    }).catch((err) => console.log(err))}, 500);

    console.log('>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>')
    console.log('finding')
    await db_utils.findUser('none').then(data => {
        if (data)
            console.log(data.length)
    })
    console.log('create')
    await db_utils.createUser('newtest', 'tst', 'temp').then(data => console.log(data)).catch(err => console.log(err))
    console.log('delete')
    await db_utils.deleteUser('newtest').then(data => console.log(data)).catch(err => console.log(err))
    console.log('get')
    await db_utils.getUserInfo('testuser').then(res => console.log(res))
}

test();