SELECT * FROM freelancer as f LEFT JOIN prefence_assignment as pa ON pa.user_id=f.user_id LEFT JOIN prefences as p on p.pref_id=pa.pref_id;

SELECT * FROM applications as a JOIN freelancer ON freelancer.user_id=a.freelancer_id

SELECT * FROM freelancer;
DELETE FROM freelancer WHERE username != 'testuser';
SELECT * FROM freelancer as f JOIN prefence_assignment as pa on pa.user_id=f.user_id JOIN prefences as p on pa.pref_id=p.pref_id;
SELECT * FROM company_account;
DELETE FROM company_account WHERE username = 'testing';
SELECT * FROM company_account JOIN company on company.comp_id=company_account.comp_id;
SELECT * FROM company;
DELETE FROM company WHERE name != 'testcomany';
SELECT * FROM project;

SELECT * FROM prefence_assignment

SELECT role.role_id FROM role 
      JOIN prefences as p ON role.area=p.pref_id 
      JOIN prefence_assignment as pa ON p.pref_id=pa.pref_id 
      JOIN freelancer as f ON f.user_id=pa.user_id 
      WHERE f.username='testuser' AND role.role_id NOT IN (
        SELECT a.role_id 
        FROM role
        JOIN applications as a ON role.role_id=a.role_id
        JOIN freelancer as f ON a.freelancer_id=f.user_id
        WHERE f.username='testuser');

SELECT *
        FROM project as p
        JOIN role_assignment as ra ON ra.project_id=p.project_id
        JOIN role as r ON r.role_id=ra.role_id
        JOIN freelancer_assignment as a ON r.role_id=a.role_id
        JOIN freelancer as f ON f.user_id=a.freelancer_id;

SELECT * FROM applications
SELECT * from project;
DELETE FROM freelancer WHERE username='nh2';
DELETE FROM password_token

DELETE FROM role 
WHERE role_id IN (SELECT r.role_id FROM role as r JOIN role_assignment as ra ON ra.role_id=r.role_id WHERE ra.project_id=1)



SELECT * FROM role as r
          JOIN role_assignment as ra on ra.role_id=r.role_id
          JOIN project as p ON p.project_id=ra.project_id

SELECT * FROM role_assignment INNER JOIN project ON role_assignment.project_id=project.project_id;
                  

UPDATE role SET title='Designer' WHERE title='testrole3';

SELECT * FROM company;
UPDATE company SET tel_no=01234512345 WHERE comp_id=1;

SELECT r.* FROM role as r JOIN applications as a ON r.role_id=a.role_id JOIN freelancer as f ON f.user_id=a.freelancer_id;

SELECT pref_name FROM prefences;
SELECT * FROM role JOIN prefences ON prefences.pref_id=role.area;

SELECT a.username, c.pref_name FROM freelancer as a JOIN prefence_assignment as b ON a.user_id=b.user_id JOIN prefences as c ON b.pref_id=c.pref_id;

SELECT * FROM prefence_assignment

SELECT role.role_id FROM role 
        JOIN prefences as p ON role.area=p.pref_id 
        JOIN prefence_assignment as pa ON p.pref_id=pa.pref_id 
        JOIN freelancer as f ON f.user_id=pa.user_id 
        WHERE f.username='testuser'
        AND role.role_id NOT IN (
        SELECT a.role_id 
        FROM role
        JOIN applications as a ON role.role_id=a.role_id
        JOIN freelancer as f ON a.freelancer_id=f.user_id
        WHERE f.username='testuser')
        AND role.role_id NOT IN (
        SELECT role.role_id
        FROM role
        JOIN freelancer_assignment as fa ON role.role_id=fa.role_id
        JOIN freelancer as f ON fa.freelancer_id=f.user_id
        WHERE f.username='testuser')

SELECT project.*, c.name
                      FROM project
                      JOIN company_account as ca
                      ON project.comp_id = ca.comp_id
                      LEFT JOIN company as c on c.comp_id=project.comp_id
                      WHERE ca.username = 'compt'
                      AND project.application_limit >= now();