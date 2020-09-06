package com.blog.demo.entity;

public class Result {
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
