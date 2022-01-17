import React, { Component, Fragment } from 'react';
import RelatoriosProdutos from '../../components/RelatoriosProdutos';
import RelatorioBarra from '../../components/RelatorioBarra';

export default class TelaRelatorioProdutos extends Component {
  state = {
    produtos: [],
    datai: '',
    dataf: ''
  };

  carregaVendas() {
    fetch(`${process.env.REACT_APP_URLBASEAPI}relatoriosItensVendidos`, {
      method: 'POST',
      body: JSON.stringify({
        datai: this.state.datai,
        dataf: this.state.dataf
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          produtos: responseJson
        });
      });
  }

  mudaDatai = async (data) => {
    await this.setState({
      datai: data
    });
    this.carregaVendas();
  };

  mudaDataf = async (data) => {
    await this.setState({
      dataf: data
    });
    this.carregaVendas();
  };

  componentDidMount() {
    this.carregaVendas();
  }

  render() {
    return (
      <Fragment>
        <RelatorioBarra
          datai={this.state.datai}
          dataf={this.state.dataf}
          mudaDatai={this.mudaDatai}
          mudaDataf={this.mudaDataf}
        />
        <RelatoriosProdutos
          dados={this.state.produtos}
          datai={this.state.datai}
          dataf={this.state.dataf}
        />
      </Fragment>
    );
  }
}
