import apiClient from "../utils/libs/api-client";



export const userRegister =async(data:any)=>{
    try {
     const response =await apiClient.post('auth/register', data)   
     return response.data
    } catch (error) {
     throw error   
    }
}

export const userLogin =async(data:any)=>{
    try {
     const response =await apiClient.post('auth/login', data)
     return response.data
    } catch (error) {
     throw error
    }
}