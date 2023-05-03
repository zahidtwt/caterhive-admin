import http from "./http";

export async function getAllMenus(search = "", searchBy = "title") {
  try {
    const query = search ? `?searchBy=${searchBy}search=${search}` : "";
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/menus${query}`
    );

    return data;
  } catch (error) {
    throw error;
  }
}

export async function createNewMenu(newMenu) {
  try {
    const { data } = await http.post(
      `${process.env.REACT_APP_API_ENDPOINT}/menus`,
      newMenu
    );

    return data;
  } catch (error) {
    throw error;
  }
}
