import React from 'react';
import './index.less';
import {HeartTwoTone, MessageTwoTone} from "@ant-design/icons/lib";

const Pin = () => {

  const style = {
    fontSize: 20
  }

  return (
    <div className="pin-wrapper">
      <div className="main-content">
        <a className="title">
          文明之光为什么好看？
        </a>
        <div className="instruction">
          王文哲投稿
        </div>
      </div>
      <div className="recommended-language">
        推荐语：因为他做了很多不可思议的事情，出发点。
        推荐语：因为他做了很多不可思议的事情，出发点。
        推荐语：因为他做了很多不可思议的事情，出发点。
        推荐语：因为他做了很多不可思议的事情，出发点。
      </div>
      <div className="infos">
        <div className={'info'}>
          <HeartTwoTone style={style} twoToneColor="#fb7299"  />
          <span className={'num'}>(12)</span>
        </div>
        <div className={'info'}>
          <MessageTwoTone style={style} twoToneColor="#fb7299"  />
          <span className={'num'}>(12)</span>
        </div>
      </div>
    </div>
  )
}

export default Pin;
