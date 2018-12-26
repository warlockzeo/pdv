import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';

import './styles.css';

class Clientes extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {
        const clientes = this.props.dados.map((cliente) => 

        <tr key={cliente.id}>
            <td className='text-left'>{cliente.name}</td>
            <td className='text-left'>{cliente.fone}</td>
            <td className='d-xs-none text-left'>{cliente.bairro}</td>
            <td className='d-xs-none text-right'>{cliente.saldo}</td>
            <td className='text-right'>
                <Button color='primary'><span className='d-xs-none'>Detalhes</span> <i className="far fa-eye d-sm-none"></i></Button>&nbsp;
                <Button color='danger'><span className='d-xs-none'>Excluir</span> <i className="fas fa-minus  d-sm-none"></i></Button>
            </td>
        </tr>
    );
        return(
            <Fragment>
            <table className="table-clientes table table-sm table-hover">
                <thead className='thead-dark'>
                    <tr>
                        <th className='text-left'>Nome</th>
                        <th className='text-left'>Telefone</th>
                        <th className='d-xs-none text-left'>Bairro</th>
                        <th className='d-xs-none text-right'>Saldo</th>
                        <th></th>
                    </tr>
                </thead>
                <tbody>
                    {clientes}
                </tbody>
            </table>
            </Fragment>
        );
    };
};

export default Clientes;