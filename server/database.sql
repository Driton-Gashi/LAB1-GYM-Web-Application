CREATE DATABASE lmao_database;

USE lmao_database;

CREATE TABLE users(
    user_id int identity(1,1) PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    pasword VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(6) NOT NULL 
); 

create table shopping_cart(
	shopping_cart_id int identity(1,1) PRIMARY KEY,
	u_id int,
	foreign key (u_id) references users(user_id)
)

create table shopping_cart_item(
	shopping_cart_item_id int identity(1,1) PRIMARY KEY,
	quantity int,
	cart_id int,
	item_id int,
	foreign key (cart_id) references shopping_cart(shopping_cart_id),
	foreign key (item_id) references product_item(item_id)
)



create table users_adress(
u_id int,
a_id int,
constraint ua_pk primary key (u_id,a_id),
foreign key (u_id) references users(user_id),
foreign key (a_id) references adress(adress_id)
)

create table adress(
 adress_id int identity(1,1) PRIMARY KEY,
unit_number VARCHAR(100) NOT NULL,
street_number VARCHAR(100) NOT NULL,
adressLine1 VARCHAR(100) NOT NULL,
adressLine2 VARCHAR(100) NOT NULL,
city VARCHAR(100) NOT NULL,
region VARCHAR(100) NOT NULL,
postal_code int NOT NULL,
country_id int,
foreign key (country_id) references country(country_id)
)

create table country(
	country_id int identity(1,1) PRIMARY KEY,
	name varchar(50)
)


create table user_review(
review_id int identity(1,1) primary key,
rating_value int,
comment varchar(255),
u_id int,
or_id int,
foreign key (u_id) references users(user_id),
foreign key (or_id) references orderr(order_id)
)

create table orderr(
order_id int identity(1,1) primary key,
quantity int,
order_price DECIMAL(10, 2),
i_id int,
sor_id int,
foreign key (i_id) references product_item(item_id),
foreign key (sor_id) references shopping_order(shopping_order_id)
)

create table product_item(
	item_id int identity(1,1) PRIMARY KEY,
	cart_id int,
	quantity_of_item int,
	SKU int,
	image varchar(255),
	price decimal(8,2),
	foreign key (cart_id) references shopping_cart(shopping_cart_id),
	foreign key (item_id) references product_item(item_id)
)
create table product(
	product_id int identity(1,1) PRIMARY KEY,
	product_name varchar(50),
	product_description varchar(255),
	product_image varchar(255),
	category_id int,
	foreign key (category_id) references product_category(category_id),
)

create table product_category(
	category_id int identity(1,1) PRIMARY KEY,
	category_name varchar(50),
	parent_category_id int,
	foreign key (parent_category_id) references product_category(category_id)
)

create table variation(
	variation_id int identity(1,1) PRIMARY KEY,
	variation_name varchar(50),
	category_id int,
	foreign key (category_id) references product_category(category_id)
)

create table variation_value(
	value_id int identity(1,1) PRIMARY KEY,
	variation_value varchar(50),
	variation_id int,
	foreign key (variation_id) references variation(variation_id)
)

create table product_value(
p_id int,
v_id int,
constraint pv_pk primary key (p_id,v_id),
foreign key (p_id) references product_item(item_id),
foreign key (p_id) references variation_value(value_id)
)

create table payment_type(
payment_type_id int identity(1,1) PRIMARY KEY,
value varchar(50)
)

create table payment_method(
	payment_method_id int identity(1,1) PRIMARY KEY,
	provider varchar(50),
	account_number int,
	expiery_date date,
	user_id int,
	type_id int,
	foreign key (user_id) references users(user_id),
	foreign key (type_id) references payment_type(payment_type_id)
)

create table shipping_method(
shipping_method_id int identity(1,1) primary key,
shipping_method varchar(50),
shipping_price decimal(8,2)
)

create table order_status(
status_id int identity(1,1) primary key,
status varchar(100)
)

create table shopping_order(
shopping_order_id int identity(1,1) primary key,
shopping_date date,
shopping_total decimal(8,2),
type_id int,
shipping_method_id int,
status_id int,
adress_id int,
foreign key (shipping_method_id) references shipping_method(shipping_method_id),
foreign key (type_id) references payment_type(payment_type_id),
foreign key (status_id) references order_status(status_id),
foreign key (adress_id) references adress(adress_id),
)











