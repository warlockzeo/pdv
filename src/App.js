import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';

import Header from './components/Header';
import Routes from './routes';

const App = () => (
  <div className="App">
    <Header />
    <Routes />
  </div>
);

export default App;
