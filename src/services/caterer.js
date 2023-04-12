import http from './http';

export async function getOwnData() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/own`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getCatererById(id) {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
export async function createNewCaterer(newCaterer) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers`,
      newCaterer
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function loginCaterer(email, password) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/login`,
      { email, password }
    );

    localStorage.setItem('token', data);

    return data;
  } catch (error) {
    throw error;
  }
}
