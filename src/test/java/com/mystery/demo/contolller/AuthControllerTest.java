package com.mystery.demo.contolller;

import com.mystery.blog.contolller.AuthController;
import com.mystery.blog.entity.User;
import com.mystery.blog.service.UserService;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.Mockito;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.http.MediaType;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.test.context.junit.jupiter.SpringExtension;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;

import java.nio.charset.StandardCharsets;
import java.util.HashMap;

import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@ExtendWith(MockitoExtension.class)
@ExtendWith(SpringExtension.class)
class AuthControllerTest {
    private MockMvc mockMvc;

    @Mock
    private UserService userService;
    @Mock
    private AuthenticationManager authenticationManager;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    @BeforeEach
    void setup() {
        mockMvc = MockMvcBuilders.standaloneSetup(new AuthController(userService, authenticationManager)).build();
    }

    @Test
    void returnNotLoginByDefault() throws Exception {
        mockMvc
                .perform(get("/auth"))
                .andExpect(status().isOk())
                .andExpect(mvcResult -> {
                    Assertions.assertTrue(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8).contains("没有登录"));
                });

    }

    @Test
    void login() throws Exception {
        mockMvc.perform(get("/auth")).andExpect(status().isOk()).andExpect(mvcResult -> {
            Assertions.assertTrue(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8).contains("没有登录"));
        });

        HashMap<String, String> usernameAndPassword = new HashMap<>();
        usernameAndPassword.put("username", "w");
        usernameAndPassword.put("password", "1");

        Mockito.when(userService.getUserByUserName("w")).thenReturn(new User(1, "w", bCryptPasswordEncoder.encode("1")));

        mockMvc
                .perform(post("/auth/login")
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(new ObjectMapper().writeValueAsString(usernameAndPassword)))
                .andExpect(status().isOk())
                .andExpect(mvcResult -> Assertions.assertTrue(mvcResult.getResponse().getContentAsString(StandardCharsets.UTF_8).contains("登录成功")))
                .andReturn();
    }
}
