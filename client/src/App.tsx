import React, {useEffect, useState} from "react"
import Pins from "./components/pins"
import "antd/dist/antd.less"
import "./App.less"
import Header from "./components/header"
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

  return (
    <div className="App">
      <Header updateLoginStatus={updateLoginStatus} loginStatus={loginStatus} username={username} />
      <Pins loginStatus={loginStatus} />
    </div>
  )
}

export default App
