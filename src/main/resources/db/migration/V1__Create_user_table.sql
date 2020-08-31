create table USER
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    username    VARCHAR(20),
    password    VARCHAR(100),
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

