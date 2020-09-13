import React, {useEffect, useReducer} from 'react';
import Pin from '../pin';
import NewPin from "../new-pin";
import './index.less';
import {Pagination} from "antd";
import {getRequest} from "../../server/request";
import {blog} from "../../server/api";

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
  user: {
    username: string
  }
}

const initialState = {
  pageNo: 1,
  pageSize: 1,
  total: 0,
  list: []
}


function reducer(state: PinReducerState, action: PinReducerAction) {
  switch (action.type) {
    case 'updatePagination':
      return {
        ...state,
        ...action.payload
      }
    case 'updateList':
      return {
        ...state,
        list: action.payload
      }
    default:
      return state;
  }
}

const Pins = () => {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getPins(state.pageNo, state.pageSize);
  }, [])

  async function getPins(pageNo: number, pageSize: number) {
    const res = await getRequest(blog,{
      pageNo,
      pageSize
    })
    console.log(res);

    dispatch({
      type: 'updatePagination',
      payload: {
        pageNo: pageNo,
        total: res.data.total
      }
    })

    dispatch({
      type: 'updateList',
      payload: res.data.list
    })

    console.log(res);
  }

  function handleSearch(pageNo: number = 1, pageSize: number = 10) {
    getPins(pageNo, pageSize);
  }

  return (
    <div className={"pins-wrapper"}>
      <NewPin/>
      <div className="pins-container">
        {
          state.list.map(function(pin: APin) {
            return <Pin pin={pin} />
          })
        }
      </div>
      <Pagination
        current={state.pageNo}
        pageSize={state.pageSize}
        total={state.total}
        onChange={handleSearch}
      />
    </div>
  )
}

export default Pins;
