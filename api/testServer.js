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
/*
    console.log('testing User; Method: Post => 200')
    await axios.post('http://localhost:80/api/User/Freelancer', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        name: 'test',
        surname: 'user',
        street: 'teststreet',
        number: 1,
        postcode:00001,
        city:'testcity',
        iban:"DE0000000000",
        ktn_owner:"User Test",
        expirience:"Ahnungslos"
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log(test.data)
    }).catch((err) => {throw err})
*/
    console.log('testing User; Method: Post => 400')
    await axios.post('http://localhost:80/api/User/CompanyUser', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        company_name: 'Unknown'
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => {if (!err.response.status==400) console.log(err.response.data); else console.log('passed')})

    console.log('testing User; Method: Post => 200')
    await axios.post('http://localhost:80/api/User/CompanyUser', {
        email: 'test@test.test',
        username: "testing",
        password: "test",
        company_name: 'testcomany'
    }).then((test) => {
        if (!test.status==200) console.error(test); else console.log('passed')
    }).catch((err) => {throw err})

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
