DROP TABLE IF EXISTS benutzer;

CREATE TABLE user_account (
    user_id serial PRIMARY KEY,
    username VARCHAR(15) UNIQUE NOT NULL,
    password VARCHAR(25) NOT NULL,
    email VARCHAR(355) NOT NULL,
    gives_projects BOOLEAN DEFAULT FALSE,
    is_active BOOLEAN DEFAULT TRUE
);

CREATE TABLE pr_issuer (account_id serial PRIMARY KEY);

CREATE TABLE pr_consumer (account_id serial PRIMARY KEY);

INSERT INTO benutzer (username, password, email)
    VALUES ('testuser', 'test', 'none');
