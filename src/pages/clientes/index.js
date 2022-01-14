import React, { useState, useEffect } from 'react';
import ListaClientes from './ListaClientes';
import HistoricoCliente from './HistoricoCliente';

const TelaClientes = () => {
  const [clientes, setClientes] = useState([]);
  const [historico, setHistorico] = useState([]);
  const [clienteAtual, setClienteAtual] = useState('');
  const [historicoOpen, setHistoricoOpen] = useState(false);
  const [itensVenda, setItensVenda] = useState('');

  const carregaClientes = () => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}exibir/clientes/`)
      .then((response) => response.json())
      .then((responseJson) => {
        setClientes(responseJson);
      });
  };

  const getHistorico = (cliente) => {
    fetch(`http://pdv/historico/vendas/${cliente.cliente.id}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setHistoricoOpen(true);
        setClienteAtual(cliente.cliente);
        setHistorico(responseJson);
      });
  };

  const getItensVenda = (venda) => {
    fetch(`http://pdv/exibirItensVendidos/${venda}`)
      .then((response) => response.json())
      .then((responseJson) => {
        setItensVenda(responseJson);
      });
  };

  const gravar = (cliente) => {
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
          carregaClientes();
        }
      });
  };

  const atualizar = (cliente) => {
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
          carregaClientes();
        }
      });
  };

  const excluir = (cliente) => {
    if (window.confirm('Confirma exclusão?')) {
      fetch(`http://pdv/apagar/clientes/${cliente.cliente}`)
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            carregaClientes();
          }
        });
    }
  };

  const atualizaSaldo = (retorno) => {
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
          carregaClientes();
        }
      });
  };

  const lista = () => {
    setHistoricoOpen(false);
  };

  useEffect(() => {
    carregaClientes();
  }, []);

  const mostra = historicoOpen ? (
    <HistoricoCliente
      cliente={clienteAtual}
      historico={historico}
      itensVenda={itensVenda}
      mostraItens={getItensVenda}
      voltar={lista}
    />
  ) : (
    <ListaClientes
      dados={clientes}
      gravar={gravar}
      atualizar={atualizar}
      excluir={excluir}
      historico={getHistorico}
      atualizaSaldo={atualizaSaldo}
    />
  );

  return <div className='tela-clientes'>{mostra}</div>;
};

export default TelaClientes;
