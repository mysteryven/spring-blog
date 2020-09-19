import React, {useState} from "react"
import {Button, Form, Input, Modal} from "antd"
import {layout, tailLayout} from "../login"
import {postRequest} from "../../server/request"
import {blog} from "../../server/api"
import {failNotification, successNotification} from "../../utils"

interface Values {
  title: string;
  url: string;
  description: string;
}

const NewPin = () => {
  const [visible, setVisible] = useState<boolean>()

  function handleOk() {
    setVisible(true)
  }

  function handleCancel() {
    setVisible(false)
  }

  function onFinish(values: Values) {
    const url = values.url

    if (!url.startsWith("https://") || !url.startsWith("http://")) {
      failNotification("正确的链接应该以 http 或者 https 开头")
      return
    } else if (url.includes("blog.csdn")) {
      failNotification("不允许任何垃圾 CSDN 的链接!!!")
      return
    }

    postRequest(blog, {
      ...values,
      type: 1
    }).then((res) => {
      successNotification("新增成功")
      handleCancel()
    }, (err) => {
      failNotification("没有登录是不能投稿的")
    })

  }

  return (
    <div>
      <Button type={"primary"} className={"new-pins-btn"} onClick={handleOk}>投稿</Button>
      <Modal
        title="投稿"
        visible={visible}
        onOk={handleOk}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          onFinish={onFinish}
        >
          <Form.Item
            label="标题"
            name="title"
            rules={[{required: true}]}
          >
            <Input/>
          </Form.Item>
          <Form.Item
            label="链接地址"
            name="url"
            rules={[{required: true}]}
          >
            <Input allowClear/>
          </Form.Item>

          <Form.Item
            label="推荐语"
            name="description"
          >
            <Input.TextArea/>
          </Form.Item>
          <Form.Item {...tailLayout}>
            <Button type="primary" block htmlType="submit">
              投一个
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default NewPin
