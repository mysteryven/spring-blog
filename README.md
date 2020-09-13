# Spring-boot 博客

## 准备

如果想成功启动此项目，你需要做到下面三个条件：

1. 安装 Docker
2. 配置 Java 环境（Java，Maven）
3. 配置 Node 环境（Node）
4. 开发工具（IDEA）

## 启动 

### 启动数据库

```bash
docker run --name my-sql -d -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -v /Users/wenzhe/java-repos/demo1/mysql:/var/lib/mysql mysql
```

### 运行后端

使用 IDEA 打开项目，进入

### 运行前端
