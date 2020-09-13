import React, {useEffect, useState} from 'react';
import User from "../user";
import Login from "../login";
import './index.scss';
import {getRequest} from "../../server/request";
import {auth} from "../../server/api";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>();
  const [username, setUsername] = useState<string>();


  useEffect( () => {
    updateLoginStatus()
  }, [])

  function updateLoginStatus() {
    getRequest(auth).then(res => {

      setLoginStatus(res.data.login);
      res.data.data && setUsername(res.data.data.username)
    })
  }

  return (
    <div className="pins-header">
      <Login loginStatus={loginStatus} updateLoginStatus={updateLoginStatus} />
      <User loginStatus={loginStatus} updateLoginStatus={updateLoginStatus} username={username} />
    </div>
  )
}

export default Header;
