package com.blog.demo.dao;

import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Mapper
public interface UserMapper {
    @Select("SELECT * FROM users WHERE username = #{username}")
        Object findUserByUsername(@Param("username") String username);
}
