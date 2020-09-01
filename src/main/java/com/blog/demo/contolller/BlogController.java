package com.blog.demo.contolller;

import com.blog.demo.dao.BlogDao;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;

@Controller
public class BlogController {
    private BlogDao blogDao;

    @Inject
    public BlogController(BlogDao blogDao) {
        this.blogDao = blogDao;
    }

    @GetMapping("/blog")
    @ResponseBody
    public Object blog() {
        blogDao.getBlogs();

        return null;
    }
}
