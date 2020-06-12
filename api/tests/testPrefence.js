const cookieParser = require('cookie-parser');
const axios = require('axios');

//USER
module.exports={
    test: async function(){

        console.log('====================')
        console.log('Begin Prefence Test')
        console.log('====================')

        console.log('testing Prefence; all; Method: GET => 200')
        await axios.get('http://localhost:80/api/Prefence', {
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        }).catch((err) => {console.error(err)})

        console.log('testing Prefence; Method: GET => 200')
        await axios.get('http://localhost:80/api/Prefence/testuser', {
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        }).catch((err) => {console.error(err)})

        console.log('testing Prefence; Method: Put => 200')
        await axios.put('http://localhost:80/api/Prefence/testuser', {
            prefence: 'testprefence'
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        }).catch((err) => {console.error(err)})

        console.log('testing Prefence; Method: Delete => 200')
        await axios.delete('http://localhost:80/api/Prefence/testuser/testprefence', {
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        }).catch((err) => {console.error(err)})

    }
}