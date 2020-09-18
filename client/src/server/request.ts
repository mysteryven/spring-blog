import axios from "axios"
import {beQueryString} from "../utils"

// const baseUrl = "http://47.98.241.215:8080"
// const baseUrl = "http://192.168.0.143:8080"
const baseUrl = "http://localhost:8080"

export const getRequest = async (url: string, params: object = {}) => {
  return axios.get(baseUrl + url + beQueryString(params))
}

export const postRequest = async (url: string, params?: object) => {
  return axios.post(baseUrl + url, params)
}

export const deleteRequest = (url: string, params: object = {}) => {
  return axios.delete(baseUrl + url + beQueryString(params))
}

export const patchRequest = (url: string, params: object = {}) => {
  return axios.patch(baseUrl + url, params)
}

