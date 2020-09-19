import React from "react"
import User from "../user"
import Login from "../login"
import "./index.less"

interface HeaderProps {
  loginStatus?: boolean;
  username?: string;
  updateLoginStatus: (status: boolean) => void;
}

const Header:React.FC<HeaderProps> = (props) => {

  return (
    <div className="pins-header">
      <div className="pins-left-header">
        <h3 className={"project-name"}/>
      </div>
      <div className="pins-right-header">
        <Login loginStatus={props.loginStatus} updateLoginStatus={props.updateLoginStatus}/>
        <User loginStatus={props.loginStatus} updateLoginStatus={props.updateLoginStatus} username={props.username}/>
      </div>
    </div>
  )
}

export default Header
