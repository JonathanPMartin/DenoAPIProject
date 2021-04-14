create table if not exists accounts(
	id smallint UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	user VARCHAR(25) NOT NULL,
	pass VARCHAR(420) NOT NULL
);

create table if not exists menu(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
  MenuItem VARCHAR(25) NOT NULL,
	status varchar(25) not null,
	price SMALLINT UNSIGNED not null
);

create table if not exists staff(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	job  VARCHAR(25) NOT NULL,
	staffid mediumint UNSIGNED NOT NULL,
	status VARCHAR(25) NOT NULL,
	FOREIGN KEY(staffid) REFERENCES accounts(id)
);

create table if not exists tables(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	seats SMALLINT UNSIGNED NOT NULL,
	status VARCHAR(25) NOT NULL
);

create table if not exists orders(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	menuid SMALLINT UNSIGNED,
	details varchar(60),
	userid SMALLINT UNSIGNED,
	ordertime SMALLINT UNSIGNED,
	FOREIGN KEY(menuid) REFERENCES menu(id),
	FOREIGN KEY(userid) REFERENCES staff(id)
);
create table if not exists tableOrder(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	tableid SMALLINT UNSIGNED NOT NULL,
	orderid SMALLINT UNSIGNED,
	status VARCHAR(25) NOT NULL,
	FOREIGN KEY(orderid) REFERENCES orders(id),
	FOREIGN KEY(tableid) REFERENCES tables(id)
);
create table if not exists OrderDetails(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	Detials VARCHAR(8000) NOT NULL
);
create table if not exists TableOrderDetails(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	tableid SMALLINT UNSIGNED NOT NULL,
	userid SMALLINT UNSIGNED,
	orderid SMALLINT UNSIGNED,
	ordertime varchar(60) not null,
	status varchar(60) NOT NULL,
	FOREIGN KEY(tableid) REFERENCES tables(id),
	FOREIGN KEY(userid) REFERENCES staff(id),
	FOREIGN KEY(orderid) REFERENCES OrderDetails(id)
);

