SELECT * FROM freelancer as f LEFT JOIN prefence_assignment as pa ON pa.user_id=f.user_id LEFT JOIN prefences as p on p.pref_id=pa.pref_id;


SELECT r.* 
      FROM role as r 
      JOIN applications as a ON r.role_id=a.role_id 
      JOIN freelancer as f ON f.user_id=a.freelancer_id

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

SELECT DISTINCT ra.role_id, p.start_date, p.end_date
        FROM project as p
        JOIN role_assignment as ra ON p.project_id=ra.project_id
        JOIN freelancer_assignment as fa ON fa.role_id=ra.role_id 
        JOIN freelancer as f ON fa.freelancer_id=f.user_id
        WHERE p.start_date >= '2020-06-16'
        AND f.username = 'testuser';

SELECT * 
        FROM project as p
        JOIN role_assignment as ra ON ra.project_id=p.project_id
        JOIN role as r ON r.role_id=ra.role_id
        JOIN applications as a ON r.role_id=a.role_id
        JOIN freelancer as f ON f.user_id=a.freelancer_id;

SELECT * FROM role_assignment INNER JOIN project ON role_assignment.project_id=project.project_id;
                  

UPDATE freelancer SET is_set=false WHERE username!='testuser';

SELECT r.* FROM role as r JOIN applications as a ON r.role_id=a.role_id JOIN freelancer as f ON f.user_id=a.freelancer_id;

SELECT pref_name FROM prefences;
SELECT * FROM role JOIN prefences ON prefences.pref_id=role.area;

SELECT a.username, c.pref_name FROM freelancer as a JOIN prefence_assignment as b ON a.user_id=b.user_id JOIN prefences as c ON b.pref_id=c.pref_id;