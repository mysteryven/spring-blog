package com.mystery.demo.service;

import com.mystery.blog.dao.UserMapper;
import com.mystery.blog.entity.User;
import com.mystery.blog.service.UserService;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
public class UserServiceTest {
    @Mock
    BCryptPasswordEncoder mockEncoder;

    @InjectMocks
    UserService userService;

    @Mock
    UserMapper mockUserMapper;

    @Test
    public void testGetUserByUsername() {
        String username = "wang";

        userService.getUserByUserName(username);
        verify(mockUserMapper).findUserByUsername(username);
    }

    @Test
    public void testSave() {
        String username = "wang";
        String password = "123";
        String encodedPassword = "321";

        when(mockEncoder.encode(password)).thenReturn(encodedPassword);

        userService.save(username, password);
        verify(mockUserMapper).saveUser(username, encodedPassword);
    }

    @Test
    public void throwUsernameNotFoundExceptionIfNotFound() {
        Assertions.assertThrows(UsernameNotFoundException.class, () -> {
            userService.loadUserByUsername("hi-wang");
        });
    }

    @Test
    public void returnRightUserDetails() {
        String username = "fake";
        String encodedPassword = "mystery";
        when(mockUserMapper.findUserByUsername(username)).thenReturn(new User(1, username, encodedPassword));

        UserDetails userDetails = userService.loadUserByUsername(username);

        Assertions.assertEquals(username, userDetails.getUsername());
        Assertions.assertEquals(encodedPassword, userDetails.getPassword());


    }

}
