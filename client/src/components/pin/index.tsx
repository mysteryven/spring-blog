import React, {useState} from "react"
import "./index.less"
import {APin} from "../pins"
import {Button, Form, Input, Modal, Popconfirm} from "antd"
import {deleteRequest} from "../../server/request"
import {failNotification, successNotification} from "../../utils"
import NewPin from "../new-pin"
import {layout, tailLayout} from "../login"

interface PinProps {
  pin: APin,
  mode: "me" | "all",
  onEditModalVisible: Function
}

const Pin: React.FC<PinProps> = (props) => {
  const {title, url, description, user, createdAt, id} = props.pin

  const style = {
    fontSize: 20
  }

  function padding(num: number) {
    return (num + "").padStart(2, "0");
  }

  function formatTime(date: string) {
    const d = new Date(date)
    const year = d.getFullYear();
    const month = padding(d.getMonth() + 1) ;
    const day = padding(d.getDate())
    const hour = padding(d.getHours());
    const minute = padding(d.getMinutes());

    return year + "-" + month + "-" + day +
      " " + hour + ":" + minute
  }

  async function handleDelete() {
    deleteRequest("/blog", {
      id
    }).then(res => {
      if (res.data.status === 'ok') {
        successNotification("删除成功")
      } else {
        failNotification(res.data.msg)
      }
    }, (err) => {
      console.log(err)
    })
  }

  function handleEdit() {
    props.onEditModalVisible(id);
  }

  return (
    <div className="pin-wrapper">
      <div className="main-content">
        <a className="title" href={url} target={"_blank"}>
          {title}
        </a>
        <div className="instruction">
          {user.username}投稿[{formatTime(createdAt)}]
        </div>
      </div>
      <div className="recommended-language">
        {description || "他有点懒，没有写推荐语。"}
      </div>
      {
        props.mode === 'me' && (
          <div className={"operator-btn-group"}>
            <Popconfirm placement="topLeft" title={"确定要删除吗？"} onConfirm={handleDelete} okText="是" cancelText="否">
              <Button size={"small"} type={"ghost"}>删除</Button>
            </Popconfirm>
            <Button size={"small"} type={"primary"} onClick={handleEdit}>编辑</Button>
          </div>
        )
      }

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

export default Pin
