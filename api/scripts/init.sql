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
alter table commerce modify location text null;

-- injecting data 
insert into commerce values('gonzalozambrano', 'Gonzalo Zambrano', '', '', 'Portoviejo', 1, 0.0, '', now(), now());
insert into commerce values('casanova', 'Casanova', '', '', 'Portoviejo', 1, 0.0, '', now(), now());

insert into commerce_surveys values('gonzalozambrano', null, '¿Como calificas el servicio?', 5, now(), now());

alter table product modify unit text null;
alter table cart modify user_id char(36) null;
alter table cart modify commerce_id char(36) null;
-- removing the user foreign key
alter table cart drop foreign key cart_ibfk_1;
-- removing the commerce_id foreign key
alter table cart drop foreign key cart_ibfk_2;
alter table commerce modify image_url text null;
alter table commerce modify location text null;

update commerce set image_url = 'https://userscontent2.emaze.com/images/2f21b55a-8971-4daa-87e5-ee2e78c7b085/87fa302ba5bb4894efc0ff51fad9d9d9.jpg' where id = 'gonzalozambrano';
update commerce set image_url = 'https://scontent.fpvo2-1.fna.fbcdn.net/v/t39.30808-6/331302794_153040837556741_2759595702641327055_n.jpg?stp=dst-jpg_p720x720&_nc_cat=107&ccb=1-7&_nc_sid=e3f864&_nc_eui2=AeEBqU41Mqgjy02raJizffLIhs58m_BPEI2Gznyb8E8QjRjv2KBfGAhvuCGa4FLQF4fwVDx5PzWM_VOaVomGUQb-&_nc_ohc=vEd0wHE65BUAX9hSHa5&_nc_ht=scontent.fpvo2-1.fna&oh=00_AfArWXkCREZbgfb28fz3R6CvvkKewiIPz4iIlfw_tRnO9A&oe=64137378' where id='casanova';

update commerce set location = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2468.7303086642405!2d-80.4571726742054!3d-1.0580475155010312!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x902bf2b30ab1f599%3A0x11df59ba30633b9e!2sComisariato%20Gonzalo%20Zambrano!5e1!3m2!1ses-419!2sec!4v1677430710061!5m2!1ses-419!2sec" width="600" height="450" style="border:0;" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe>' where id = 'gonzalozambrano';

alter table commerce add column description text null;
update commerce set description = 'Comercial Casanova nació en junio de 1988. Es una empresa donde se ofrecen productos de consumo masivo, bebidas alcohólicas y no alcohólicas al por mayor y menor; cuenta con estrategias innovadoras y es reconocida por su servicio de calidad, diversas ofertas y excelentes precios.' where id = 'casanova';
update commerce set description = 'Comisariato Gonzalo Zambrano nacio en el año 1981 brindando una atención personalizada, entregando productos de calidad con pesos justos; ni más ni menos. Enfocados en el crecimiento de los tenderos y en la economía de las familias manabitas' where id = 'gonzalozambrano';

alter table users add column securityAnswer text null;
alter table users add column securityQuestion text null;

source ./respaldo_gonzalozambrano.sql;
source ./respaldo_casanova.sql;
