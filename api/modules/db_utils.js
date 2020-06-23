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
    return new Promise((resolve, reject) => {
      pool.query('SELECT user_id FROM freelancer WHERE username = $1', [username])
      .then(data => {
          if (data.rows[0].user_id>0){
            resolve()
          }else{
            reject(data)
          }
      })
      .catch(err => reject(err))
      
    })
  },

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

  createFreelancer: function(username, email, password, name, surname, gender){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO freelancer (username, password, email, name, surname, gender) VALUES ($1, $2, $3, $4, $5, $6) RETURNING user_id', 
      [username, password, email, name, surname, gender])
      .then(data => {
        resolve(data.rows[0].user_id);
        })
      .catch(err => {
        reject(err)
        reject(err)
      })
    })
  },

  createCompUser: function(username, email, password, name, surname, gender, comp_id){
    return new Promise((resolve, reject) => {
      pool.query('INSERT INTO company_account (username, password, email, name, surname, comp_id, gender) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING user_id', 
      [username, password, email, name, surname, comp_id, gender])
      .then(data => {
        if (comp_id==0) reject();
        resolve(data.rows[0].user_id);
        })
      .catch(err => reject(err))
    })
  },

  deleteUser: function(username, type){
    if (type=='f') table = 'freelancer'
    else table = 'company_account'
    return new Promise((resolve, reject) => {
      pool.query('DELETE FROM ' + table +' WHERE username=$1', [username])
      .then(data => resolve(true))
      .catch(err => reject(err))
    })
  },

  updateFreelancer: function(username, new_password, new_email, infos){
    var i = 0;
    var upd_info = '';
    var params = [];
    for (key in infos){
      if(key!='username'){
        params[i] = infos[key]
        i = i+1;
        if(i>1) upd_info = upd_info + ','
        upd_info = upd_info + key + '=$' + i
      }
    }
    params[i] = infos['username']
    i = i+1;
    upd_info = upd_info + ' WHERE username=$' + i

    return new Promise((resolve, reject)=> {
      if (new_password) {
        pool.query('UPDATE freelancer SET password=$1 WHERE username=$2', [new_password, username])
        .then(resolve(true))
        .catch(err=>reject(err))
      }else if (new_email) {
        pool.query('UPDATE freelancer SET email=$1 WHERE username=$2', [new_email, username])
        .then(resolve(true))
        .catch(err => reject(err))
      }else{
        pool.query('UPDATE freelancer SET ' + upd_info , params)
        .then(resolve(true))
        .catch(err => reject(err))
      }
    })
  },

  updateCompUser: function(username, new_password, new_email, infos){
    var i = 0;
    var upd_info = '';
    var params = [];
    for (key in infos){
      if(key!='username'){
        params[i] = infos[key]
        i = i+1;
        if(i>1) upd_info = upd_info + ','
        upd_info = upd_info + key + '=$' + i
      }
    }
    params[i] = infos['username']
    i = i+1;
    upd_info = upd_info + ' WHERE username=$' + i

    return new Promise((resolve, reject)=> {
      if (new_password) {
        pool.query('UPDATE company_account SET password=$1 WHERE username=$2', [new_password, username])
        .then(resolve(true))
        .catch(err=>reject(err))
      }else if (new_email) {
        pool.query('UPDATE company_account SET email=$1 WHERE username=$2', [new_email, username])
        .then(resolve(true))
        .catch(err => reject(err))
      }else{
        pool.query('UPDATE company_account SET ' + upd_info , params)
        .then(resolve(true))
        .catch(err => reject(err))
      }
    })
  },

  getUserInfo: function(username, isFreelancer) {
    if (isFreelancer) table = 'freelancer as t'
    else table = 'company_account as t'
    let compInfo = ''
    let select = ''
    if (!isFreelancer) {
      compInfo = ' LEFT JOIN company as c ON c.comp_id=t.comp_id '
      select = ', c.name AS company_name'
    }
    return new Promise((resolve, reject)=> {
      pool.query('SELECT t.*'+ select + ' FROM '+ table + compInfo+ ' WHERE t.username=$1', [username])
      .then(data => resolve(data.rows[0]))
      .catch(err => reject(err))
    })
  },

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
        console.log(data.rows[0].token)
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


  findUser: function(username, email, type) {
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
            pool.query('SELECT pref_id FROM prefences WHERE pref_name=$1', [prefence_name])
                .then(data => {pool.query('INSERT INTO prefence_assignment (user_id, pref_id) VALUES ($1, $2)', [user_id, data.rows[0].pref_id])
                                .then(data => resolve())
                                .catch(err => reject(err))
                  })
                .catch(err => reject(err))
                })
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

  updateCompanyInfo: function(infos){
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
    params[i] = infos['name']
    i = i+1;
    upd_info = upd_info + ' WHERE name=$' + i

    return new Promise((resolve, reject)=>{
      pool.query('UPDATE company SET ' + upd_info, params)
      .then(resolve())
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

  createRole: function(title, description, requirements, area, payment){
    return new Promise((resolve, reject) => {
      pool.query('SELECT pref_id FROM prefences WHERE pref_name=$1', [area])
      .then(data => 
        pool.query(`INSERT INTO role (title, description, requirements, area, payment) 
        VALUES ($1, $2, $3, $4, $5) RETURNING role_id`,
        [title, description, requirements, data.rows[0].pref_id, payment])
        .then(data => resolve(data.rows[0]))
        .catch(err => reject(err))
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
      .then(data => resolve(data.rows))
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
          pool.query('INSERT INTO applications (freelancer_id, role_id, com_id) VALUES($1, $2, $3)', [user_id, role_id, comp_id])
          .then(data => {
            console.log(data)
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

  getAllProjects: function(comp_account){
    return new Promise((resolve, reject) => {
      pool.query(`SELECT project.*
                  FROM project
                  JOIN company_account as ca
                  ON project.comp_id = ca.comp_id
                  WHERE ca.username = $1`, [comp_account])
      .then(data => resolve(data.rows))
      .catch(err => {console.log('db:')
        console.log(err)
        reject(err)})
    })
  },

  createProject: function(title, start_date, end_date, app_limit, comp_id){
    console.log(title)
    return new Promise((resolve, reject) => {
    pool.query('INSERT INTO project (titel, start_date, end_date, application_limit, comp_id) VALUES($1, $2, $3, $4, $5) RETURNING project_id', 
    [title, start_date, end_date, app_limit, comp_id])
    .then(data=>{console.log(data.rows[0].project_id)
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

  getRoleTimeline: function(username, start_date){
    console.log("db:")
    console.log(username)
    console.log(start_date)
    return new Promise((resolve, reject) => {
      pool.query(`SELECT DISTINCT r.*, p.start_date, p.end_date
        FROM project as p
        JOIN role_assignment as ra ON p.project_id=ra.project_id
        JOIN role as r on r.role_id=ra.role_id
        JOIN freelancer_assignment as fa ON fa.role_id=ra.role_id 
        JOIN freelancer as f ON fa.freelancer_id=f.user_id
        WHERE p.start_date >= $1 
        AND f.username = $2
      `, [start_date, username])
      .then(data => resolve(data))
      .catch(err => reject(err))
    })
  },

  delteProject: function(project_id, username){
    console.log(project_id)
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
      pool.query('SELECT f.*, a.role_id FROM freelancer as f JOIN applications as a ON f.user_id=a.freelancer_id WHERE a.com_id=$1',
      [comp_id])
      .then(data => resolve(data.rows))
      .catch(err => reject(err))
    })
  },

  deleteApplication: function(role_id, username){
    return new Promise((resolve, reject) =>{
      pool.query('SELECT user_id FROM freelancer WHERE username=$1', [username])
      .then(data=>{
        console.log("found user")
        console.log(data)
        console.log(username)
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