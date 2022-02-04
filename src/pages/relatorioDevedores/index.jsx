import React, { useState, useEffect } from 'react';
import RelatorioDevedores from '../../components/RelatorioDevedores';

import './styles.css';

const TelaRelatorioDevedores = () => {
  const [devedores, setDevedores] = useState([]);

  const carregaDevedores = () => {
    fetch(`${process.env.REACT_APP_URLBASEAPI}devedores`)
      .then((response) => response.json())
      .then((responseJson) => {
        setDevedores(responseJson);
      });
  };

  useEffect(() => {
    carregaDevedores();
  }, []);

  return <RelatorioDevedores dados={devedores} />;
};

export default TelaRelatorioDevedores;
