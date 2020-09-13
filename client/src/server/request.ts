import axios from 'axios';

const baseUrl = 'http://localhost:8080';

export const getRequest = async (url: string) => {
  return axios.get(baseUrl + url);
}

export const postRequest = async (url: string, params?: object) => {
  return axios.post(baseUrl + url, params);
}
