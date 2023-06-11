import {
  APPLOADING,
  GET_ALL_PROS,
  LOGOUT,
  SET_USER,
} from '../Actions/actionTypes';

const initialState = {
  user: null,
  pros: [],
  appLoading: false,
};
const Reducer = (state = initialState, action) => {
  const {type, payload} = action;

  switch (type) {
    case SET_USER:
      return {
        ...state,
        user: payload,
      };
    case LOGOUT:
      return {
        ...state,
        user: payload,
      };
    case GET_ALL_PROS:
      return {
        ...state,
        pros: payload,
      };
    case APPLOADING:
      return {
        ...state,
        appLoading: payload,
      };
    default:
      return state;
  }
};
export default Reducer;
