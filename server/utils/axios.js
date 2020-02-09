import axios from 'axios'
const instance = axios.create({
  baseURL:`http://${process.env.Host||'localhost'}:${process.env.port||'3000'}`,
  timeout:8000,
  headers:{

  }
})

export default instance
