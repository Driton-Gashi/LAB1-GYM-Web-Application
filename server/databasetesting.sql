
CREATE TABLE football_club (
  id INT PRIMARY KEY AUTO_INCREMENT,
  club_name VARCHAR(255)
);

CREATE TABLE player (
  player_id INT PRIMARY KEY AUTO_INCREMENT,
  player_name VARCHAR(255),
  club_id INT,
  FOREIGN KEY (club_id) REFERENCES football_club (id)
);
