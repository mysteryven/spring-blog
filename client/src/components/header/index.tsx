import React, {useEffect, useState} from "react"
import User from "../user"
import Login from "../login"
import "./index.less"
import {getRequest} from "../../server/request"
import {auth} from "../../server/api"

const Header = () => {
  const [loginStatus, setLoginStatus] = useState<boolean>()
  const [username, setUsername] = useState<string>()


  useEffect(() => {
    updateLoginStatus()
  }, [])

  function updateLoginStatus() {
    getRequest(auth).then(res => {

      setLoginStatus(res.data.login)
      res.data.data && setUsername(res.data.data.username)
    })
  }

  return (
    <div className="pins-header">
      <div className="pins-left-header">
        <h3 className={"project-name"}/>
      </div>
      <div className="pins-right-header">
        <Login loginStatus={loginStatus} updateLoginStatus={updateLoginStatus}/>
        <User loginStatus={loginStatus} updateLoginStatus={updateLoginStatus} username={username}/>
      </div>
    </div>
  )
}

export default Header
