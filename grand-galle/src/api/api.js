import axios from "axios"

const API = axios.create({
  baseURL: "http://localhost:8080/api"
})

//run this before every request
// config could be url, method, data, headers, etc
API.interceptors.request.use((config) => {

  //get token from local storage
  const token = localStorage.getItem("token")

  //add request header with the token if it exists
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
  
 /*  {
  url: "/users",
  method: "get",
  baseURL: "http://localhost:8080/api",
  headers: {},
  data: null

} */
})

export default API