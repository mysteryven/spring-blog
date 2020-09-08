import React, {useState} from "react";
import {Button, Form, Input, Modal, notification} from 'antd';
import './index.scss'

export const layout = {
  labelCol: {span: 8},
  wrapperCol: {span: 16},
};
export const tailLayout = {
  wrapperCol: {offset: 8, span: 16},
};


const Login: React.FC = () => {
  const [visible, setVisible] = useState();

  function handleOk() {
    setVisible(true)
  }

  function handleCancel() {
    setVisible(false)
  }

  function onFinish() {
    notification['success']({
      message: '登录成功',
      description:
        ' 恭喜你，已经登录成功了',
    });
  }

  return (
    <div className={"pins-login"}>
      <div className={"login"} onClick={handleOk}>登录</div>
      <div className={"register"} onClick={handleOk}>注册</div>
      <Modal
        title="登录"
        footer={null}
        visible={visible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{required: true, message: 'Please input your username!'}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: 'Please input your password!'}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Login;
