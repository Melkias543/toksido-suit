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




export const getCategory=async()=>{
    try {
        const response =await apiClient.get('/categories/get-all')
        return response.data
       } catch (error) {
        throw error
       }
}

export const favoriteIt = async (rating: any) => {
  // Check if we have both values
  console.log(rating)
  if (!rating.suit_id || !rating.rating) return;

  try {
    
    const response = await apiClient.patch(
      `/rate-suit/${rating.suit_id}`,
      { rating: rating.rating }, // Pass as an object, not a raw number
    );

    return response.data;
  } catch (error) {
    throw error;
  }
};
