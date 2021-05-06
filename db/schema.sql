ALTER USER 'root'@'localhost' IDENTIFIED WITH mysql_native_password BY 'yes';

DROP DATABASE IF EXISTS restaurants_db;

CREATE DATABASE restaurants_db;

USE restaurants_db;


CREATE TABLE users (
    id INT AUTO_INCREMENT NOT NULL,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL,
    dob DATE NOT NULL,
    email VARCHAR(255) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
        createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
        updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(id)
);

CREATE TABLE userLogs (
	id INT AUTO_INCREMENT NOT NULL,
    locationName VARCHAR(250) NOT NULL,
    location VARCHAR(250) NOT NULL, 
    menuItems VARCHAR (250) NOT NULL, 
    thoughts VARCHAR (250) NOT NULL, 
    userId INT NOT NULL,
	createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
		updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP,
	PRIMARY KEY (id),
    FOREIGN KEY (`userId`) REFERENCES `users` (`id`)
);

INSERT INTO users (`id`,`firstName`,`lastName`,`dob`,`email`,`password`,`createdAt`,`updatedAt`)
VALUES (1, 'Josh', 'Steward', "1996-01-11", "stewardjosh10@gmail.com", '$2a$10$K0IXp/vLJzx6fUbOFU/tdO8wmB.ruvEmFduQu3mJh9L1zkiVdTrlG','021-04-29 07:58:01', '2021-04-29 07:58:01');

INSERT INTO userLogs (`id`,`locationName`,`location`,`menuItems`,`thoughts`,`userId`,`createdAt`,`updatedAt`)
VALUES (1,'Guzman','Sydney','Bowl','Good', 1, '021-04-29 07:58:01','2021-04-29 07:58:01');