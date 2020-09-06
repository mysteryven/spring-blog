package com.mystery.blog.dao;

import com.mystery.blog.entity.Blog;
import org.apache.ibatis.session.SqlSession;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

@Service
public class BlogDao {
    private final SqlSession sqlSession;

    public HashMap<String, Object> asMap(Object... args) {
        HashMap<String, Object> map = new HashMap<>();

        for (int i = 0; i < args.length; i += 2) {
            map.put(args[i].toString(), args[i + 1]);
        }
        return map;
    }

    @Inject
    public BlogDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public List<Blog> getBlogs(Integer pageNo, Integer pageSize, Integer userId) {
        HashMap<String, Object> parameters = asMap(
                "user_id", userId,
                "offset", (pageNo - 1) * pageSize,
                "limit", pageSize
        );

        return sqlSession.selectList("selectBlog", parameters);
    }

    public void insertBlog(Blog blog) {
        sqlSession.insert("insertBlog", blog);
    }
}
