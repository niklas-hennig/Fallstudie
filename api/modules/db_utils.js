const { Pool, Client} = require('pg');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

module.exports={
  checkIfUserExists: function(username, isFreelancer){
    if (isFreelancer) table = 'freelancer'
    else table = 'company_account'
    pool.query('SELECT user_id FROM freelancer WHERE username = $2', [table, username], (err, data,) => {
      if (data.rows[0].user_id>0){
        return true
      }else{
        return false
      }
    })
  },

  createFreelancer: function(username, email, password){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO freelancer (username, password, email) VALUES ($1, $2, $3) RETURNING user_id', 
      [username, password, email])
      .then(data => {
        console.log(data.rows[0].user_id)
        resolve(data.rows[0].user_id);
        })
      .catch(err => reject(err))
    })
  },

  createCompUser: function(username, email, password){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO company_account (username, password, email) VALUES ($1, $2, $3) RETURNING user_id', 
      [username, password, email])
      .then(data => {
        console.log(data.rows[0].user_id)
        resolve(data.rows[0].user_id);
        })
      .catch(err => reject(err))
    })
  },

  deleteUser: function(username, isFreelancer){
    if (isFreelancer) table = 'freelancer'
    else table = 'company_account'
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM $1 WHERE username=$2', [table, username])
      .then(data => resolve(true))
      .catch(err => reject(err))
    })
  },

  updateUser: function(username, new_password, new_email, infos, isFreelancer){
    if (isFreelancer) table = 'freelancer'
    else table = 'company_account'
    return new Promise((resolve, reject)=> {
      if (!new_password && !new_email) reject()
      if (new_password) {
        pool.query('UPDATE $1 SET password=$2 WHERE username=$3', [table, new_password, username])
        .catch(err=>reject(err))
      }
      if (new_email) {
        pool.query('UPDATE $1 SET email=$2 WHERE username=$3', [table, new_email, username])
        .catch(err => reject(err))
      }
      for (key in infos){
        pool.query('UPDATE $1 SET $2=$3 WHERE username=$4', [table, key, infos[key], username])
        .catch(err => reject(err))
      }
      resolve(true)
    })
  },

  getUserInfo: function(username, isFreelancer) {
    if (isFreelancer) table = 'freelancer'
    else table = 'company_account'
    return new Promise((resolve, reject)=> {
      pool.query('SELECT * FROM $1 WHERE username=$2', [table, username])
      .then(data => resolve(data.rows))
      .catch(err => reject(err))
    })
  },

  findUser: function(username, email, type) {
    console.log(type)
    if (type=='f') table = 'freelancer'
    else table = 'company_account'
    if(!username && ! email) throw Error('no arguments provided')
    if (username)
      return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM ' + table + ' WHERE username=$1', [username])
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err))
      })
    else 
      return new Promise((resolve, reject)=> {
        pool.query('SELECT * FROM ' + table + ' WHERE email=$2', [email])
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err))
      })
  }
  
}