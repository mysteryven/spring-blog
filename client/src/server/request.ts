import axios from 'axios';
import {beQueryString} from "../utils";

const baseUrl = 'http://localhost:8080';

export const getRequest = async (url: string, params: object = {}) => {
  return axios.get(baseUrl + url + beQueryString(params)  );
}

export const postRequest = async (url: string, params?: object) => {
  return axios.post(baseUrl + url, params);
}
