import http from './http';

export async function getAllCategories() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/category`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
