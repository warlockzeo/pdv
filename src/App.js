import React from 'react';
import { BrowserRouter } from 'react-router-dom';
//import { useDispatch } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';

//import Theme from './Theme';
import Header from './components/Header';
import MyRoutes from './routes';

const App = () => {
  return (
    <div className="app">
      {/* <Theme> */}
      <Header />
      <BrowserRouter>
        <MyRoutes />
      </BrowserRouter>
      {/* </Theme> */}
    </div>
  );
};

export default App;
