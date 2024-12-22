import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const registerUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const loginUser = async ({ username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/login`, {
      username,
      password,
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
