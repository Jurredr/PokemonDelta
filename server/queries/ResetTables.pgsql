DROP TABLE IF EXISTS account;
CREATE TABLE account (
    uuid INT PRIMARY KEY,
    username VARCHAR,
    email VARCHAR,
    password VARCHAR,
    create_date DATE,
    last_seen DATE,
    credits INT
);

DROP TABLE IF EXISTS player;
CREATE TABLE player (
    uuid INT PRIMARY KEY,
    admin BOOLEAN,
    total_xp INT,
    money INT,
    pokemon_party INT[6]

);

DROP TABLE IF EXISTS pokemon;
CREATE TABLE pokemon (

);

DROP TABLE IF EXISTS pokemon_type;
CREATE TABLE pokemon_type (
);
