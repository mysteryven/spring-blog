package com.blog.demo.contolller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
public class BlogController {

    @GetMapping("/blog")
    @ResponseBody
    public Object blog() {

        return null;
    }
}
