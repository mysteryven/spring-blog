package com.blog.demo.contolller;

import com.blog.demo.entity.User;
import com.blog.demo.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import javax.inject.Inject;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

@Controller
public class AuthController {
    private final UserService userService;
    private final AuthenticationManager authenticationManager;

    @Inject
    public AuthController(UserService userService, AuthenticationManager authenticationManager) {
        this.userService = userService;
        this.authenticationManager = authenticationManager;
    }

    @GetMapping("/auth")
    @ResponseBody
    public Object auth() {
        return new Result("ok", true);
    }

    @PostMapping("/auth/login")
    @ResponseBody
    public Object login(@RequestBody Map<String, Object> usernameAndPassword) {
        System.out.println(usernameAndPassword);
        String username = (String) usernameAndPassword.get("username");
        UserDetails realUser;

        try {
            realUser = userService.loadUserByUsername(username);
            if (realUser == null) {
                return new Result("fail", "用户不存在", false);
            }
        } catch (UsernameNotFoundException e) {
            return new Result("fail", "用户不存在", false);
        }


        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(realUser, usernameAndPassword, Collections.emptyList());

        try {
            Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            User userDetails = new User(1, "x", "wang");

            return new Result("ok", "登录成功", true, userDetails);
        } catch (BadCredentialsException e) {
            return new Result("fail", "密码不正确", false);
        }
    }

    private static class Result {
        private String status;
        private String msg;
        private boolean isLogin;
        private User data;

        public Result(String status, boolean isLogin) {
            this.status = status;
            this.isLogin = isLogin;
        }

        public Result(String status, String msg, boolean isLogin) {
            this.status = status;
            this.msg = msg;
            this.isLogin = isLogin;
        }

        public Result(String status, String msg, boolean isLogin, User data) {
            this.status = status;
            this.isLogin = isLogin;
            this.data = data;
            this.msg = msg;
        }

        public String getMsg() {
            return msg;
        }

        public void setMsg(String msg) {
            this.msg = msg;
        }

        public User getData() {
            return data;
        }

        public void setData(User data) {
            this.data = data;
        }

        public String getStatus() {
            return status;
        }

        public void setStatus(String status) {
            this.status = status;
        }

        public boolean isLogin() {
            return isLogin;
        }

        public void setLogin(boolean login) {
            isLogin = login;
        }
    }
}
