import http from './http';

export async function getAllEventServices() {
  try {
    const { data } = await http.get(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/own`
    );

    return data.eventService;
  } catch (error) {
    throw error;
  }
}

export async function createNewEventService(eventMenu) {
  try {
    const { data } = await http.put(
      `${process.env.REACT_APP_API_ENDPOINT}/caterers/eventService`,
      eventMenu
    );

    return data;
  } catch (error) {
    throw error;
  }
}
