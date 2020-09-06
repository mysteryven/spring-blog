package com.blog.demo.service;

import com.blog.demo.dao.BlogDao;
import com.blog.demo.entity.Blog;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.List;

@Service
public class BlogService {
    private BlogDao blogDao;

    @Inject
    public BlogService(BlogDao blogDao) {
        this.blogDao = blogDao;
    }

    public List<Blog> getBlogs(Integer pageNo, Integer pageSize, Integer userId) {
       return blogDao.getBlogs(pageNo, pageSize, userId);
    }

    public void insertBlog(Blog blog) {
        blogDao.insertBlog(blog);
    }
}
