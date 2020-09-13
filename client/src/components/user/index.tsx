import React, {useState} from "react";
import {Avatar, Popover} from "antd";
import './index.scss';

interface UserProps {
  loginStatus?: boolean
}

const User: React.FC<UserProps> = (props) => {

  const PopContent = (
    <div className="profile-list">
      <div className="profile-item">登出</div>
    </div>
  );

  const UserList = ['U', '', 'Tom', 'Edward'];
  const ColorList = ['#f56a00', '#7265e6', '#ffbf00', '#00a2ae'];

  const [user, setUser] = useState(UserList[1]);
  const [color, setColor] = useState(ColorList[1]);

  return (
    <div>
      {props.loginStatus && (
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
      }</div>
  )
}

export default User;
