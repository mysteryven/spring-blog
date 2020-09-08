import React from 'react';
import Pin from '../pin';
import NewPin from "../new-pin";
import './index.less';

const Pins = () => {
  return (
    <div className={"pins-wrapper"}>
      <NewPin/>
      <div className="pins-container">
        <Pin/>
        <Pin/>
      </div>
    </div>
  )
}

export default Pins;
