import http from './http';

export async function getAllFoodItems({ search = '', searchBy = 'title' }) {
  try {
    const query = search ? `?searchBy=${searchBy}search=${search}` : '';
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/foodItems${query}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function getAllFoodItemsByCategory({
  search = '',
  searchBy = 'title',
  category,
  caterer,
}) {
  try {
    const query = search ? `&searchBy=${searchBy}search=${search}` : '';
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/foodItems/category?caterer=${caterer}&categoryName=${category}${query}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewFoodItem(newFoodItem) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/foodItems`,
      newFoodItem
    );

    return data;
  } catch (error) {
    throw error;
  }
}
