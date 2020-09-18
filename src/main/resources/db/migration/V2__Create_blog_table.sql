create table blog
(
    id          INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title       VARCHAR(100),
    url         VARCHAR(200),
    content     VARCHAR(500),
    description VARCHAR(500),
    type        INT, # 1 -> 投稿，2 -> 自制
    user_id     INT,
    created_at   datetime,
    modified_at  datetime
);

