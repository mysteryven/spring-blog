import React from 'react';
import './index.less';
import {HeartTwoTone, MessageTwoTone} from "@ant-design/icons/lib";
import {Pagination} from "antd";
import {APin} from "../pins";

interface PinProps {
  pin: APin
}

const Pin: React.FC<PinProps> = (props) => {
  const {title, url, description, user} = props.pin;
  const style = {
    fontSize: 20
  }

  return (
    <div className="pin-wrapper">
      <div className="main-content">
        <a className="title" href={url} target={"_blank"}>
          {title}
        </a>
        <div className="instruction">
          {user.username}投稿
        </div>
      </div>
      <div className="recommended-language">
        {description || '这个人懒死了，没有写推荐语'}
      </div>
      {/*<div className="infos">*/}
      {/*  <div className={'info'}>*/}
      {/*    <HeartTwoTone style={style} twoToneColor="#fb7299"  />*/}
      {/*    <span className={'num'}>(12)</span>*/}
      {/*  </div>*/}
      {/*  <div className={'info'}>*/}
      {/*    <MessageTwoTone style={style} twoToneColor="#fb7299"  />*/}
      {/*    <span className={'num'}>(12)</span>*/}
      {/*  </div>*/}
      {/*</div>*/}
    </div>
  )
}

export default Pin;
