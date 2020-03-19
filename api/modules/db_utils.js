const { Pool, Client} = require('pg');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

module.exports={
  checkIfUserExists: function(username){
    pool.query('SELECT user_id FROM user_account WHERE username = $1', [req.body.email], (err, data,) => {
      if (data.rows[0].user_id>0){
        return true
      }else{
        return false
      }
    })
  },

  createUser: function(username, email, password){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO user_account (username, password, email) VALUES ($1, $2, $3) RETURNING user_id', 
      [username, password, email])
      .then(data => resolve(data.rows[0].user_id))
      .catch(err => reject(err))
    })
  },

  deleteUser: function(username){
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM user_account WHERE username=$1', [username])
      .then(data => resolve(true))
      .catch(err => reject(err))
    })
  },

  updateUser: function(username, new_password, new_email){
    return new Promise((resolve, reject)=> {
      if (!new_password && !new_email) reject()
      if (new_password) {
        pool.query('UPDATE user_account SET password=$1 WHERE username=$2', [new_password, username])
        .catch(err=>reject(err))
      }
      if (new_email) {
        pool.query('UPDATE user_account SET email=$1 WHERE username=$2', [new_email, username])
        .catch(err => reject(err))
      }
      resolve(true)
    })
  },

  getUserInfo: function(username) {
    return new Promise((resolve, reject)=> {
      pool.query('SELECT * FROM user_account WHERE username=$1', [username])
      .then(data => resolve(data.rows))
      .catch(err => reject(err))
    })
  },

  findUser: function(username, email) {
    if(!username && ! email) throw Error('no arguments provided')
    if (username)
      return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM user_account WHERE username=$1', [username])
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err))
      })
    else
      return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM user_account WHERE email=$1', [email])
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err))
      })
  }
}