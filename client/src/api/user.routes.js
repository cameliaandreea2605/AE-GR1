import axiosAuth from "../axios/axiosAuth";
import axiosNoAuth from "../axios/axiosNoAuth";

export const registerUser = async (userData) => {
  try {
    const response = await axiosNoAuth.post('/users', userData);
    return response.data;
  } catch (error) {
    console.error("Error registering user:", error);
    return error.response?.data;
  }
};

export const getProfile = async () => {
  try {
    const response = await axiosAuth.get('/users/profile');
    return response.data;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return error.response?.data;
  }
}