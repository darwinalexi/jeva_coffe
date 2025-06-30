import axios from 'axios'
import { baseurl } from './data'



const axiosClient = axios.create({
    baseURL: baseurl
})

axiosClient.interceptors.request.use((request) => {
    const token = localStorage.getItem('token')
    request.headers['token'] = token
    return request
})

axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log("error", error);
    return Promise.reject(error);  // Propaga el error para manejarlo después
  }
);


export default axiosClient