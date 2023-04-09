import {GET_ALL_PROS, SET_USER} from './actionTypes';

export const setUser = payload => async dispatch => {
  dispatch({
    type: SET_USER,
    payload: payload,
  });
};
export const getAllPros = payload => async dispatch => {
  dispatch({
    type: GET_ALL_PROS,
    payload: payload,
  });
};
