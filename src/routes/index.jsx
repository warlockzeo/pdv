import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//import Home from '../pages/Home';
import Main from '../pages/main';
import TelaClientes from '../pages/clientes';
import TelaProdutos from '../pages/produtos';
import TelaRelatorioVendas from '../pages/relatorioVendas';
import TelaRelatorioProdutos from '../pages/relatorioProdutos';
import TelaRelatorioDevedores from '../pages/relatorioDevedores';
import FechamentoCaixa from '../pages/fechamentoCaixa';
import Pdv from '../pages/pdv';
import Login from '../pages/Login';
//import NoMatchPage from '../pages/NotMatchPage';

const MyRoutes = () => (
  <Routes>
    <Route exact path="/" element={<Main />} />
    <Route path="/login" element={<Login />} />
    <Route path="/fechamentoCaixa" element={<FechamentoCaixa />} />
    <Route path="/relatorioDevedores" element={<TelaRelatorioDevedores />} />
    <Route path="/relatorioVendas" element={<TelaRelatorioVendas />} />
    <Route path="/relatorioProdutos" element={<TelaRelatorioProdutos />} />
    <Route exact path="/clientes" element={<PrivateRoute />}>
      <Route path="/clientes" element={<TelaClientes />} />
    </Route>
    <Route path="/produtos" element={<TelaProdutos />} />
    <Route path="/pdv" element={<Pdv />} />
    {/* <Route element={<NoMatchPage />} /> */}
  </Routes>
);

export default MyRoutes;
