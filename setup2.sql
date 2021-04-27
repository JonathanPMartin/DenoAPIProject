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
create table if not exists TableOrders(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	tableid SMALLINT UNSIGNED NOT NULL,
	userid SMALLINT UNSIGNED,
	ordertime varchar(60) not null,
	status varchar(60) NOT NULL,
	FOREIGN KEY(tableid) REFERENCES tables(id),
	FOREIGN KEY(userid) REFERENCES staff(id)
	);
create table if not exists Orders(
	id SMALLINT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
	menuid SMALLINT UNSIGNED,
	TableOrderid SMALLINT UNSIGNED,
	status varchar(60) NOT NULL,
	FOREIGN KEY(menuid) REFERENCES menu(id),
	FOREIGN KEY(TableOrderid) REFERENCES TableOrders(id)
);
insert into staff(job, staffid, status) values("manager",4,"Offline");

insert into tables(seats, status) Values(2, "Free");
insert into tables(seats, status) Values(2, "Free");
insert into tables(seats, status) Values(2, "Free");
insert into tables(seats, status) Values(4, "Free");
insert into tables(seats, status) Values(4, "Free");
insert into tables(seats, status) Values(4, "Free");
insert into tables(seats, status) Values(4, "Free");
insert into tables(seats, status) Values(6, "Free");
insert into tables(seats, status) Values(6, "Free");
insert into tables(seats, status) Values(6, "Free");

insert into menu(MenuItem, status, price) values("Scoch egg", "plentiful",3);
insert into menu(MenuItem, status, price) values("Bufflo wings", "plentiful",3);
insert into menu(MenuItem, status, price) values("whitebate", "plentiful",2);
insert into menu(MenuItem, status, price) values("Salad", "plentiful",2);
insert into menu(MenuItem, status, price) values("chicken liver pate", "plentiful",4);
insert into menu(MenuItem, status, price) values("Pizza", "plentiful",7);
insert into menu(MenuItem, status, price) values("burger and chips", "plentiful",7);
insert into menu(MenuItem, status, price) values("Sunday Roast", "plentiful",8);
insert into menu(MenuItem, status, price) values("Cod and chips", "plentiful",6);
insert into menu(MenuItem, status, price) values("Carbonara", "plentiful",5);
insert into menu(MenuItem, status, price) values("sticky toffee pudding", "plentiful",4);
insert into menu(MenuItem, status, price) values("chocolate cheesecake", "plentiful",6);
insert into menu(MenuItem, status, price) values("lemon drizzle cake", "plentiful",4);
insert into menu(MenuItem, status, price) values("hazelnut icecream", "plentiful",4);
insert into menu(MenuItem, status, price) values("banoffee pie", "plentiful",3);
insert into menu(MenuItem, status, price) values("Olives", "plentiful",2);
insert into menu(MenuItem, status, price) values("halloumi fries", "plentiful",2);
insert into menu(MenuItem, status, price) values("chips", "plentiful",1);
insert into menu(MenuItem, status, price) values("cheesy chips", "plentiful",2);
insert into menu(MenuItem, status, price) values("garlic bread", "plentiful",1);


