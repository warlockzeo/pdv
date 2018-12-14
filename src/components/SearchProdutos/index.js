import React, { Component } from 'react';
import Autocomplete from '../Autocomplete';

class SearchProdutos extends Component {
    state = {
        produtos: []
    };

    componentDidMount() {
        this.loadProducts();
    }

    loadProducts = async () => {
        /*const response = await Api.get(`/produtos`);

        this.setState({produtos : response.data});*/

        this.setState({ produtos : [
            "Alligator",
            "Bask",
            "Crocodilian",
            "Death Roll",
            "Eggs",
            "Jaws",
            "Reptile",
            "Solitary",
            "Tail",
            "Wetlands"
          ]
        });
    };

  render() {
    return (
      <div>
      <Autocomplete
        suggestions={this.state.produtos}
      />
    </div>
    );
  }
}

export default SearchProdutos;
