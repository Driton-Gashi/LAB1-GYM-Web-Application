
-- CREATE TABLE football_club (
--   id INT PRIMARY KEY AUTO_INCREMENT,
--   club_name VARCHAR(255)
-- );

-- CREATE TABLE player (
--   player_id INT PRIMARY KEY AUTO_INCREMENT,
--   player_name VARCHAR(255),
--   club_id INT,
--   FOREIGN KEY (club_id) REFERENCES football_club (id)
-- );

CREATE TABLE club (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    club_id INT REFERENCES club(id) ON DELETE CASCADE
);
