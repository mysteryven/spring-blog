import React from 'react';
import User from "../user";
import Login from "../login";
import './index.scss';

const Header = () => {
  return (
    <div className="pins-header">
      <Login/>
      <User/>
    </div>
  )
}

export default Header;
