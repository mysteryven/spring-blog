import React, {useEffect, useReducer} from "react"
import Pin from "../pin"
import NewPin from "../new-pin"
import "./index.less"
import {Pagination, Spin} from "antd"
import {getRequest} from "../../server/request"
import {blog} from "../../server/api"
import {failNotification} from "../../utils"

interface PinReducerState {
  pageNo: number;
  pageSize: number;
  total: number;
  list: APin[];
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
  pageSize: 10,
  total: 0,
  list: []
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
    default:
      return state
  }
}

const Pins = () => {
  const [state, dispatch] = useReducer(reducer, initialState)

  useEffect(() => {
    getPins(state.pageNo, state.pageSize)
  }, [])

  async function getPins(pageNo: number, pageSize: number) {
    try {
      const res = await getRequest(blog, {
        pageNo,
        pageSize
      })
      console.log(res)

      dispatch({
        type: "updatePagination",
        payload: {
          pageNo: pageNo,
          total: res.data.total
        }
      })

      dispatch({
        type: "updateList",
        payload: res.data.list
      })
    } catch (e) {
      failNotification("没有权限访问，是不是没有登录？")
    }
  }

  function handleSearch(pageNo: number = 1, pageSize: number = 10) {
    getPins(pageNo, pageSize)
  }

  return (
    <div className={"pins-wrapper"}>
      <NewPin/>
      <div className="pins-container">
        {
          state.list.map(function (pin: APin) {
            return <Pin pin={pin} key={pin.id}/>
          })
        }
      </div>
      {state.list.length === 0 && <Spin/>}
      {state.list.length > 0 &&
      <Pagination
          current={state.pageNo}
          pageSize={state.pageSize}
          total={state.total}
          onChange={handleSearch}
      />}
    </div>
  )
}

export default Pins
