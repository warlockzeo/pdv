import React, { useState, useEffect } from 'react';
import ListaProdutos from './ListaProdutos';

const TelaProdutos = () => {
  const [produtos, setProdutos] = useState([]);

  const carregaProdutos = () => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}exibir/produtos/`)
      .then((response) => response.json())
      .then((responseJson) => {
        setProdutos(responseJson);
      });
  };

  const gravar = (produto) => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}gravar/produtos/`, {
      method: 'POST',
      body: JSON.stringify({
        ...produto,
        preco: produto.preco.replace(',', '.')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          carregaProdutos();
        }
      });
  };

  const atualizar = (produto) => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}atualizar/produtos/`, {
      method: 'POST',
      body: JSON.stringify({
        ...produto,
        preco: produto.preco.replace(',', '.')
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        if (responseJson.resp === 'ok') {
          carregaProdutos();
        }
      });
  };

  const excluir = (produto) => {
    if (window.confirm('Confirma exclusão?')) {
      fetch(
        `${process.env.REACT_APP_URLBASEAPI}apagar/produtos/${produto.produto}`
      )
        .then((response) => response.json())
        .then((responseJson) => {
          if (responseJson.resp === 'ok') {
            carregaProdutos();
          }
        });
    }
  };

  useEffect(() => {
    carregaProdutos();
  }, []);

  return (
    <ListaProdutos
      dados={produtos}
      gravar={gravar}
      atualizar={atualizar}
      excluir={excluir}
    />
  );
};

export default TelaProdutos;
