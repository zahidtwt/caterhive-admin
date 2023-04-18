import http from './http';

export async function getAllRoutineMenus() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/own`
    );

    return data.weekMenu;
  } catch (error) {
    throw error;
  }
}

export async function createNewRoutineMenu(dayMenu) {
  try {
    const { data } = await http.put(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/dayMenu`,
      dayMenu
    );

    return data;
  } catch (error) {
    throw error;
  }
}
