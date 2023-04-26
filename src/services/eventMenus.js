import http from './http';

export async function getAllEventMenus({ search = '', searchBy = 'title' }) {
  try {
    const query = search ? `?searchBy=${searchBy}search=${search}` : '';
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/eventMenus${query}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewEventMenu(newEventMenu) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/eventMenus`,
      newEventMenu
    );

    return data;
  } catch (error) {
    throw error;
  }
}
