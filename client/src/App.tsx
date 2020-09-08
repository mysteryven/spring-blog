import React, {useEffect} from 'react';
import Pins from './components/pins'
import 'antd/dist/antd.less';
import './App.less';
import Header from "./components/header";
import {getRequest } from "./server/request";

function App() {

  useEffect(() => {
    getRequest("/auth").then(r => {
      console.log(r);
    })
  }, [])


  return (
    <div className="App">
      <Header/>
      <Pins/>
    </div>
  );
}

export default App;
