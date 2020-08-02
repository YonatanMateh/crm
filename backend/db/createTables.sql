-- create database CRM;
USE CRM;
-- CREATE TABLE owner(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     firstName VARCHAR(30),
--     lastName VARCHAR(30)
-- );

-- CREATE TABLE emailType(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     emailType VARCHAR(10)
-- );

-- CREATE TABLE country(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     country VARCHAR(30)
-- );

-- CREATE TABLE client(
--     id INT NOT NULL PRIMARY KEY AUTO_INCREMENT,
--     firstName VARCHAR(30),
--     lastName VARCHAR(30),
--     email VARCHAR(100),
--     firstContact DATE,
--     sold BOOLEAN,
--     emailType_id INT,
--     owner_id INT,
--     country_id INT,

--     FOREIGN KEY(emailType_id) REFERENCES emailType(id),
--     FOREIGN KEY(owner_id) REFERENCES owner(id),
--     FOREIGN KEY(country_id) REFERENCES country(id)
-- );