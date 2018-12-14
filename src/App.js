import React, { Component } from 'react';
import { render } from 'react-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

import SearchProdutos from './components/SearchProdutos';

class App extends Component {

  render() {
    return (
      <div>
      <SearchProdutos />
    </div>
    );
  }
}

export default App;
