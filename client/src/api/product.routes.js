import axiosNoAuth from "../axios/axiosNoAuth";
import axiosAuth from "../axios/axiosAuth";

export const fetchProducts = async () => {
  try {
    const response = await axiosNoAuth.get('products');
    return response.data;
  } catch (error) {
    console.error("Error fetching products:", error);
    return error.response?.data;
  }
};

export const getProductById = async (id) => {
  try {
    const response = await axiosNoAuth.get(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching product:", error);
    return error.response?.data;
  }
};

export const createProduct = async (productData) => {
  try {
    const response = await axiosAuth.post('products', productData);
    return response.data;
  } catch (error) {
    console.error("Error creating product:", error);
    return error.response?.data;
  }
};

export const updateProduct = async (id, productData) => {
  try {
    const response = await axiosAuth.put(`products/${id}`, productData);
    return response.data;
  } catch (error) {
    console.error("Error updating product:", error);
    return error.response?.data;
  }
};

export const deleteProduct = async (id) => {
  try {
    const response = await axiosAuth.delete(`products/${id}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting product:", error);
    return error.response?.data;
  }
};