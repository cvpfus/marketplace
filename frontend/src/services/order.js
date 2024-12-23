import axios from "axios";

const BASE_URL = "http://localhost:3000/orders";

export const addOrder = async ({amount, productId, token}) => {
  try {
    const response = await axios.post(BASE_URL, {
      amount,
      productId,
    }, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
}

export const getBuyersOrders = async ({ token }) => {
  try {
    const response = await axios.get(`${BASE_URL}?filterBy=Seller`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const getYourOrders = async ({ token }) => {
  try {
    const response = await axios.get(`${BASE_URL}?filterBy=Buyer`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
};

export const updateOrderStatus = async ({ token, orderId, orderStatus }) => {
  try {
    const response = await axios.patch(
      `${BASE_URL}/orderStatus`,
      {
        id: orderId,
        orderStatus,
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
