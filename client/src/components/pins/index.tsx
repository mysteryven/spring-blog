import React, {useEffect, useReducer, useState} from "react"
import Pin from "../pin"
import NewPin from "../new-pin"
import "./index.less"
import {Pagination, Spin, Switch} from "antd"
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
  pageSize: 6,
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
    case "setLoading":
      return {
        ...state,
        loading: action.payload
      }
    default:
      return state
  }
}

interface PinsProps {
  loginStatus?: boolean;
}

const Pins:React.FC<PinsProps> = (props) => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const [mode, setMode] = useState<"me" | "all">();

  useEffect(() => {
    getPins(state.pageNo, state.pageSize)
  }, [])

  useEffect(() => {
    if (mode === 'me') {

    }
  }, [mode])

  async function getPins(pageNo: number, pageSize: number) {
    dispatch({ type: "setLoading", payload: true })
    try {
      const res = await getRequest(blog, { pageNo, pageSize })

      dispatch({
        type: "updatePagination",
        payload: {
          pageNo: pageNo,
          total: res.data.total
        }
      })

      dispatch({ type: "updateList", payload: res.data.list })
    } catch (e) {
      failNotification("没有权限访问，是不是没有登录？")
    } finally {
      dispatch({ type: "setLoading", payload: false })
    }
  }

  function handleSearch(pageNo: number = 1, pageSize: number = 10) {
    getPins(pageNo, pageSize)
  }

  function switchMode(checked: boolean ) {
    setMode(checked ? "me" : "all");
  }

  return (
    <div className={"pins-wrapper"}>
      <div className={"switch-mode"}>
        <Switch onChange={switchMode} />
        <span>只看我的</span>
      </div>
      <NewPin/>
      <div className="pins-container">
        {
          state.list.map(function (pin: APin) {
            return <Pin mode={"me"} pin={pin} key={pin.id}/>
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
    </div>
  )
}

export default Pins
