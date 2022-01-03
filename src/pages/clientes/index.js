import React, { Component } from 'react';
import ListaClientes from '../../components/ListaClientes';
import HistoricoCliente from '../../components/HistoricoCliente';
class TelaClientes extends Component {
  state = {
    clientes: [],
    historicoOpen: false
  };

  carregaClientes() {
    fetch(`${process.env.REACT_APP_URLBASEAPI}exibir/clientes/`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          clientes: responseJson
        });
      });
  }

  historico = (cliente) => {
    fetch(`http://pdv/historico/vendas/${cliente.cliente.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          historicoOpen: true,
          clienteAtual: cliente.cliente,
          historico: responseJson
        });
      });
  };

  itensVenda = (venda) => {
    fetch(`http://pdv/exibirItensVendidos/${venda}`)
      .then((response) => response.json())
      .then((responseJson) => {
        this.setState({
          itensVenda: responseJson
        });
      });
  };

  componentDidMount() {
    this.carregaClientes();
  }

  gravar = (cliente) => {
    fetch(`http://pdv/gravar/clientes/`, {
      method: 'POST',
      body: JSON.stringify({
        nome: cliente.nome,
        endereco: cliente.endereco,
        cpf: cliente.cpf,
        rg: cliente.rg,
        fone: cliente.fone,
        saldo: cliente.saldo.replace(',', '.'),
        dataSaldo: cliente.dataSaldo,
        complemento: cliente.complemento
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          this.carregaClientes();
        }
      });
  };

  atualizar = (cliente) => {
    fetch(`http://pdv/atualizar/clientes/`, {
      method: 'POST',
      body: JSON.stringify({
        id: cliente.id,
        nome: cliente.nome,
        endereco: cliente.endereco,
        cpf: cliente.cpf,
        rg: cliente.rg,
        fone: cliente.fone,
        saldo: cliente.saldo.replace(',', '.'),
        dataSaldo: cliente.dataSaldo,
        complemento: cliente.complemento
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          this.carregaClientes();
        }
      });
  };

  excluir = (cliente) => {
    if (window.confirm('Confirma exclusão?')) {
      fetch(`http://pdv/apagar/clientes/${cliente.cliente}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            this.carregaClientes();
          }
        });
    }
  };

  atualizaSaldo = (retorno) => {
    fetch(`http://pdv/gravar/vendas/`, {
      method: 'POST',
      body: JSON.stringify({
        cliente: retorno.cliente.id,
        pago: retorno.valor,
        formaPg: 'Dinheiro',
        operacao: 'Pagamento'
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {});

    fetch(`http://pdv/atualizaSaldo/`, {
      method: 'POST',
      body: JSON.stringify({
        id: retorno.cliente.id,
        saldo: -retorno.valor
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          this.carregaClientes();
        }
      });
  };

  lista = () => {
    this.setState({
      historicoOpen: false
    });
  };

  render() {
    const mostra = this.state.historicoOpen ? (
      <HistoricoCliente
        cliente={this.state.clienteAtual}
        historico={this.state.historico}
        itensVenda={this.state.itensVenda}
        mostraItens={this.itensVenda}
        voltar={this.lista}
      />
    ) : (
      <ListaClientes
        dados={this.state.clientes}
        gravar={this.gravar}
        atualizar={this.atualizar}
        excluir={this.excluir}
        historico={this.historico}
        atualizaSaldo={this.atualizaSaldo}
      />
    );

    return <div className="tela-clientes col-md-12">{mostra}</div>;
  }
}

export default TelaClientes;
