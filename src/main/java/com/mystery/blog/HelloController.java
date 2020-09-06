package com.mystery.blog;


import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.concurrent.atomic.AtomicLong;

@RestController
class HelloController {
    private final AtomicLong counter = new AtomicLong();

    @RequestMapping("/")
    public String index() {
        return "Hello world";
    }

    @GetMapping("/")
    public Greeting greeting(@RequestParam(value = "name", defaultValue = "World") String name) {
        return new Greeting(counter.incrementAndGet(), name);
    }

}
