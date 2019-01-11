import React from 'react';

import { BrowserRouter, Switch, Route } from 'react-router-dom';

import Main from './pages/main';
import TelaClientes from './pages/clientes';
import TelaProdutos from './pages/produtos';
import Pdv from './pages/pdv';

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route exact path="/" component={Main} />
            <Route path="/clientes" component={TelaClientes} />
            <Route path="/produtos" component={TelaProdutos} />
            <Route path="/pdv" component={Pdv} />
        </Switch>
    </BrowserRouter>
);

export default Routes;