import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL;

const handleResponseError = (error) => {
  if (error.response?.status === 401) {
    // Token invalid sau expirat
    localStorage.removeItem('token')
    window.location.href = '/login'
  }
  return Promise.reject(error)
}

export const axiosAuth = axios.create({
  baseURL: API_URL,
})

axiosAuth.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers.Authorization = `Bearer ${token}`
    }
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

axiosAuth.interceptors.response.use(
  (response) => response,
  handleResponseError
)

export default axiosAuth