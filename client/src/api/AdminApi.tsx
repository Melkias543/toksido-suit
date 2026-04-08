import apiClient from "../utils/libs/api-client";

export const createCategory = async (categoryData: any) => {
  try {
    console.log(apiClient);
    const response = await apiClient.post("/categories/create", categoryData);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
}


export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/categories/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
}
// suits;

export const createProduct = async (productData: any) => {
  try {
    console.log("API Client in createProduct:", productData);
    const response = await apiClient.post("/products/create", productData , {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
}
//Get all products
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/products/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}