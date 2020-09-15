package com.mystery.blog.contolller;

import com.mystery.blog.entity.Blog;
import com.mystery.blog.entity.BlogResult;
import com.mystery.blog.service.BlogService;
import com.mystery.blog.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.time.Instant;
import java.util.HashMap;

@Controller
public class BlogController {
    private final BlogService blogService;
    private final UserService userService;

    @Inject
    public BlogController(BlogService blogService, UserService userService) {
        this.blogService = blogService;
        this.userService = userService;
    }

    @CrossOrigin("*")
    @GetMapping("/blog")
    @ResponseBody
    public Object blog(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "userId", required = false) Integer userId
    ) {
        if (pageNo < 0) {
            pageNo = 1;
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("list", blogService.getBlogs(pageNo, pageSize, userId));
        map.put("total", blogService.getBlogTotal());

        return map;
    }

    @CrossOrigin("*")
    @PostMapping("blog")
    @ResponseBody
    public Object newBlog(@RequestBody HashMap<String, String> map) {
        Blog blog = generatorBlog(map, true);

        blogService.insertBlog(blog);

        return new BlogResult("ok", "成功");
    }

    private Blog generatorBlog(HashMap<String, String> map, boolean isNew) {
        Blog blog = new Blog();
        blog.setTitle(map.get("title"));
        blog.setContent(map.get("content"));
        blog.setDescription(map.get("description"));
        blog.setType(map.getOrDefault("type", "1"));
        blog.setUrl(map.get("url"));
        if (isNew) {
            blog.setCreatedAt(Instant.now());
        }
        blog.setModifiedAt(Instant.now());
        blog.setUser(userService.getCurrentUser());
        return blog;
    }

    public Object updateBlog(@RequestBody HashMap<String, String> map) {
        Blog blog = generatorBlog(map, false);

        blogService.updateBlog(map.get("id"), blog);

        return "edit";
    }
}
