const express = require('express')
const cookieParser = require('cookie-parser');
const axios = require('axios');

const db_utils = require('./modules/db_utils')

const app = express();
app.use(cookieParser());

async function test (t) {

    console.log('testing User; Method: Get => 404')
    await axios.get('http://localhost:80/api/User/Freelancer', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==404) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no email => 400')
    await axios.post('http://localhost:80/api/User/Freelancer', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no username => 400')
    await axios.post('http://localhost:80/api/User/Freelancer', {
        email: 'test@test.test',
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no password => 400')
    await axios.post('http://localhost:80/api/User/Freelancer', {
        email: 'test@test.test',
        username: "testing"
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post, no name => 400')
    await axios.post('http://localhost:80/api/User/Freelancer', {
        email: 'test@test.test',
        username: "testing",
        password: 'test'
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User/Freelancer; Method: Post => 200')
    await axios.post('http://localhost:80/api/User/Freelancer', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        name: 'test',
        surname: 'user',
        gender: 'u'
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log(test.data)
    }).catch((err) => {throw err})

    console.log('testing User; Method: Post => 400')
    await axios.post('http://localhost:80/api/User/CompanyUser', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        company_name: 'Unknown'
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User/CompanyUser; Method: Post => 200')
    await axios.post('http://localhost:80/api/User/CompanyUser', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        company_name: 'testcomany',
        name: 'accountant',
        surname: 'test',
        gender: 'u'
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {throw err})

    console.log('testing User; Method: Put => 200')
    await axios.put('http://localhost:80/api/User/Freelancer', {
        username: 'testing',
        street: "t1street",
        number: 13
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {console.error(err)})

    console.log('testing User; Method: Put => 200')
    await axios.put('http://localhost:80/api/User/CompanyUser', {
        username: 'testing',
        name: 'changed'
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {console.error(err)})

    console.log('testing User; Method: Delete => 200')
    await axios.delete('http://localhost:80/api/User/testing/f', {
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {console.error(err)})

    await axios.delete('http://localhost:80/api/User/testing/c', {
    }).then((test) => {
        if (!test.status==200) console.error(test); 
    }).catch((err) => {console.log('Error on Cleanup of Comp User' + err)})
   

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
