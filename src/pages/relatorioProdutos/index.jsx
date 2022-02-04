import React, { useState, useEffect } from 'react';
import RelatoriosProdutos from '../../components/RelatoriosProdutos';
import RelatorioBarra from '../../components/RelatorioBarra';

const TelaRelatorioProdutos = () => {
  const [produtos, setProdutos] = useState([]);
  const [datai, setDatai] = useState('');
  const [dataf, setDataf] = useState('');

  const carregaVendas = () => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}relatoriosItensVendidos`, {
      method: 'POST',
      body: JSON.stringify({
        datai,
        dataf
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setProdutos(responseJson);
      });
  };

  useEffect(() => {
    carregaVendas();
  }, [datai, dataf]);

  return (
    <>
      <RelatorioBarra
        datai={datai}
        dataf={dataf}
        mudaDatai={setDatai}
        mudaDataf={setDataf}
      />
      <RelatoriosProdutos dados={produtos} datai={datai} dataf={dataf} />
    </>
  );
};

export default TelaRelatorioProdutos;
