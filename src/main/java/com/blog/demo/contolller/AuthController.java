package com.blog.demo.contolller;

import com.blog.demo.entity.User;
import com.blog.demo.service.UserService;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.inject.Inject;
import java.util.Collections;
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
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        if (authentication == null) {
            return new Result("fail", "没有登录1", false);
        } else {
            String username = authentication.getName();
            User user = userService.getUserByUserName(username);
            if (user == null) {
                return new Result("fail", "没有登录", false);
            }
            return new Result("ok", "登录成功", true, user);
        }
    }


    @PostMapping("auth/register")
    @ResponseBody
    public Object register(@RequestBody Map<String, String> usernameAndPassword) {
        String username = usernameAndPassword.get("username");
        String password = usernameAndPassword.get("password");
        User userByUserName = userService.getUserByUserName(username);

        if (userByUserName != null) {
            return new Result("fail", "用户已存在", false);
        } else {
            userService.save(username, password);
            login(usernameAndPassword);
        }

        return new Result("ok", "注册成功", true);
    }

    @PostMapping("/auth/login")
    @ResponseBody
    public Object login(@RequestBody Map<String, String> usernameAndPassword) {
        String username = usernameAndPassword.get("username");
        String password = usernameAndPassword.get("password");
        User realUser;

        try {
            realUser = userService.getUserByUserName(username);
            if (realUser == null) {
                return new Result("fail", "用户不存在", false);
            }
        } catch (UsernameNotFoundException e) {
            return new Result("fail", "用户不存在", false);
        }

        UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken = new UsernamePasswordAuthenticationToken(username, password, Collections.emptyList());

        try {
            Authentication authenticate = authenticationManager.authenticate(usernamePasswordAuthenticationToken);
            SecurityContextHolder.getContext().setAuthentication(authenticate);
            User userDetails = userService.getUserByUserName(username);

            return new Result("ok", "登录成功", true, userDetails);
        } catch (BadCredentialsException e) {
            return new Result("fail", "密码不正确", false);
        }
    }

    @PostMapping("/auth/logout")
    @ResponseBody
    public Object logout() {
        SecurityContextHolder.clearContext();

        return new Result("ok", "已登出", false);
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
