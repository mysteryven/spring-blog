# Spring-boot 博客

## 预览

[小报计划](http://47.98.241.215:8080/)

## 介绍

- `client` 为前端项目，使用 create-react-app 构建，使用 React + TypeScript 编写
- `src` 为后端目录，使用 spring-boot 构建，使用 mybatis 作为 ORM 框架，mysql 作为数据库
- 前端项目开发好之后，先打包，然后放到了 spring-boot 的默认静态资源目录：`src/main/resources/static`
- 由于我的阿里云服务器配置低，访问比较缓慢，请见谅。

## 本地调试 

### 启动数据库

```bash
docker run --name my-sql -d -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -v [你自己的路径]:/var/lib/mysql mysql
```

### 运行

需要安装 IDEA 和 Java 环境。如何配置，可以网上查阅。配置好之后直接启动即可，文件为：

```
src/main/java/com/mystery/blog/Application.java
```

## 上传到服务器

我没有使用自动化部署工具，使用了比较笨的方法。

ps: 下面的服务器默认使用了我的，你可根据自己的需要进行替换。

0. 更改前端目录的 `baseUrl` 为你的服务器加端口号，全局搜 `baseUrl` 就可以找到配置在哪。
```
const baseUrl = "http://47.98.241.215:8080"
```

1. 更改 spring 连接的 mysql 是你在服务器启动的那个。全局搜 `spring.datasource.url` 就可以找到配置在哪。值得注意的是 `172.16.105.140` 是你的局域网 ip 地址，可以使用 `ifconfig` 查看。

```
spring.datasource.url=jdbc:mysql://172.16.105.140:3306/news
```



2. 打包前端项目

```
cd client
yarn build
yarn mv:build
```

3. 打 jar 包，对应的包在 `/target` 下

```
cd ..  # 回到根目录
mvn clean package
```

2. 暴力徒手上传

```
scp target/demo-0.0.2-SNAPSHOT.jar root@47.98.241.215:~/java
```

3. 连接服务器后，在 java 目录写一个 `Dockerfile`。如何连接服务器，可以配置 ssh，也可以直接登录你购买的服务器的后台。具体请搜索 ~

```
FROM openjdk:8

RUN mkdir /app

WORKDIR /app

COPY demo-0.0.2-SNAPSHOT.jar  /app

EXPOSE 8080
```

4. 开始执行镜像

```
docker build -t my-java-app .

docker run -p 8080:8080 my-java-app
```

5. 启动 mysql

```
 docker run --name my-sql -d -e MYSQL_ROOT_PASSWORD=my-secret-pw -p 3306:3306 -v /root/mysql:/var/lib/mysql mysql
```

6. 当你成功运行了 mysql，如何你想手动修改 mysql 的数据：

```
 docker exec -it my-sql1 mysql -uroot -p
```

7. 接下来输入你使用 docker 启动 mysql 输入的密码就好了，如果没有改，就是 `my-secret-pw`，进入之后可以执行任意操作了。

