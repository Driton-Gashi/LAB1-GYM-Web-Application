
-- Created by Dritoni
CREATE TABLE users(
    user_id serial PRIMARY KEY,
    user_name VARCHAR(50) NOT NULL,
    password VARCHAR(250) NOT NULL,
    email VARCHAR(100) NOT NULL,
    role VARCHAR(100) DEFAULT 'user',
    created_at date DEFAULT current_date,
    address VARCHAR(250),
    tel_number VARCHAR(20),
    city VARCHAR(100)
);
-- Shtojeni tani qet kod ne databaz
ALTER TABLE users
ADD COLUMN image VARCHAR(250) DEFAULT '../userProfile/defaultProfile.png';


create table categories(
	category_id serial PRIMARY KEY,
	category_name varchar(50)
);
INSERT INTO categories (category_name) Values ('shirt');
INSERT INTO categories (category_name) Values ('weight');
INSERT INTO categories (category_name) Values ('pants');
INSERT INTO categories (category_name) Values ('protein');
INSERT INTO categories (category_name) Values ('bra');
INSERT INTO categories (category_name) Values ('sneakers');
INSERT INTO categories (category_name) Values ('gloves');
create table items(
	item_id serial PRIMARY KEY,
	item_name VARCHAR(50) NOT NULL,
	item_description VARCHAR(100) NOT NULL,
	item_price int NOT NULL,
	item_review int NOT NULL,
	item_image VARCHAR(100) NOT NULL,
 item_category VARCHAR(50) NOT NULL
);
-- INSERT INTO items (item_name, item_description, item_price, item_review,item_image,item_category) VALUES ('Protein Yogurt', 'Best yogurt tested and approved by Trio', 5, 4,'./supplements/yogurt.png','protein');
-- INSERT INTO items (item_name, item_description, item_price, item_review,item_image,item_category) VALUES ('Sneakers', 'Comfortable sports shoes for active individuals', 50, 5,'./supplements/sneakers.png','sneakers');
-- INSERT INTO items (item_name, item_description, item_price, item_review,item_image,item_category) VALUES ('Shirt', 'Stylish and trendy shirt for casual wear', 15, 4,'./supplements/shirt.webp','shirt');
-- INSERT INTO items (item_name, item_description, item_price, item_review,item_image,item_category) VALUES ('Pants', 'Durable and versatile pants for everyday use', 20, 3,'./supplements/pants.png','pants');
    --    1 | Protein Yogurt | Best yogurt tested and approved by Trio         |          1 |           4 | ./supplements/yogurt.png   |
    --    2 | Protein        | Best Protein ever, tested and approved by Trio  |         50 |           5 | ./supplements/protein.png  |
    --    3 | Protein Yogurt | Best yogurt tested and approved by Trio         |          1 |           4 | ./supplements/yogurt.png   |
    --    4 | Protein Yogurt | Best yogurt tested and approved by Trio         |          1 |           4 | ./supplements/yogurt.png   |
    --    8 | Sneakers       | Comfortable sports shoes for active individuals |         10 |           4 | ./supplements/sneakers.png |
    --    9 | Shirt          | Stylish and trendy shirt for casual wear        |         15 |           5 | ./supplements/shirt.webp   |
    --   10 | Pants          | Durable and versatile pants for everyday use    |         20 |           3 | ./supplements/pants.png
-- Created by Dritoni
-- create table cart(
-- 	cart_id serial PRIMARY KEY,
-- 	cart_description VARCHAR(100) NOT NULL,
-- 	cart_price int NOT NULL,
-- 	cart_review int NOT NULL,
-- 	cart_image VARCHAR(100) NOT NULL,
--  cart_category VARCHAR(50) NOT NULL
-- );

-- Created by Dritoni
-- CREATE TABLE cart (
--   id SERIAL PRIMARY KEY,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );

-- CREATE TABLE cartItem (
--   id SERIAL PRIMARY KEY,
--   cart_id INTEGER REFERENCES cart(id) ON DELETE CASCADE,
--   product_name VARCHAR(255) NOT NULL,
--   price DECIMAL(10, 2) NOT NULL,
--   quantity INTEGER NOT NULL,
--   created_at TIMESTAMP DEFAULT NOW(),
--   updated_at TIMESTAMP DEFAULT NOW()
-- );



create table shopping_cart(
	shopping_cart_id serial PRIMARY KEY,
	u_id int,
	foreign key (u_id) references users(user_id)
);

create table shopping_cart_item(
	shopping_cart_item_id serial PRIMARY KEY,
	quantity int,
	cart_id int,
	item_id int,
	foreign key (cart_id) references shopping_cart(shopping_cart_id),
	foreign key (item_id) references items(item_id)
);

-- qekjo osht
create table cart_item(
	shopping_cart_item_id serial PRIMARY KEY,
	quantity int,
	user_id int,
	item_id int,
	foreign key (user_id) references users(user_id),
	foreign key (item_id) references items(item_id)
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
foreign key (v_id) references variation_value(value_id)
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

create table video(
	video_id serial PRIMARY KEY,
	video_name varchar(50),
	video_difficulity varchar(50),
	vide_description varchar(50),
	vide_url varchar(50),
	vide_image varchar(50),
	video_category varchar(100)
);

create table video_user(
u_id int,
v_id int,
constraint uv_pk primary key (u_id,v_id),
foreign key (u_id) references user(user_id),
foreign key (v_id) references video(video_id)
);


INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('INTRODUCTION', 'Beginner', 'Introduction To Calisthenics Program', './video_thumbnail/Rick.mp4','./video_thumbnail/V1.jpg','Library');
INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('CALISTHENICS', 'Beginner', 'Beginner Calisthenics Program', './video_thumbnail/Rick.mp4','./video_thumbnail/V2.jpg','Library');
INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('CALISTHENICS', 'Intermediate', 'Intermediate Program', './video_thumbnail/Rick.mp4','./video_thumbnail/V3.jpg','Library');
INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('TECHNIQUE GUIDE', 'Beginner', 'Handstand Technique Guide', './video_thumbnail/Rick.mp4','./video_thumbnail/V4.jpg','Plans');
INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('TECHNIQUE GUIDE', 'Intermediate', 'Muscle Up Technique Guide', './video_thumbnail/Rick.mp4','./video_thumbnail/V5.jpg','Tutorial');
INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image,video_category) VALUES ('TECHNIQUE GUIDE', 'Beginner', 'Pullover Technique Guide', './video_thumbnail/Rick.mp4','./video_thumbnail/V6.jpg','Plans');


INSERT INTO video (video_name, video_difficulity, vide_description, vide_url,vide_image) VALUES ('videoja1', 'Beginner', 'video for beginners', 4,'./supplements/yogurt.png');

ALTER TABLE video
ALTER COLUMN vide_url varchar(255);