const { Pool} = require('pg');

const pool = new Pool({
    user: 'docker',
    host: 'localhost',
    database: 'docker',
    password: 'docker',
    port: 5432,
  })

module.exports={
    getAllProjects: function(comp_account){
        return new Promise((resolve, reject) => {
          pool.query(`SELECT project.*, c.name
                      FROM project
                      JOIN company_account as ca
                      ON project.comp_id = ca.comp_id
                      LEFT JOIN company as c on c.comp_id=project.comp_id
                      WHERE ca.username = $1`, [comp_account])
          .then(data => resolve(data.rows))
          .catch(err => {console.log('db:')
            console.log(err)
            reject(err)})
        })
      },

      getActiveProjects: function(comp_account){
        return new Promise((resolve, reject) => {
          pool.query(`SELECT project.*, c.name
                      FROM project
                      JOIN company_account as ca
                      ON project.comp_id = ca.comp_id
                      LEFT JOIN company as c on c.comp_id=project.comp_id
                      WHERE ca.username = $1 
                      AND project.application_limit >= now()`, [comp_account])
          .then(data => resolve(data.rows))
          .catch(err => {
            reject(err)})
        })
      },

      getRunningProjects: function(comp_account){
        return new Promise((resolve, reject) => {
          pool.query(`SELECT project.*, c.name
                      FROM project
                      JOIN company_account as ca
                      ON project.comp_id = ca.comp_id
                      LEFT JOIN company as c on c.comp_id=project.comp_id
                      WHERE ca.username = $1
                      AND project.end_date >= now()
                      AND project.start_date <= now()`, [comp_account])
          .then(data => resolve(data.rows))
          .catch(err => {
            reject(err)})
        })
      },
    
    createProject: function(title, start_date, end_date, app_limit, comp_id){
    return new Promise((resolve, reject) => {
    pool.query('INSERT INTO project (titel, start_date, end_date, application_limit, comp_id) VALUES($1, $2, $3, $4, $5) RETURNING project_id', 
    [title, start_date, end_date, app_limit, comp_id])
    .then(data=>{
        resolve(data.rows[0].project_id)})
        .catch(err=>{ reject(err)
        })
    })
    },

    getProjectInfo: function(project_id){
    return new Promise((resolve, reject) => {
        pool.query(`SELECT * 
        FROM project as p
        JOIN role_assignment as ra ON ra.project_id=p.project_id
        JOIN role as r ON r.role_id=ra.role_id
        WHERE p.project_id=$1`, [project_id])
        .then(data=>resolve(data.rows))
        .catch(err=>{
        reject(err)
        })
    })
    },

    

    delteProject: function(project_id, username){
    return new Promise((resolve, reject)=>{
        pool.query('DELETE FROM role WHERE role_id IN (SELECT r.role_id FROM role as r JOIN role_assignment as ra ON ra.role_id=r.role_id WHERE ra.project_id=$1)', 
        [project_id])
        .then(data=>{
        pool.query(`DELETE FROM project WHERE project_id=$1 AND comp_id=(SELECT MAX(comp_id) FROM company_account WHERE username=$2)`,  [project_id, username])
        .then(data => resolve())
        .catch(err => reject(err))
        })
        .catch(err => reject(err))
    })
    },
}