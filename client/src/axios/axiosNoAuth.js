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

export const axiosNoAuth = axios.create({
  baseURL: API_URL,
})

axiosNoAuth.interceptors.response.use(
  (response) => response,
  handleResponseError
)

export default axiosNoAuth