import axios from 'axios'
import { getToken } from '../services/auth.service'
const axiosInstance = axios.create({
    baseURL: 'http://localhost:4000/api/',
    timeout: 5000,
    timeoutErrorMessage: 'Operation timed out'
})

axiosInstance.interceptors.request
    .use(
        (config) => {
            config.headers = {
                'Content-Type': 'application/json',
                'Accept': 'application/json',
                'Authorization': `Bearer ${getToken()}`
            }
            return config
        },
        (err) => {
            Promise.reject(err)
        }
    )
export default axiosInstance