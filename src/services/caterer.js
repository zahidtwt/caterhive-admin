import axios from 'axios';

export async function createNewCaterer(newCaterer) {
  try {
    const allAreas = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers`,
      newCaterer
    );

    return allAreas.data;
  } catch (error) {
    throw error;
  }
}

export async function loginCaterer(email, password) {
  try {
    const { data } = await axios.post(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers`,
      { email, password }
    );

    return data;
  } catch (error) {
    throw error;
  }
}
