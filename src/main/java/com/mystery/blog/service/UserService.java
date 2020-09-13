package com.mystery.blog.service;

import com.mystery.blog.dao.UserDao;
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
    private final UserDao userDao;

    @Inject
    public UserService(BCryptPasswordEncoder bCryptPasswordEncoder, UserDao userDao) {
        this.bCryptPasswordEncoder = bCryptPasswordEncoder;
        this.userDao = userDao;
    }

    public void save(String username, String password) {
        userDao.saveUser(username, bCryptPasswordEncoder.encode(password));
    }

    public com.mystery.blog.entity.User getUserByUserName(String username) {
        return userDao.findUserByUsername(username);
    }

    public com.mystery.blog.entity.User getCurrentUser() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        return this.getUserByUserName(authentication == null ? null : authentication.getName());
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        com.mystery.blog.entity.User user = getUserByUserName(username);

        if (user == null) {
            throw new UsernameNotFoundException("不存在此用户");
        }

        return new User(username, user.getPassword(), Collections.emptyList());
    }
}
