CREATE TABLE teams(
 id serial primary key,
 team text,
 password varchar
);



CREATE TABLE bars(
 id serial primary key,
 team_id integer,
 score integer,
 name text
 );