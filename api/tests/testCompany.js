const cookieParser = require('cookie-parser');
const axios = require('axios');

module.exports={
    test: async function(){

        console.log('====================')
        console.log('Begin Company Test')
        console.log('====================')

        console.log('testing Company; Method: GET => 200')
        await axios.get('http://localhost:80/api/Company/testcomany', {
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        })
        .catch(err => console.log(err))

        console.log('testing Company; no info; Method: Post => 400')
        await axios.post('http://localhost:80/api/Company/testcomany', {

        }).then((test) => {
            console.error(test)
        })
        .catch(err => { if(!err.response.status==400) console.log(err)
            else console.log('passed')
        })

        console.log('testing Company; no country; Method: Post => 400')
        await axios.post('http://localhost:80/api/Company', {
            name: 't1',
            street: 'teststreet',
            number: 5,
            postcode: 10101,
            city: 'unknown'
        }).then((test) => {
            console.log(test)
        })
        .catch(err => { if(err.response.status!=400) console.log(err)
            else console.log('passed')
        })

        console.log('testing Company; all; Method: Post => 200')
        await axios.post('http://localhost:80/api/Company', {
            name: 't1',
            street: 'teststreet',
            number: 5,
            postcode: 10101,
            city: 'unknown',
            country: 'nowhere'
        }).then((test) => {if(!test.status==200) console.log(test)
            else console.error('passed')
        })
        .catch(err => {console.log(err)
        })

        console.log('testing Company; no name; Method: Put => 400')
        await axios.put('http://localhost:80/api/Company', {
            street: 'teststreet_new',
            number: -4,
            postcode: 10110,
            city: 'never'
        }).then((test) => {
            console.error(test)
        })
        .catch(err => {if(err.response.status!=400) console.log(err)
                        else console.log('passed')
        })

        console.log('testing Company; all; Method: Put => 200')
        await axios.put('http://localhost:80/api/Company', {
            name: 't1',
            street: 'teststreet_new',
            number: -3,
            postcode: 10110,
            city: 'never'
        }).then((test) => {if(!test.status==200) console.log(test)
            else console.error('passed')
        })
        .catch(err => {console.log(err)
        })

        console.log('testing Company;  Method: Delete => 200')
        await axios.delete('http://localhost:80/api/Company/t1', {
        }).then((test) => {if(!test.status==200) console.log(test)
            else console.error('passed')
        })
        .catch(err => {console.log(err)
        })

    }
}