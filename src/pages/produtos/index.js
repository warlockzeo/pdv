import React, { Component } from 'react';
import ListaProdutos from '../../components/ListaProdutos';

class TelaProdutos extends Component {
  state = {
    produtos: []
  };

  carregaProdutos() {
    fetch(`${process.env.REACT_APP_URLBASEAPI}exibir/produtos/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          produtos: responseJson
        });
      });
  }

  componentDidMount() {
    this.carregaProdutos();
  }

  gravar = (produto) => {
    fetch(`http://pdv/gravar/produtos/`, {
      method: 'POST',
      body: JSON.stringify({
        ...produto,
        preco: produto.preco.replace(',', '.')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          this.carregaProdutos();
        }
      });
  };

  atualizar = (produto) => {
    fetch(`http://pdv/atualizar/produtos/`, {
      method: 'POST',
      body: JSON.stringify({
        ...produto,
        preco: produto.preco.replace(',', '.')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          this.carregaProdutos();
        }
      });
  };

  excluir = (produto) => {
    if (window.confirm('Confirma exclusão?')) {
      fetch(`http://pdv/apagar/produtos/${produto.produto}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            this.carregaProdutos();
          }
        });
    }
  };

  render() {
    return (
      <div className='tela-produtos'>
        <ListaProdutos
          dados={this.state.produtos}
          gravar={this.gravar}
          atualizar={this.atualizar}
          excluir={this.excluir}
        />
      </div>
    );
  }
}

export default TelaProdutos;
