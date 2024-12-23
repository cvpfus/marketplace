import axios from "axios";

const BASE_URL = "http://localhost:3000/products";

export const addProduct = async ({
  name,
  description,
  price,
  dataUrl,
  token,
}) => {
  try {
    const response = await axios.post(
      `${BASE_URL}`,
      {
        name,
        description,
        price,
        dataUrl,
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

export const getProduct = async ({ productRecordId }) => {
  try {
    const response = await axios.get(`${BASE_URL}/${productRecordId}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getProducts = async () => {
  try {
    const response = await axios.get(`${BASE_URL}`);

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getProductsByOwner = async ({ userRecordId, token }) => {
  try {
    const response = await axios.get(`${BASE_URL}?ownerId=${userRecordId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateProduct = async ({
  productRecordId,
  name,
  description,
  price,
  token,
}) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/${productRecordId}`,
      {
        name,
        description,
        price,
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

export const deleteProduct = async ({ productRecordId, imageUrl, token }) => {
  try {
    const response = await axios.delete(
      `${BASE_URL}/${productRecordId}?imageUrl=${imageUrl}`,
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
