import React, {useState} from "react";
import {Button, Form, Input, Modal, notification} from "antd";
import {layout} from "../login";

const NewPin = () => {
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
    <div>
      <Button type={"primary"} className={"new-pins-btn"} onClick={handleOk}>投稿</Button>
      <Modal
        title="投稿"
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
            label="title"
            name="title"
          >
            <Input/>
          </Form.Item>

          <Form.Item
            label="content"
            name="content"
          >
            <Input.TextArea/>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}

export default NewPin;
