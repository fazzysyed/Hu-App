import axios from 'axios';
import {BASE_URL} from '../Api/BaseUrl';
import store from '../Store/store';

export const handleAPIRequest = async (method, url, data) => {
  const state = store.getState().Reducer;
  console.warn('Ga;lsjfkalkjfalskj', state);
  let header = null;

  if (method === 'post') {
    header = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${state.user && state.user.token}`,
    };
  } else {
    header = {
      Authorization: `Bearer ${state.user && state.user.token}`,
    };
  }
  try {
    const response = await axios({
      method: method,
      url: `${BASE_URL}${url}`,
      headers: header,
      data: data,
    });
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error(error);
  }
};
