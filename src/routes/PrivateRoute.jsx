import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

const PrivateRoute = () => {
  const loggedSession = sessionStorage.getItem('login');
  const loggedRedux = useSelector((state) => state?.pdv?.logged);
  const auth = loggedSession || loggedRedux ? true : false; // determine if authorized, from context or however you're doing it

  // If authorized, return an outlet that will render child elements
  // If not, return element that will navigate to login page
  return auth ? <Outlet /> : <Navigate to='/login' />;
};

export default PrivateRoute;
