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
    createRole: function(title, description, requirements, area, payment){
        return new Promise((resolve, reject) => {
          pool.query('SELECT pref_id FROM prefences WHERE pref_name=$1', [area])
          .then(data => {
            if (data.rowCount==0) reject("Prefence not found")
            pool.query(`INSERT INTO role (title, description, requirements, area, payment) 
            VALUES ($1, $2, $3, $4, $5) RETURNING role_id`,
            [title, description, requirements, data.rows[0].pref_id, payment])
            .then(data => resolve(data.rows[0]))
            .catch(err => reject(err))
          }
          )
          .catch(err => reject(err))
        })
      },
    
    assignRoleToProject: function(project_id, role_id, numOfFreelancers){
    return new Promise((resolve, reject) => {
        pool.query('INSERT INTO role_assignment (role_id, project_id, number_of_freelancers) VALUES($1, $2, $3)',
        [role_id, project_id, numOfFreelancers])
        .then(data => resolve(data))
        .catch(err => console.log(err))
    })
    },

    getPersonalizedRoles: function(username){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT role.role_id FROM role 
        JOIN prefences as p ON role.area=p.pref_id 
        JOIN prefence_assignment as pa ON p.pref_id=pa.pref_id 
        JOIN freelancer as f ON f.user_id=pa.user_id 
        WHERE f.username=$1 
        AND role.role_id NOT IN (
        SELECT a.role_id 
        FROM role
        JOIN applications as a ON role.role_id=a.role_id
        JOIN freelancer as f ON a.freelancer_id=f.user_id
        WHERE f.username=$1)
        AND role.role_id NOT IN (
        SELECT fa.role_id 
        FROM role
        JOIN freelancer_assignment as fa ON role.role_id=fa.role_id
        JOIN freelancer as f ON fa.freelancer_id=f.user_id
        WHERE f.username=$1)`,
        [username])
        .then(data => {
          resolve(data.rows)}
          )
        .catch(err => reject(err))
    })
    },

    getRoleTimeline: function(username, start_date){
        return new Promise((resolve, reject) => {
          pool.query(`SELECT DISTINCT r.*, p.start_date, p.end_date
            FROM project as p
            JOIN role_assignment as ra ON p.project_id=ra.project_id
            JOIN role as r on r.role_id=ra.role_id
            JOIN freelancer_assignment as fa ON fa.role_id=ra.role_id 
            JOIN freelancer as f ON fa.freelancer_id=f.user_id
            WHERE p.end_date >= $1 
            AND f.username = $2
          `, [start_date, username])
          .then(data => resolve(data))
          .catch(err => reject(err))
        })
      },

    getRole: function(role_id){
    return new Promise((resolve, reject) => {
        pool.query('SELECT * FROM role WHERE role_id=$1', [role_id])
        .then(data => resolve(data.rows))
        .catch(err => {console.log(err)
        reject(err)})
    })
    },

    getRoleFull: function(role_id){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * FROM role as r
            JOIN role_assignment as ra on ra.role_id=r.role_id
            JOIN project as p ON p.project_id=ra.project_id
            WHERE r.role_id=$1`, [role_id])
        .then(data => resolve(data.rows[0]))
        .catch(err => {console.log(err)
        reject(err)})
    })
    },
    
}