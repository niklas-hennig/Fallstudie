const express = require('express')
const cookieParser = require('cookie-parser');
const axios = require('axios');

const app = express();
app.use(cookieParser());

async function test () {
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
    }).then((res) => {
        if (!res.status==200) console.log(res); else console.log(res.data)
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Put, password => 200')
    await axios.put('http://localhost:2001/api/User', {
        username: 'testing',
        password: 'new',
        email: 'new_email'
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Delete => 200')
    await axios.delete('http://localhost:2001/api/User/testing', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))

    token = null

    console.log('testing Authentification; Method: Get => 200, Cookie')
    await axios.get('http://localhost:2001/api/Authentification/testuser/test').then((res) => {
        console.log(res.headers['set-cookie'])
        token = res.headers['set-cookie']
    }).catch((err) => console.log(err))
    
}

test();