CREATE DATABASE IF NOT EXISTS clan_del_dragon;

use clan_del_dragon;

CREATE TABLE IF NOT EXISTS users (
	id char(36) PRIMARY KEY,
	email VARCHAR(255) NOT NULL,
	password VARCHAR(255) NOT NULL,
	name VARCHAR(255) NOT NULL,
	enabled boolean NULL DEFAULT true,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS pleasures (
	id char(36) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	enabled boolean NOT NULL DEFAULT true,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)engine=InnoDB;

-- Los gustos de los usuarios
CREATE TABLE IF NOT EXISTS user_pleasures (
	id char(36) PRIMARY KEY,
	user_id char(36) NOT NULL,
	pleasure_id char(36) NOT NULL,
	strength TINYINT NOT NULL, -- stength range between 0 and 100
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	enabled boolean NOT NULL DEFAULT true,
	FOREIGN KEY (user_id) REFERENCES users(id) on update cascade on delete no action,
	FOREIGN KEY (pleasure_id) REFERENCES pleasures(id) on update cascade on delete no action
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS product (
	id char(36) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	description VARCHAR(255) NOT NULL,
	enabled boolean NOT NULL DEFAULT true,
	popularity float(2, 1) NULL DEFAULT 0.0,
	unit varchar(5) NULL DEFAULT "NA"
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS commerce(
	id char(36) PRIMARY KEY,
	name VARCHAR(255) NOT NULL,
	email VARCHAR(255) NOT NULL,
	webpage VARCHAR(255) NOT NULL,
	location VARCHAR(255) NOT NULL,
	enabled boolean NOT NULL DEFAULT true,
	popularity float(2, 1) NULL DEFAULT 0.0,
	image_url VARCHAR(255) NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)engine=InnoDB;


CREATE TABLE IF NOT EXISTS commerce_phones(
	id char(36) PRIMARY KEY,
	phone varchar(15) NOT NULL,
	commerce_id char(36) NOT NULL,
	enabled boolean NULL DEFAULT true,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (commerce_id) REFERENCES commerce(id) on update cascade on delete no action
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS commerce_product(
	id char(36) PRIMARY KEY,
	product_code varchar(20) NOT NULL,
	image_url varchar(255) NULL,
	price DECIMAL(6,2) NOT NULL,
	stock INT NULL DEFAULT 0,
	commerce_id char(36) NOT NULL,
	product_id char(36) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	enabled boolean NULL DEFAULT true,
	FOREIGN KEY (commerce_id) REFERENCES commerce(id) on update cascade on delete no action,
	FOREIGN KEY (product_id) REFERENCES product(id) on update cascade on delete no action
)engine=InnoDB;

-- carrito de compras/canasta
CREATE TABLE IF NOT EXISTS cart(
	id char(36) PRIMARY KEY,
	user_id char(36) NOT NULL,
	commerce_id char(36) NOT NULL,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	enabled boolean NOT NULL DEFAULT true,
	FOREIGN KEY (user_id) REFERENCES users(id) on update cascade on delete no action,
	FOREIGN KEY (commerce_id) REFERENCES commerce(id) on update cascade on delete no action
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS cart_product(
	id char(36) PRIMARY KEY,
	cart_id char(36) NOT NULL,
	product_id char(36) NOT NULL,
	price DECIMAL(6,2) NOT NULL,
	quantity INT NOT NULL,
	enabled boolean NOT NULL DEFAULT true,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (cart_id) REFERENCES cart(id) on update cascade on delete no action,
	FOREIGN KEY (product_id) REFERENCES product(id) on update cascade on delete no action
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS session(
	user_id char(36) NOT NULL,
	token char(36) primary key,
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
)engine=InnoDB;

CREATE TABLE IF NOT EXISTS commerce_surveys(
	commerce_id char(36) NOT NULL,
	user_id char(36) NULL,
	question varchar(255) NOT NULL,
	rating int NOT NULL, -- the rating range between 0 and 5
	created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	updated_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
	FOREIGN KEY (commerce_id) REFERENCES commerce(id) on update cascade on delete no action,
	FOREIGN KEY (user_id) REFERENCES users(id) on update cascade on delete no action
)engine=InnoDB;

alter table session add column is_active boolean not null default true;
alter table users drop column email;
alter table users add column email varchar(255) unique not null;

-- injecting data 
insert into commerce values('gonzalozambrano', 'Gonzalo Zambrano', '', '', 'Portoviejo', 1, 0.0, '', now(), now());

insert into commerce_surveys values('gonzalozambrano', null, '¿Como calificas el servicio?', 5, now(), now());

alter table product modify unit text null;
alter table cart modify user_id char(36) null;
alter table cart modify commerce_id char(36) null;
-- removing the user foreign key
alter table cart drop foreign key cart_ibfk_1;
-- removing the commerce_id foreign key
alter table cart drop foreign key cart_ibfk_2;

source ./respaldo_gonzalozambrano.sql;
source ./respaldo_casanova.sql;
source ./respaldo_peralta.sql;
