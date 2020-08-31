create table BLOG
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(100),
    url         VARCHAR(200),
    content     VARCHAR(500),
    type        INT, # 1 -> 投稿，2 -> 自制
    user_id     INT,
    created_at  TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    modified_at TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

