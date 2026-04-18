import { tr } from "zod/locales";
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
};

export const getAllCategories = async () => {
  try {
    const response = await apiClient.get("/categories/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching categories:", error);
    throw error;
  }
};
// suits;

export const createProduct = async (productData: any) => {
  try {
    console.log("API Client in createProduct:", productData);
    const response = await apiClient.post("/products/create", productData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    throw error;
  }
};
//Get all products
export const getAllProducts = async () => {
  try {
    const response = await apiClient.get("/products/get-all");
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};

export const updateProduct = async (id: String, data: any) => {
  try {
    // products;
    const resp = await apiClient.put(`/products/${id}`, data, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    return resp;
  } catch (error) {
    throw error;
  }
};

export const deleteProduct = async (id: String) => {
  try {
    const res = await apiClient.delete(`/products/${id}`);
    return res;
  } catch (err) {
    console.error(err);

    throw err;
  }
};

export const createServices = async (data: any) => {
  try {
    const response = await apiClient.post("/service/create", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//UPDATE SERVICES

export const updateServices = async (data: any, id: String) => {
  try {
    console.log("data and id", data, id);
    const response = await apiClient.put(`/service/${id}`, data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET ALL SERVICES

export const getAllServices = async () => {
  try {
    const response = await apiClient.get("/service/get-all");
    return response.data;
  } catch (error) {
    throw error;
  }
};

//GET SINGLE SERVICES

export const getSingleServices = async (id: string) => {
  try {
    const response = await apiClient.get(`/service/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};

// DELETE SERVICES
export const deleteServices = async (id: String) => {
  try {
    const response = await apiClient.delete(`/service/${id}`);

    return response.data;
  } catch (error) {
    throw error;
  }
};

export const countUser = async () => {
  try {
    const response = await apiClient.get("/admin-utils/user-count");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const countSuit = async () => {
  try {
    const response = await apiClient.get("/admin-utils/suit-count");
    return response.data;
  } catch (error) {
    console.error("Error fetching dashboard stats:", error);
    throw error;
  }
};

export const getAllUser = async () => {
  try {
    const response = await apiClient.get("/admin-utils/all-user");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getAllROle = async () => {
  try {
    const reponse = await apiClient.get("/admin-utils/get-role");
    return reponse.data;
  } catch (error) {
    throw error;
  }
};

export const addUserByAdmin = async (data: any) => {
  try {
    const response = await apiClient.post("/admin-utils/create-user", data);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (id: string) => {
  try {
    const response = await apiClient.delete(`/admin-utils/delete-user/${id}`);
    return response.data;
  } catch (error) {
    throw error;
  }
};
