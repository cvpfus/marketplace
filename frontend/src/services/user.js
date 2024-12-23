import axios from "axios";

const BASE_URL = "http://localhost:3000/users";

export const registerUser = async ({ name, username, password }) => {
  try {
    const response = await axios.post(`${BASE_URL}/register`, {
      name,
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

export const getUser = async ({ userId, token }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateAddress = async ({ userId, address, token }) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/updateAddress`,
      {
        userId,
        address,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};
