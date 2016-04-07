DROP TABLE IF EXISTS users;

CREATE TABLE IF NOT EXISTS users (
  id integer PRIMARY KEY AUTOINCREMENT,
  first_name varchar(100) NOT NULL,
  last_name varchar(100) NOT NULL,
  email varchar(100) NOT NULL UNIQUE,
  birthday date NULL,
  height int NULL,
  weight int NULL,
  sex varchar(1) NOT NULL,
  contact_number int NOT NULL UNIQUE,
  address varchar(100) NOT NULL,
  healthCardId varchar(100) NULL,
  created_at date NOT NULL DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO users (id, first_name, last_name, email, birthday, sex, contact_number, address, created_at) VALUES (1, 'first_name1', 'last_name1', 'user1@test.com', '1991-04-17', 'F', 09999999999, 'addr1', '2016-01-10 12:10:12');
INSERT INTO users (id, first_name, last_name, email, birthday, sex, contact_number, address, created_at) VALUES (2, 'first_name2', 'last_name2', 'user2@test.com', '1991-04-17', 'M', 09999999998, 'addr2', '2016-01-11 13:10:12');
-- INSERT INTO users (id, first_name, last_name, email, birthday, height, weight, sex, contact_number, address, created_at) VALUES (2, 'first_name2', 'last_name2', 'user2@test.com', '1991-04-17', 162, 60, 'M', 09999999998, 'addr3', 2016-01-11 13:10:12');
