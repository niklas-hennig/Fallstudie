DROP TABLE IF EXISTS freelancer;

CREATE TABLE freelancer (
    user_id serial PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    name VARCHAR(25) NOT NULL,
    surname VARCHAR(25) NOT NULL,
    gender VARCHAR(1)NOT NULL,
    date_of_birth DATE,
    street VARCHAR(30),
    number INTEGER,
    postcode  VARCHAR(5),
    city VARCHAR(30),
    country VARCHAR(30),
    resume_link VARCHAR(100),
    iban VARCHAR(28),
    ktn_owner VARCHAR(30),
    experience VARCHAR(300),
    is_set BOOLEAN DEFAULT FALSE
);

DROP TABLE IF EXISTS prefences;

CREATE TABLE prefences (
    pref_id SERIAL PRIMARY KEY,
    pref_name VARCHAR(20) NOT NULL

);

DROP TABLE IF EXISTS prefence_assingment;

CREATE TABLE prefence_assignment (
    user_id int,
    pref_id int,
    CONSTRAINT user_id_fkey FOREIGN KEY (user_id)
      REFERENCES freelancer (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT pref_id_fkey FOREIGN KEY (pref_id)
      REFERENCES prefences (pref_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
);

DROP TABLE IF EXISTS company_account;

CREATE TABLE company_account(
    user_id SERIAL PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(50) NOT NULL,
    name VARCHAR(25) NOT NULL,
    surname VARCHAR(25)NOT NULL,
    gender VARCHAR(1) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    comp_id int,
    is_set BOOLEAN DEFAULT TRUE
);

DROP TABLE IF EXISTS company;

CREATE TABLE company (
    comp_id SERIAL PRIMARY KEY,
    name VARCHAR(50) UNIQUE NOT NULL,
    street VARCHAR(30),
    number INTEGER,
    postcode VARCHAR(5) NOT NULL,
    city VARCHAR(30) NOT NULL,
    country VARCHAR(30) NOT NULL, 
    tel_no VARCHAR(20),
    street_bill VARCHAR(30),
    number_bill INTEGER,
    postcode_bill  VARCHAR(5),
    city_bill VARCHAR(30),
    description VARCHAR(300)
);

ALTER TABLE company_account
ADD FOREIGN KEY (comp_id) REFERENCES company(comp_id)
ON UPDATE CASCADE ON DELETE CASCADE;

DROP TABLE IF EXISTS project;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    titel VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL,
    application_limit DATE NOT NULL,
    comp_id int,
    CONSTRAINT cmp_acc_fkey FOREIGN KEY (comp_id)
      REFERENCES company (comp_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
);

DROP TABLE IF EXISTS role;

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    requirements VARCHAR(50),
    area int,
    payment MONEY, --Per role for whole project
    CONSTRAINT area_fkey FOREIGN KEY (area)
      REFERENCES prefences (pref_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
);

DROP TABLE IF EXISTS role_assignment;

CREATE TABLE role_assignment (
    assign_id SERIAL PRIMARY KEY,
    role_id int,
    project_id int,
    number_of_freelancers int DEFAULT 1,
    CONSTRAINT project_id_fkey FOREIGN KEY (project_id)
      REFERENCES project (project_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role (role_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS applications;

CREATE TABLE applications (
    application_id SERIAL PRIMARY KEY,
    freelancer_id int NOT NULL,
    role_id int NOT NULL,
    comp_id int NOT NULL,
    appText VARCHAR(300),
    CONSTRAINT freelancer_id_fkey FOREIGN KEY (freelancer_id)
      REFERENCES freelancer (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role_assignment (assign_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT comp_id_fkey FOREIGN KEY (comp_id)
      REFERENCES company (comp_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE RESTRICT
);

DROP TABLE IF EXISTS freelancer_assignment;

CREATE TABLE freelancer_assignment (
    job_id SERIAL PRIMARY KEY,
    freelancer_id int NOT NULL,
    role_id int NOT NULL,
    CONSTRAINT freelancer_id_fkey FOREIGN KEY (freelancer_id)
      REFERENCES freelancer (user_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role_assignment (assign_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);

DROP TABLE IF EXISTS password_token;

CREATE TABLE password_token (
  reset_id SERIAL PRIMARY KEY,
  freelancer_user VARCHAR,
  comp_user_user VARCHAR,
  token int NOT NULL,
  CONSTRAINT freelancer_fkey FOREIGN KEY (freelancer_user)
      REFERENCES freelancer (username) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
  CONSTRAINT comp_user_id FOREIGN KEY (comp_user_user)
    REFERENCES company_account (username) MATCH SIMPLE
    ON UPDATE CASCADE ON DELETE CASCADE
);


INSERT INTO freelancer (username, password, email, name, surname, gender, is_set)
    VALUES ('testuser', 'test', 'none@none.de', 'user', 'test', 'u', TRUE);

INSERT INTO prefences (pref_name)
    VALUES ('Design'), ('Projektleitung'), ('Softwaredesign'), ('Data Analytics');

INSERT INTO prefence_assignment (user_id, pref_id)
  VALUES (1, 1);


INSERT INTO company (name, postcode, city, country)
    VALUES ('testcompany', '09342', 'testcity', 'nowhere');
INSERT INTO company_account (username, password, email, comp_id, name, surname, gender)
    VALUES('compt', 'test', 'none', 1, 't', 'est', 'u');

INSERT INTO role (title, description, requirements, area, payment)
    VALUES ('testrole', 'Es muss nur getestet werden', NULL, 1, 100),
    ('testrole2', 'Es muss nur getestet werden, noch mehr', NULL, 1, 200),
    ('testrole3', 'Ich bin für Pojekt 2 hier', NULL, 1, 200);

INSERT INTO project (titel, start_date, end_date, application_limit,comp_id)
    VALUES ('Project 1', '2020-07-01', '2020-08-01', '2020-06-15', 1),
    ('Project 2', '2020-08-01', '2020-08-15', '2020-07-15', 1);
INSERT INTO role_assignment (role_id, project_id, number_of_freelancers) VALUES 
    (1, 1, 10), 
    (2, 1, 5), 
    (3, 2, 1);

INSERT INTO applications (freelancer_id, role_id, comp_id)
    VALUES (1, 3, 1);

INSERT INTO freelancer_assignment (freelancer_id, role_id)
    VALUES (1, 2);
