const cookieParser = require('cookie-parser');
const axios = require('axios');

module.exports={
    test: async function(){
        console.log('====================')
        console.log('Begin Project Test')
        console.log('====================')
        /*
        console.log('testing Company; Method: GET => 200')
        await axios.get('http://localhost:80/api/Company/testcomany', {
        }).then((test) => {
            if (!test.status==200) console.error(test); else console.log('passed')
        })
        .catch(err => console.log(err))
        */
    }
}