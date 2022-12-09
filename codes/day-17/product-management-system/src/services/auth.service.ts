import axiosInstance from "../config/axios.config";
import { ApiResponse } from "../models/api-response.model";
import { User } from "../models/user.model";

export const saveToken = (token: string) => {
    sessionStorage.setItem('token', token)
}
export const isLoggedIn = () => {
    return sessionStorage.getItem('token') ? true : false
}
export const deleteToken = () => {
    sessionStorage.removeItem('token')
}
export const getToken = () => {
    return sessionStorage.getItem('token')
}
export const register = (user: User) => {
    return axiosInstance.post<ApiResponse<User>>(`auth/register`, user)
}
export const login = (user: User) => {
    return axiosInstance.post<ApiResponse<string>>(`auth/login`, user)
}