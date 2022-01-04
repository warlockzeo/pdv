import React from 'react';
import { Provider } from 'react-redux';
import store from './redux';

import { BrowserRouter } from 'react-router-dom';

import Theme from './Theme';
import MyRoutes from './routes';
import Header from './components/Header';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <Provider store={store}>
      <div className="app">
        <Theme>
          <BrowserRouter>
            <Header />
            <MyRoutes />
          </BrowserRouter>
        </Theme>
      </div>
    </Provider>
  );
};

export default App;
