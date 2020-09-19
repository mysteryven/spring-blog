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

    @Inject
    public BlogDao(SqlSession sqlSession) {
        this.sqlSession = sqlSession;
    }

    public HashMap<String, Object> asMap(Object... args) {
        HashMap<String, Object> map = new HashMap<>();

        for (int i = 0; i < args.length; i += 2) {
            map.put(args[i].toString(), args[i + 1]);
        }
        return map;
    }

    public List<Blog> getBlogs(Integer pageNo, Integer pageSize, Integer userId) {
        HashMap<String, Object> parameters = asMap(
                "user_id", userId,
                "offset", (pageNo - 1) * pageSize,
                "limit", pageSize
        );

        List<Blog> blogs = sqlSession.selectList("selectBlog", parameters);
        return blogs;
    }



    public void insertBlog(Blog blog) {
        sqlSession.insert("insertBlog", blog);
    }

    public void updateBlog(Blog blog) {
        sqlSession.update("updateBlog", blog);
    }

    public Object getBlogTotal(Integer userId) {
        return sqlSession.selectOne("selectBlogCount", userId);
    }

    public void deleteBlog(Integer id) {
        sqlSession.delete("deleteBlog", id);
    }

    public Blog getBlog(HashMap<String, Integer> ids) {
        return sqlSession.selectOne("selectOneBlog", ids);
    }
}
