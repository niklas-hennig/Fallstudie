const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');

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
        if (!res.status==200) console.log(res); else console.log('passed')
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Get => 200')
    await axios.get('http://localhost:2001/api/testDB', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))

    console.log('testing User; Method: Delete => 200')
    await axios.delete('http://localhost:2001/api/User/:testing', {
    }).then((res) => {
        console.log(res.data)
    }).catch((err) => console.log(err))
}

test();