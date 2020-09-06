package com.blog.demo.contolller;

import com.blog.demo.dao.BlogDao;
import com.blog.demo.entity.Blog;
import com.blog.demo.entity.User;
import com.blog.demo.service.BlogService;
import com.blog.demo.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.HashMap;
import java.util.Map;

@Controller
public class BlogController {
    private BlogService blogService;
    private UserService userService;

    @Inject
    public BlogController(BlogService blogService, UserService userService) {
        this.blogService = blogService;
        this.userService = userService;
    }

    @GetMapping("/blog")
    @ResponseBody
    public Object blog(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value="userId", required = false) Integer userId
    ) {
        if (pageNo < 0) {
            pageNo = 1;
        }
        return blogService.getBlogs(pageNo, pageSize, userId);
    }

    @PostMapping("blog")
    @ResponseBody
    public Object newBlog(@RequestBody HashMap<String, String> map) {

        Blog blog = new Blog();
        blog.setTitle(map.get("title"));
        blog.setContent(map.get("content"));
        blog.setDescription(map.get("description"));
        blog.setType(map.getOrDefault("type", "1"));
        blog.setUrl(map.get("url"));
        blog.setUser(userService.getCurrentUser());

        blogService.insertBlog(blog);

        return "hi";
    }
}
