import axiosNoAuth from "../axios/axiosNoAuth";
import axiosAuth from "../axios/axiosAuth";

export const loginUser = async (credentials) => {
  try {
    const response = await axiosNoAuth.post('/auth/login', credentials);
    return response.data;
  } catch (error) {
    console.error("Error logging in user:", error);
    return error.response?.data;
  }
};

export const checkToken = async (token) => {
  try {
    const response = await axiosAuth.post('/auth/check', { token });
    return response.data;
  } catch (error) {
    console.error("Token validation failed:", error);
    throw error;
  }
};