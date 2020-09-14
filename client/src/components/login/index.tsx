import React, {Fragment, useState} from "react"
import {Button, Form, Input, Modal} from "antd"
import "./index.scss"
import {postRequest} from "../../server/request"
import {login, register} from "../../server/api"
import {failNotification, handleResult, Res, successNotification} from "../../utils"
import {AxiosResponse} from "axios"

export const layout = {
  labelCol: {span: 6},
  wrapperCol: {span: 16}
}
export const tailLayout = {
  wrapperCol: {offset: 6, span: 16}
}

interface LoginValues {
  username: string;
  password: string;
}

interface LoginProps {
  loginStatus?: boolean;
  username?: string;
  updateLoginStatus: (status: boolean) => void
}


const Login: React.FC<LoginProps> = (props) => {
  const [visible, setVisible] = useState<boolean>()
  const [type, setType] = useState<"login" | "register">()

  function handleCancel() {
    setVisible(false)
  }

  function computeStatusText() {
    return type === "login" ? "登录" : "注册"
  }

  async function onFinish(values: LoginValues) {
    console.log(values)
    const text = computeStatusText()
    const api = type === "login" ? login : register

    try {
      const res: AxiosResponse<Res> = await postRequest(api, values)
      handleResult(res, () => {
        successNotification(text + "成功")
        props.updateLoginStatus(true)
        setVisible(false)
      }, (msg) => {
        failNotification(msg)
      })
    } catch (e) {
      console.log(e)
    }
  }

  function handleLogin() {
    setType("login")
    setVisible(true)
  }


  function handleRegister() {
    setType("register")
    setVisible(true)
  }

  return (
    <div className={"pins-login"}>
      {
        !props.loginStatus &&
        <Fragment>
            <div className={"login"} onClick={handleLogin}>登录</div>
            <div className={"register"} onClick={handleRegister}>注册</div>
        </Fragment>
      }
      <Modal
        title={computeStatusText()}
        footer={null}
        visible={visible}
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
            rules={[{required: true, message: "Please input your username!"}]}
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{required: true, message: "Please input your password!"}]}
          >
            <Input.Password/>
          </Form.Item>

          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Login
