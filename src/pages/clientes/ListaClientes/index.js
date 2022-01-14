import React, { Component, Fragment } from 'react';
import AddSearchBar from '../../../components/AddSearchBar';
import Clientes from '../Clientes';

import FormClientes from '../../../components/FormClientes';
import FormPagar from '../../../components/FormPagar';

import './styles.css';

class ListaClientes extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isFormPagarOpen: false,
      typeForm: '',
      clientes: [],
      clientesAtuais: [],
      clienteAtual: {}
    };
  }

  busca = (e) => {
    const clientes = this.props.dados.filter(
      (cliente) =>
        cliente.nome
          .toLowerCase()
          .indexOf(e.currentTarget.value.toLowerCase()) > -1
    );
    this.setState({
      clientesAtuais: clientes
    });
  };

  onClickNovo = () => {
    this.setState({
      typeForm: 'novo',
      isFormPagarOpen: false,
      clienteAtual: {}
    });
    document.querySelector('form').reset();
  };

  onClickPagar = (cliente) => {
    this.setState({ isFormPagarOpen: true, clienteAtual: cliente });
  };

  gravar = (cliente) => {
    this.props.gravar(cliente);
  };

  atualizar = (cliente) => {
    this.props.atualizar(cliente);
  };

  excluir = (cliente) => {
    this.props.excluir(cliente);
  };

  historico = (cliente) => {
    this.props.historico(cliente);
  };

  atualizaSaldo = (retorno) => {
    this.props.atualizaSaldo(retorno);
  };

  render() {
    const clienteGet = (retorno) => {
      this.setState({
        clienteAtual: retorno.cliente,
        typeForm: retorno.status
      });
    };

    const mostraFormClientes =
      this.state.typeForm === 'novo' ? (
        <FormClientes
          titulo='Novo cliente'
          callbackParent={this.gravar}
          typeForm='novo'
        />
      ) : (
        <FormClientes
          titulo='Detalhes do cliente'
          callbackParent={this.atualizar}
          dados={this.state.clienteAtual}
          typeForm='update'
        />
      );

    const mostraFormPagar = this.state.isFormPagarOpen && (
      <FormPagar
        atualizaSaldo={this.atualizaSaldo}
        cliente={this.state.clienteAtual.cliente}
      />
    );

    const lista = this.state.clientesAtuais.length
      ? this.state.clientesAtuais
      : this.props.dados;
    const listaClientes = lista.map((cliente) => (
      <Fragment key={cliente.id}>
        <tr onMouseOver={() => this.setState({ clienteAtual: cliente })}>
          <Clientes
            cliente={cliente}
            historico={this.historico}
            callbackParent={(cliente) => clienteGet(cliente)}
            excluir={this.excluir}
            pagar={(cliente) => this.onClickPagar(cliente)}
          />
        </tr>
      </Fragment>
    ));

    return (
      <>
        <AddSearchBar busca={this.busca} onClickNovo={this.onClickNovo} />
        <table className='table-clientes table table-sm table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Nome</th>
              <th className='d-xs-none'>Telefone</th>
              <th className='d-xs-none'>Saldo</th>
              <th></th>
            </tr>
          </thead>
          <tbody>{listaClientes}</tbody>
        </table>
        {mostraFormClientes}
        {mostraFormPagar}
      </>
    );
  }
}

export default ListaClientes;
