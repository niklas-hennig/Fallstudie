DROP TABLE IF EXISTS freelancer;

CREATE TABLE freelancer (
    user_id serial PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(355) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    name VARCHAR(25) NOT NULL,
    surname VARCHAR(25) NOT NULL,
    street VARCHAR(30),
    number INTEGER,
    postcode integer,
    city VARCHAR(30),
    resume_link VARCHAR(100),
    iban VARCHAR(28),
    ktn_owner VARCHAR(30),
    expirience VARCHAR(300)
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
    email VARCHAR(355) NOT NULL,
    is_active BOOLEAN DEFAULT TRUE,
    comp_id int
);

DROP TABLE IF EXISTS company;

CREATE TABLE company (
    comp_id SERIAL PRIMARY KEY,
    name VARCHAR(50),
    street VARCHAR(30),
    number INTEGER,
    postcode integer,
    city VARCHAR(30),
    street_bill VARCHAR(30),
    number_bill INTEGER,
    postcode_bill integer,
    city_bill VARCHAR(30),
    description VARCHAR(300)
);

ALTER TABLE company_account
ADD FOREIGN KEY (comp_id) REFERENCES company(comp_id);

DROP TABLE IF EXISTS project;

CREATE TABLE project (
    project_id SERIAL PRIMARY KEY,
    titel VARCHAR(30) NOT NULL,
    start_date DATE NOT NULL,
    end_date DATE NOT NULL CHECK (end_date>start_date)
);

DROP TABLE IF EXISTS role;

CREATE TABLE role (
    role_id SERIAL PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    description VARCHAR(200),
    requirements VARCHAR(50)
);

DROP TABLE IF EXISTS role_assignment;

CREATE TABLE role_assignment (
    project_id int,
    role_id int,
    number_of_freelancers int DEFAULT 1,
    payment DOUBLE,
    CONSTRAINT project_id_fkey FOREIGN KEY (project_id)
      REFERENCES project (project_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE,
    CONSTRAINT role_id_fkey FOREIGN KEY (role_id)
      REFERENCES role (role_id) MATCH SIMPLE
      ON UPDATE CASCADE ON DELETE CASCADE
);



INSERT INTO freelancer (username, password, email, name, surname)
    VALUES ('testuser', 'test', 'none', 'user', 'test');
