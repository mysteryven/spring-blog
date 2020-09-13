import React, {useEffect, useState} from 'react';
import User from "../user";
import Login from "../login";
import './index.scss';
import {getRequest} from "../../server/request";
import {auth} from "../../server/api";

const Header = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>();


  useEffect( () => {
    updateLoginStatus()
  }, [])

  function updateLoginStatus() {
    getRequest(auth).then(res => {
      setLoginStatus(res.data.login);
    })
  }

  return (
    <div className="pins-header">
      <Login loginStatus={loginStatus} updateLoginStatus={updateLoginStatus} />
      <User loginStatus={loginStatus} />
    </div>
  )
}

export default Header;
