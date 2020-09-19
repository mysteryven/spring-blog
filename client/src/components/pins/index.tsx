import React, {useEffect, useReducer, useState} from "react"
import Pin from "../pin"
import NewPin from "../new-pin"
import "./index.less"
import {Button, Form, Input, Modal, Pagination, Spin, Switch} from "antd"
import {getRequest, patchRequest} from "../../server/request"
import {blog} from "../../server/api"
import {failNotification, successNotification} from "../../utils"
import {layout, tailLayout} from "../login"
import {FormInstance} from "antd/es/form"


interface PinReducerState {
  pageNo: number;
  pageSize: number;
  total: number;
  list: APin[];
  pin: APin;
}

interface PinReducerAction {
  type: string;
  payload: any;
}

export interface APin {
  id: number;
  title: string;
  description: string;
  url: string;
  createdAt: string
  user: {
    username: string
  }
}

const initialState = {
  pageNo: 1,
  pageSize: 6,
  total: 0,
  list: [],
  pin: {}
}


function reducer(state: PinReducerState, action: PinReducerAction) {
  switch (action.type) {
    case "updatePagination":
      return {
        ...state,
        ...action.payload
      }
    case "updateList":
      return {
        ...state,
        list: action.payload
      }
    case "setLoading":
      return {
        ...state,
        loading: action.payload
      }
    case "setCurrentPin":
      return {
        ...state,
        pin: action.payload
      }
    default:
      return state
  }
}

interface PinsProps {
  loginStatus?: boolean;
}

const Pins: React.FC<PinsProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [mode, setMode] = useState<"me" | "all">("all")
  const [visible, setVisible] = useState<boolean>()
  const [form] = Form.useForm();

  useEffect(() => {
    getPins(state.pageNo, state.pageSize)
  }, [])

  useEffect(() => {
    if (mode === "me") {
      getPins(1, state.pageSize, true)
    } else if(mode === 'all') {
      getPins(1, state.pageSize)
   }
  }, [mode])

  async function getPins(pageNo: number, pageSize: number, onlyMine:boolean = false) {
    dispatch({type: "setLoading", payload: true})
    try {
      const res = await getRequest(blog, {pageNo, pageSize, onlyMine})

      dispatch({
        type: "updatePagination",
        payload: {
          pageNo: pageNo,
          total: res.data.total
        }
      })

      dispatch({type: "updateList", payload: res.data.list})
    } catch (e) {
      failNotification("没有权限访问，是不是没有登录？")
    } finally {
      dispatch({type: "setLoading", payload: false})
    }
  }

  function handleSearch(pageNo: number = 1, pageSize: number = 10) {
    getPins(pageNo, pageSize)
  }

  function switchMode(checked: boolean) {
    setMode(checked ? "me" : "all")
  }

  function handleCancel() {
    setVisible(false)
  }

  function onFinish(values: APin) {
    patchRequest(`/blog/${state.pin.id}`, {
      ...values
    }).then(res => {
      console.log(res)
      setVisible(false)
      successNotification("修改成功")
      getPins(1, state.pageSize);
    })
  }

  function handleEditModalVisible(id: number) {
    setVisible(true)
    const pin = state.list.find((pin: APin) => pin.id === id);
    dispatch({
      type: "setCurrentPin",
      payload: pin
    })

    form.setFieldsValue({
      title: pin.title,
      description: pin.description,
      url: pin.url
    })
  }

  return (
    <div className={"pins-wrapper"}>
      <div className={"switch-mode"}>
        {
          props.loginStatus && (
            <Switch checkedChildren={"只看我"} unCheckedChildren={"看全部"} onChange={switchMode}/>
          )
        }
      </div>
      <NewPin/>
      <div className="pins-container">
        {
          state.list.map(function (pin: APin) {
            return (
              <Pin
                mode={mode}
                pin={pin}
                onEditModalVisible={handleEditModalVisible}
                key={pin.id}/>
            )
          })
        }
      </div>
      {state.isLoading && <Spin/>}
      {state.list.length > 0 &&
      <Pagination
          current={state.pageNo}
          pageSize={state.pageSize}
          total={state.total}
          onChange={handleSearch}
      />}
      <Modal
        title="投稿"
        visible={visible}
        footer={null}
        onCancel={handleCancel}
      >
        <Form
          {...layout}
          name="basic"
          form={form}
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
              修改
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  )
}

export default Pins
