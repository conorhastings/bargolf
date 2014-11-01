CREATE TABLE teams(
 id serial primary key,
 team text,
 password varchar
);

CREATE TABLE team_members(
 id serial primary key,
 name text,
 team_id integer
);

CREATE TABLE bars(
 id serial primary key,
 team_id integer,
 score integer
 );