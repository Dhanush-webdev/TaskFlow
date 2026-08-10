CREATE DATABASE TaskFlow;

CREATE TABLE todos(
    todo_id SERIAL PRIMARY KEY ,
    description VARCHAR(250)
);