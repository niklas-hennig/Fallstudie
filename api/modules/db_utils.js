const { Pool, Client} = require('pg');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

module.exports={
  

  setPasswordToken: function(username, type) {
    let token = 0
    token = Math.round(Math.random()*1000)
    let col = ''
    if (type==="f") col="freelancer_user"
    else col="comp_user_user"
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM password_token WHERE '+col+'=$1', [username])
      .then(data => 
        pool.query('INSERT INTO password_token ('+col+', token) VALUES ($1, $2) RETURNING token', [username, token])
        .then(data => resolve(data))
        .catch(err => reject(err))
      )
      
      .catch(err => reject(err))
    })
  },

  setNewPassword: function(username, type, token, new_password){
    let col = ''
    if (type==="f") col="freelancer_user"
    else col="comp_user_user"
    return new Promise((resolve, reject) => {
      pool.query('SELECT token FROM password_token WHERE '+col+'=$1', [username])
      .then(data => {
        if (token=data.rows[0].token){
          let table = ''
          if(type==="f") table='freelancer'
          else table='company_account'
          pool.query('UPDATE '+table+' SET password = $1 WHERE username=$2', [new_password, username])
          .then(data => resolve(data))
          .catch(err => reject(err))
        }
      })
      .catch(err => reject(err))
    })
  },

  getPrefences: function(username){
    return new Promise((resolve, reject) => {
      pool.query('SELECT pref_name FROM prefences as a JOIN prefence_assignment as b ON a.pref_id=b.pref_id JOIN freelancer as c ON b.user_id=c.user_id')
      .then(data => resolve(data.rows))
      .catch(err => reject(err))
    })
  },

  getAllPrefences: function(){
    return new Promise((resolve, reject) => {
      pool.query('SELECT pref_name FROM prefences')
      .then(data => resolve(data.rows))
      .catch(err => reject(err))
    })
  },

  assignPrefence: function(username, prefence_name){
    return new Promise ((resolve, reject) => 
      pool.query('SELECT user_id FROM freelancer WHERE username=$1', [username])
          .then(data => {
            user_id = data.rows[0].user_id;
            pool.query('DELETE FROM prefence_assignment WHERE user_id=$1', [user_id])
            .then(data => {
              pool.query('SELECT pref_id FROM prefences WHERE pref_name=$1', [prefence_name])
                  .then(data => {pool.query('INSERT INTO prefence_assignment (user_id, pref_id) VALUES ($1, $2)', [user_id, data.rows[0].pref_id])
                                  .then(data => resolve())
                                  .catch(err => reject(err))
                    })
                  .catch(err => reject(err))
                  })
                })
            .catch(err => reject(err))
          .catch(err => reject(err))
      )
  },

  deletePrefenceAssignment: function(username, prefence_name){
    return new Promise ((resolve, reject) => 
    pool.query('SELECT user_id FROM freelancer WHERE username=$1', [username])
        .then(data => {
          user_id = data.rows[0].user_id;
          pool.query('SELECT pref_id FROM prefences WHERE pref_name=$1', [prefence_name])
              .then(data => {pool.query('DELETE FROM prefence_assignment WHERE user_id=$1 AND pref_id=$2', [user_id, data.rows[0].pref_id])
                              .then(data => resolve())
                              .catch(err => reject(err))
                })
              .catch(err => reject(err))
              })
          .catch(err => reject(err))
    )
  }
  
}