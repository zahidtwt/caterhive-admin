import http from "./http";

export async function getAllDayMenus({ search = "", searchBy = "title" }) {
  try {
    const query = search ? `?searchBy=${searchBy}search=${search}` : "";
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/dayMenus${query}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewDayMenu(newDayMenu) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/dayMenus`,
      newDayMenu
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function deleteDayMenuById(id) {
  try {
    const { data } = await http.delete(
      `${process.env.REACT_APP_API_ENDPOINT}/dayMenus/${id}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}
