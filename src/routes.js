import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import TelaClientes from './pages/clientes';
import TelaProdutos from './pages/produtos';
import TelaRelatorioVendas from './pages/relatorioVendas';
import TelaRelatorioProdutos from './pages/relatorioProdutos';
import TelaRelatorioDevedores from './pages/relatorioDevedores';
import FechamentoCaixa from './pages/fechamentoCaixa';
import Pdv from './pages/pdv';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/fechamentoCaixa" component={FechamentoCaixa} />
            <Route path="/relatorioDevedores" component={TelaRelatorioDevedores} />
            <Route path="/relatorioVendas" component={TelaRelatorioVendas} />
            <Route path="/relatorioProdutos" component={TelaRelatorioProdutos} />
            <Route path="/clientes" component={TelaClientes} />
            <Route path="/produtos" component={TelaProdutos} />
            <Route path="/pdv" component={Pdv} />
        </Switch>
    </BrowserRouter>
);

export default Routes;