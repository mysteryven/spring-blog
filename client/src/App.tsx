import React from "react"
import Pins from "./components/pins"
import "antd/dist/antd.less"
import "./App.less"
import Header from "./components/header"

function App() {
  return (
    <div className="App">
      <Header/>
      <Pins/>
    </div>
  )
}

export default App
