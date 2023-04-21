import http from './http';

export async function getOrderById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/orders/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getOwnOrder() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/orders/caterers`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function updateOrderById(id, creds) {
  try {
    const { data } = await http.put(
      `${process.env.REACT_APP_API_ENDPOINT}/orders/${id}`,
      creds
    );

    return data;
  } catch (error) {
    throw error;
  }
}
