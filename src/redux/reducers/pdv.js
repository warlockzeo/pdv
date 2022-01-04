import { LOGGING, LOGOUT } from '../actionTypes';

export const initialState = { logged: false };

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case LOGGING:
      return { logged: true };
    case LOGOUT:
      return { logged: false };
    default:
      return state;
  }
};

export default reducer;
