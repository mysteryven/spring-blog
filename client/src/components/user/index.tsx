import React, {useState} from "react";
import {Avatar, Popover} from "antd";
import './index.scss';

const User: React.FC = () => {

  const PopContent = (
    <div className="profile-list">
      <div className="profile-item">个人信息</div>
      <div className="profile-item">登出</div>
    </div>
  );

  const UserList = ['U', 'Lucy', 'Tom', 'Edward'];
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  const [user, setUser] = useState(UserList[1]);
  const [color, setColor] = useState(ColorList[1]);

  return (
    <div>
      <Popover placement="bottomLeft" title={user} content={PopContent}>
        <Avatar
          style={{backgroundColor: color, verticalAlign: 'middle'}}
          size={48}
          shape={"circle"}
          gap={4}
        >
          {user}
        </Avatar>
      </Popover>

    </div>
  )
}

export default User;
