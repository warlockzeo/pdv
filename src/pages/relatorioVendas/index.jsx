import React, { useState, useEffect } from 'react';
import RelatorioVendas from '../../components/RelatorioVendas';
import RelatorioBarra from '../../components/RelatorioBarra';

const TelaRelatorioVendas = () => {
  const [vendas, setVendas] = useState([]);
  const [datai, setDatai] = useState('');
  const [dataf, setDataf] = useState('');

  const carregaVendas = () => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}exibir/vendas/`, {
      method: 'POST',
      body: JSON.stringify({
        datai,
        dataf
      })
    })
      .then((response) => response.json())
      .then((responseJson) => {
        setVendas(responseJson);
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
      <RelatorioVendas dados={vendas} datai={datai} dataf={dataf} />
    </>
  );
};

export default TelaRelatorioVendas;
