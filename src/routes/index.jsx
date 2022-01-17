import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PrivateRoute from './PrivateRoute';

//import Home from '../pages/Home';
import Main from '../pages/Main';
import TelaClientes from '../pages/clientes';
import TelaProdutos from '../pages/produtos';
import TelaRelatorioVendas from '../pages/relatorioVendas';
import TelaRelatorioProdutos from '../pages/relatorioProdutos';
import TelaRelatorioDevedores from '../pages/relatorioDevedores';
import FechamentoCaixa from '../pages/fechamentoCaixa';
import Pdv from '../pages/pdv';
import Login from '../pages/Login';

const MyRoutes = () => (
  <Routes>
    <Route path='/login' element={<Login />} />
    <Route exact path='/' element={<PrivateRoute />}>
      <Route exact path='/' element={<Main />} />
      <Route path='/fechamentoCaixa' element={<FechamentoCaixa />} />
      <Route path='/relatorioDevedores' element={<TelaRelatorioDevedores />} />
      <Route path='/relatorioVendas' element={<TelaRelatorioVendas />} />
      <Route path='/relatorioProdutos' element={<TelaRelatorioProdutos />} />
      <Route path='/clientes' element={<TelaClientes />} />
      <Route path='/produtos' element={<TelaProdutos />} />
      <Route path='/pdv' element={<Pdv />} />
    </Route>
  </Routes>
);

export default MyRoutes;
