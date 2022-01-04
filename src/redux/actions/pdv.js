import { LOGGING, LOGOUT } from '../actionTypes';

export const loginPDV = () => {
  return { type: LOGGING, logged: true };
};

export const logoutPDV = () => {
  return { type: LOGOUT, logged: false };
};
