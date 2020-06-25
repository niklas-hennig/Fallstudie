const { Pool} = require('pg');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

module.exports={
    assignApplication: function(username, role_id){
        return new Promise((resolve,reject)=>{
          pool.query(`SELECT c.comp_id FROM company as c
          JOIN project as p ON c.comp_id = p.comp_id
          JOIN role_assignment as ra ON p.project_id = ra.project_id
          JOIN role as r ON r.role_id=ra.role_id
          WHERE r.role_id = $1`, [role_id])
          .then(data => {
            comp_id = data.rows[0].comp_id
            pool.query('SELECT user_id FROM freelancer WHERE username=$1', [username])
            .then(data => {
              user_id = data.rows[0].user_id
              pool.query('INSERT INTO applications (freelancer_id, role_id, comp_id) VALUES($1, $2, $3)', [user_id, role_id, comp_id])
              .then(data => {
                resolve()})
              .catch(err => reject(err))
            })
            .catch(err => reject(err))
          })
          .catch(err => reject(err))
        })
      },
    
    getApplication: function(project_id){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM applications as a 
                JOIN freelancer ON freelancer.user_id=a.freelancer_id
                    WHERE a.role_id=$1`, [project_id])
        .then(data => resolve(data.rows))
        .catch(err => {
        
        reject(err)})
    })
    },

    

    getApplicationsFreelancer: function(username){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT r.* 
        FROM role as r 
        JOIN applications as a ON r.role_id=a.role_id 
        JOIN freelancer as f ON f.user_id=a.freelancer_id
        WHERE f.username=$1`, [username])
        .then(data => resolve(data))
        .catch(err => reject(err))
    })
    },

    getApplicationsCompany: function(comp_id){
    return new Promise((resolve, reject) => {
        pool.query('SELECT f.*, a.role_id, r.title FROM freelancer as f JOIN applications as a ON f.user_id=a.freelancer_id JOIN role as r ON r.role_id=a.role_id WHERE a.comp_id=$1',
        [comp_id])
        .then(data => resolve(data.rows))
        .catch(err => reject(err))
    })
    },

    deleteApplication: function(role_id, username){
    return new Promise((resolve, reject) =>{
        pool.query('SELECT user_id FROM freelancer WHERE username=$1', [username])
        .then(data=>{
        pool.query('DELETE FROM applications WHERE freelancer_id=$1 AND role_id=$2', [data.rows[0].user_id, role_id])
        .then(data => resolve(data))
        .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
    },

    acceptApplication: function(role_id, user_id, username){
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO freelancer_assignment (freelancer_id, role_id) VALUES($1, $2)', [user_id, role_id])
        .then(data =>{
        this.deleteApplication(role_id, username)
        .then(data => resolve())
        .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
    },

    getAccepted: function(role_id){
    return new Promise((resolve, reject) =>{
        pool.query('SELECT f.* FROM freelancer as f JOIN freelancer_assignment as fa ON f.user_id=fa.freelancer_id WHERE fa.role_id=$1', 
        [role_id])
        .then(data => {
        resolve(data)
        })
        .catch(err => reject(err))
    })
    }
}