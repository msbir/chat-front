import axios from 'axios'
import store from '../store/index'
import {reinstallApp} from "./reinstallApp";
import { checkUpdates } from "./checkUpdates";

const API_URL = process.env.API_URL

let axiosInstance = axios.create({
  baseURL: API_URL
})

axiosInstance.interceptors.request.use(function (config) {
  config.headers.Authorization = `Bearer ${store.getters.token}`;
  config.headers['X-Socket-ID'] = localStorage.getItem('socket_id');
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})

// Add a response interceptor
axiosInstance.interceptors.response.use(function (response) {
  // Do something with response data
  if (response && response.data.version) {
      checkUpdates(response.data.version);
  }

  if (response && response.data) {
    response = response.data;
  }
  return response
}, function (error) {
  // Do something with response error
  if (error && error.response.data) {
    error = error.response.data;
  }
  if(error.data.message === "User not found"){
    reinstallApp();
  }
  return Promise.reject(error)
})

class HttpRequest {
  constructor () {
    this.axios = axios
  }

  fetch (methodName, data) {
    return axiosInstance.get(methodName, {
      params: data
    })
  }

  create (methodName, data) {
    return axiosInstance.post(methodName, data)
  }

  update (methodName, data) {
    return axiosInstance.put(methodName, data)
  }

  delete (methodName, id) {
    return axiosInstance.delete(methodName, { params: {id: id} })
  }

  request (type, url, data) {
    let promise = null
    switch (type) {
      case 'GET': promise = axios.get(url, { params: data }); break
      case 'POST': promise = axios.post(url, data); break
      case 'PUT': promise = axios.put(url, data); break
      case 'DELETE': promise = axios.delete(url, data); break
      default : promise = axios.get(url, { params: data }); break
    }
    return promise
  }
}

export default HttpRequest
