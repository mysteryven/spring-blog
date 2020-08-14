package com.blog.demo;


import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;

@RestController
class HelloController {
    @RequestMapping("/")
    public String index() {
       return "Hello world";
   }
}
