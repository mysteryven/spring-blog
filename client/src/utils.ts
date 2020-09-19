import {message} from "antd"
import {AxiosResponse} from "axios"

message.config({
  duration: 1.5,
});

export const successNotification = (description: string, msg?: string) => {
  message.success(description);
}

export const failNotification = (description: string, msg?: string) => {
  message.error(description)
}


export interface Res {
  msg: string;
  data: object;
  status: "fail" | "ok"
}

interface PrimaryTypeObject {
  [key: string]: any;
}

export function getRandomInt(max: number) {
  return Math.floor(Math.random() * Math.floor(max))
}

type Callback = (msg: string) => void

export function handleResult(res: AxiosResponse<Res>, success: Callback, fail?: Callback) {
  if (res.data.status === "ok") {
    success(res.data.msg)
  } else if (res.data.status === "fail") {
    fail && fail(res.data.msg)
  }
}

export function beQueryString(obj: PrimaryTypeObject, prefix: string = "?"): string {
  const keys = Object.keys(obj)
  if (keys.length === 0) {
    return ""
  }
  return keys.reduce((prev, cur, index) => {
    let connector = ""
    if (index !== 0) {
      connector = "&"
    }
    return `${prev}${connector}${cur}=${obj[cur]}`
  }, prefix)
}

