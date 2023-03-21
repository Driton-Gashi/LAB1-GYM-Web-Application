CREATE DATABASE lmao_database;

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
);

CREATE TABLE programs(
    program_id SERIAL PRIMARY KEY,
    program_name VARCHAR(255) NOT NULL,
    program_dificulty VARCHAR(255) NOT NULL,
    program_image VARCHAR(255) NOT NULL
);

