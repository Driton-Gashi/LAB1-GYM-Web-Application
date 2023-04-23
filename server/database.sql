CREATE DATABASE lmao_database;

CREATE TABLE users(
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    pasword VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(6) NOT NULL,
	created_at date default current_date
); 
create table items(
	item_id serial PRIMARY KEY,
	item_name VARCHAR(50) NOT NULL,
	item_description VARCHAR(100) NOT NULL,
	item_price int NOT NULL,
	item_review int NOT NULL,
	item_image VARCHAR(100) NOT NULL,
	item_likes int
);

INSERT INTO items (item_name, item_description, item_price, item_review,item_image) VALUES ('Protein Yogurt', 'Best yogurt tested and approved by Trio', 1, 4,'./supplements/yogurt.png');
create table programs(
	programs_id serial PRIMARY KEY,
	program_name VARCHAR[50] NOT NULL,
	program_difficulty VARCHAR[50] NOT NULL,
	program_image VARCHAR[100] NOT NULL
);

create table shopping_cart(
	shopping_cart_id serial PRIMARY KEY,
	u_id int,
	foreign key (u_id) references users(user_id)
);
create table product_item(
	item_id serial PRIMARY KEY,
	cart_id int,
	quantity_of_item int,
	SKU int,
	image varchar(255),
	price decimal(8,2),
	foreign key (cart_id) references shopping_cart(shopping_cart_id),
	foreign key (item_id) references product_item(item_id)
);
create table shopping_cart_item(
	shopping_cart_item_id serial PRIMARY KEY,
	quantity int,
	cart_id int,
	item_id int,
	foreign key (cart_id) references shopping_cart(shopping_cart_id),
	foreign key (item_id) references product_item(item_id)
);
create table country(
	country_id serial PRIMARY KEY,
	name varchar(50)
);

create table adress(
 adress_id serial PRIMARY KEY,
unit_number VARCHAR(100) NOT NULL,
street_number VARCHAR(100) NOT NULL,
adressLine1 VARCHAR(100) NOT NULL,
adressLine2 VARCHAR(100) NOT NULL,
city VARCHAR(100) NOT NULL,
region VARCHAR(100) NOT NULL,
postal_code int NOT NULL,
country_id int,
foreign key (country_id) references country(country_id)
);

create table users_adress(
u_id int,
a_id int,
constraint ua_pk primary key (u_id,a_id),
foreign key (u_id) references users(user_id),
foreign key (a_id) references adress(adress_id)
);
create table shipping_method(
shipping_method_id serial primary key,
shipping_method varchar(50),
shipping_price decimal(8,2)
);

create table payment_type(
payment_type_id serial PRIMARY KEY,
value varchar(50)
);

create table order_status(
status_id serial primary key,
status varchar(100)
);

create table shopping_order(
shopping_order_id serial primary key,
shopping_date date,
shopping_total decimal(8,2),
type_id int,
shipping_method_id int,
status_id int,
adress_id int,
foreign key (shipping_method_id) references shipping_method(shipping_method_id),
foreign key (type_id) references payment_type(payment_type_id),
foreign key (status_id) references order_status(status_id),
foreign key (adress_id) references adress(adress_id)
);

create table orderr(
order_id serial primary key,
quantity int,
order_price DECIMAL(10, 2),
i_id int,
sor_id int,
foreign key (i_id) references product_item(item_id),
foreign key (sor_id) references shopping_order(shopping_order_id)
);

create table user_review(
review_id serial primary key,
rating_value int,
comment varchar(255),
u_id int,
or_id int,
foreign key (u_id) references users(user_id),
foreign key (or_id) references orderr(order_id)
);


create table product_category(
	category_id serial PRIMARY KEY,
	category_name varchar(50),
	parent_category_id int,
	foreign key (parent_category_id) references product_category(category_id)
);


create table product(
	product_id serial PRIMARY KEY,
	product_name varchar(50),
	product_description varchar(255),
	product_image varchar(255),
	category_id int,
	foreign key (category_id) references product_category(category_id)
);


create table variation(
	variation_id serial PRIMARY KEY,
	variation_name varchar(50),
	category_id int,
	foreign key (category_id) references product_category(category_id)
);

create table variation_value(
	value_id serial PRIMARY KEY,
	variation_value varchar(50),
	variation_id int,
	foreign key (variation_id) references variation(variation_id)
);

create table product_value(
p_id int,
v_id int,
constraint pv_pk primary key (p_id,v_id),
foreign key (p_id) references product_item(item_id),
foreign key (p_id) references variation_value(value_id)
);



create table payment_method(
	payment_method_id serial PRIMARY KEY,
	provider varchar(50),
	account_number int,
	expiery_date date,
	user_id int,
	type_id int,
	foreign key (user_id) references users(user_id),
	foreign key (type_id) references payment_type(payment_type_id)
);

