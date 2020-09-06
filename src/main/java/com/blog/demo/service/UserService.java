package com.blog.demo.service;

import com.blog.demo.dao.UserMapper;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import javax.inject.Inject;
import java.util.Collections;

@Service
public class UserService implements UserDetailsService {
    private final BCryptPasswordEncoder bCryptPasswordEncoder;
    private final UserMapper userMapper;


    @Inject
    public UserService(BCryptPasswordEncoder bCryptPasswordEncoder, UserMapper userMapper) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userMapper = userMapper;
    }

    public void save(String username, String password) {
        userMapper.saveUser(username, bCryptPasswordEncoder.encode(password));
    }

    public com.blog.demo.entity.User getUserByUserName(String username) {
        return userMapper.findUserByUsername(username);
    }

    public com.blog.demo.entity.User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.getUserByUserName(authentication == null ? null : authentication.getName());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.blog.demo.entity.User user = getUserByUserName(username);

        if (user == null) {
            throw new UsernameNotFoundException("不存在此用户");
        }

        return new User(username, user.getPassword(), Collections.emptyList());
    }
}
