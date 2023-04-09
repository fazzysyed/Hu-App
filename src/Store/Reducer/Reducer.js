import {GET_ALL_PROS, SET_USER} from '../Actions/actionTypes';

const initialState = {
  user: null,
  pros: [],
};
const Reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case GET_ALL_PROS:
      return {
        ...state,
        pros: payload,
      };

    default:
      return state;
  }
};
export default Reducer;
