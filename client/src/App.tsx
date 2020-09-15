import React, {useEffect, useState} from "react"
import Pins from "./components/pins"
import "antd/dist/antd.less"
import "./App.less"
import Header from "./components/header"
import {Button} from "antd"
import {getRequest} from "./server/request"
import {auth} from "./server/api"

function App() {
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


  function handleCodeResourceClick() {
    window.open("https://github.com/mysteryven/spring-demo", "_blank")
  }

  return (
    <div className="App">
      <Header updateLoginStatus={updateLoginStatus} loginStatus={loginStatus} username={username} />
      <Pins loginStatus={loginStatus} />
      <Button className={"code-resource"} onClick={handleCodeResourceClick}>源码地址</Button>
    </div>
  )
}

export default App
