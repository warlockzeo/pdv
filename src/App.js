import React from 'react';
import { BrowserRouter } from 'react-router-dom';
import { useSelector } from 'react-redux';

import MyRoutes from './routes';
import Header from './components/Header';
import { App as S } from './AppStyles';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const loggedSession = sessionStorage.getItem('login');
  const loggedRedux = useSelector((state) => state?.pdv?.logged);
  const isLogged = loggedSession || loggedRedux ? true : false;

  return (
    <S.wrap isLogged={isLogged.toString()}>
      <BrowserRouter>
        {isLogged && <Header />}
        <MyRoutes />
      </BrowserRouter>
    </S.wrap>
  );
};

export default App;
