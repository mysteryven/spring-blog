package com.blog.demo.dao;

import com.blog.demo.entity.User;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE username = #{username}")
    User findUserByUsername(@Param("username") String username);

    @Insert("INSERT INTO users(username, password) VALUES(#{username}, #{password})")
    void saveUser(@Param("username") String username, @Param("password") String password);
}
