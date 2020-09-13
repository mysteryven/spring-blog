import React, {useState} from "react"
import {Avatar, Modal, Popover} from "antd"
import "./index.scss"
import {getRandomInt, handleResult, successNotification} from "../../utils"
import {ExclamationCircleOutlined} from "@ant-design/icons"
import {getRequest} from "../../server/request"
import {logout} from "../../server/api"

interface UserProps {
  loginStatus?: boolean;
  username?: string;
  updateLoginStatus: (statue: boolean) => void
}

const User: React.FC<UserProps> = (props) => {
  const {username} = props

  function handleLogout() {
    Modal.confirm({
      title: "Confirm",
      icon: <ExclamationCircleOutlined/>,
      content: "确认要登出吗？",
      okText: "确认",
      cancelText: "取消",
      onOk: () => {
        getRequest(logout).then(res => {
          handleResult(res, () => {
            successNotification("登出成功")
            props.updateLoginStatus(false)
          })
        })
      }
    })
  }

  const PopContent = (
    <div className="profile-list">
      <div className="profile-item" onClick={handleLogout}>登出</div>
    </div>
  )

  const ColorList = ["#f56a00", "#7265e6", "#ffbf00", "#00a2ae"]

  const [color] = useState(ColorList[getRandomInt(3)])

  return (
    <div>
      {props.loginStatus && (
        <div>
          <Popover placement="bottomLeft" title={username} content={PopContent}>
            <Avatar
              style={{backgroundColor: color, verticalAlign: "middle"}}
              size={48}
              shape={"circle"}
              gap={4}
            >
              {username ? username.slice(0, 6) : ""}
            </Avatar>
          </Popover>

        </div>
      )
      }</div>
  )
}

export default User
