import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { useDispatch } from 'react-redux';

import Theme from './Theme';
import MyRoutes from './routes';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="app">
      <Theme>
        <BrowserRouter>
          <Header />
          <MyRoutes />
        </BrowserRouter>
      </Theme>
    </div>
  );
};

export default App;
