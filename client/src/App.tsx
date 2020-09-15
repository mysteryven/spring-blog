import React from "react"
import Pins from "./components/pins"
import "antd/dist/antd.less"
import "./App.less"
import Header from "./components/header"
import {Button} from "antd"

function App() {

  function handleCodeResourceClick() {
    window.open("https://github.com/mysteryven/spring-demo", "_blank")
  }

  return (
    <div className="App">
      <Header/>
      <Pins/>
      <Button className={"code-resource"} onClick={handleCodeResourceClick}>源码地址</Button>
    </div>
  )
}

export default App
