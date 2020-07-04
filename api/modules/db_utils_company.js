const { Pool} = require('pg');

let host = 'localhost'
if(process.env.DB_host) host=process.env.DB_host

const pool = new Pool({
    user: 'docker',
    host: host,
    database: 'docker',
    password: 'docker',
    port: 5432,
  })


module.exports={
    checkIfCompanyExists: function(company_name){
        return new Promise((resolve, reject) => {
          pool.query('SELECT comp_id FROM company WHERE name = $1', [company_name])
          .then(data => {
              if (data.rowCount>0){
                resolve(data.rows[0].comp_id)
              }else{
                reject()
              }
          })
          .catch(err => reject)
          
        })
      },
    
    createCompany: function(name, street, number, postcode, city, country){
    return new Promise ((resolve, reject) => 
    pool.query('INSERT INTO company (name, street, number, postcode, city, country) VALUES($1, $2, $3, $4, $5, $6) RETURNING name',
    [name, street, number, postcode, city, country])
    .then(data => resolve(data.rows[0].name))
    .catch(err => {console.log(err)
        reject(err)})
    )

    },
    
    getCompanyInfo: function(name){
    return new Promise ((resolve, reject) => {
        pool.query('SELECT * FROM company WHERE name=$1', [name])
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    },

    updateCompanyInfo: function(infos, name){
    var i = 0;
    var upd_info = '';
    var params = [];
    for (key in infos){
        if(key!='name'){
        params[i] = infos[key]
        i = i+1;
        if(i>1) upd_info = upd_info + ','
        upd_info = upd_info + key + '=$' + i
        }
    }
    params[i] = name
    i = i+1;
    upd_info = upd_info + ' WHERE name=$' + i
    
    return new Promise((resolve, reject)=>{
        pool.query('UPDATE company SET ' + upd_info, params)
        .then(data =>{
          resolve()})
        .catch(err => reject(err))
    })


    },

    deleteCompany: function(name){
    return new Promise ((resolve, reject) => {
        pool.query('DELETE FROM company WHERE name=$1', [name])
        .then(resolve())
        .catch(err => reject(err))
    })
    },
}