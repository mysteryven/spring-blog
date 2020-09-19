package com.mystery.blog.contolller;

import com.mystery.blog.entity.Blog;
import com.mystery.blog.entity.BlogResult;
import com.mystery.blog.entity.User;
import com.mystery.blog.service.BlogService;
import com.mystery.blog.service.UserService;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Date;
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

    @GetMapping("/blog")
    @ResponseBody
    public Object blog(
            @RequestParam(value = "pageNo", defaultValue = "1") Integer pageNo,
            @RequestParam(value = "pageSize", defaultValue = "10") Integer pageSize,
            @RequestParam(value = "userId", required = false) Integer userId,
            @RequestParam(value = "onlyMine", required = false) boolean onlyMine
    ) {
        if (pageNo < 0) {
            pageNo = 1;
        }

        if (onlyMine) {
            userId = userService.getCurrentUser().getId();
        }

        HashMap<String, Object> map = new HashMap<>();
        map.put("list", blogService.getBlogs(pageNo, pageSize, userId));
        map.put("total", blogService.getBlogTotal(userId));

        return map;
    }

    @PostMapping("blog")
    @ResponseBody
    public Object newBlog(@RequestBody HashMap<String, String> map) {
        Blog blog = generatorBlog(map, true);

        blogService.insertBlog(blog);

        return new BlogResult("ok", "新增成功");
    }

    private Blog generatorBlog(HashMap<String, String> map, boolean isNew) {
        Blog blog = new Blog();
        blog.setTitle(map.get("title"));
        blog.setContent(map.get("content"));
        blog.setDescription(map.get("description"));
        blog.setType(map.getOrDefault("type", "1"));
        blog.setUrl(map.get("url"));
        if (isNew) {
            blog.setCreatedAt(new Date());
        }
        blog.setModifiedAt(new Date());
        blog.setUser(userService.getCurrentUser());
        return blog;
    }

    @PatchMapping("blog/{blogId}")
    @ResponseBody
    public Object updateBlog(
            @PathVariable("blogId") Integer blogId,
            @RequestBody HashMap<String, String> map) {
        Blog blog = generatorBlog(map, false);

        blogService.updateBlog(blogId, blog);

        return new BlogResult("ok", "修改成功");
    }

    @DeleteMapping("blog")
    @ResponseBody
    public Object deleteBlog(@RequestParam (required = true) Integer id) {
        User user = userService.getCurrentUser();
        if (user == null) {
            return new BlogResult("fail", "用户不存在");
        }
        try {
            Blog blog = blogService.getBlog(id, user.getId());
            if (blog == null) {
                return new BlogResult("fail", "只有自己的博客才能删除");
            }
            blogService.deleteBlog(id);
            return new BlogResult("ok", "删除成功");
        } catch (Error e) {
            return new BlogResult("ok", "删除失败");
        }
    }
}
