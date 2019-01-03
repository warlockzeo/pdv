import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';

import './styles.css';

class Clientes extends Component {

    onClickDetalhes = async () => {
        await this.props.callbackParent({cliente:this.props.cliente,status:'view'});
    }

    onClickAtualizar = async () => {
        await this.props.callbackParent({cliente:this.props.cliente,status:'update'});
    }

    onClickExcluir = async () => {
        await this.props.callbackParent({cliente:this.props.cliente});
    }

    render() {
        const cliente = this.props.cliente;

        return(
            <Fragment>
                <td className='text-left'>{cliente.nome}</td>
                <td className='text-left'>{cliente.fone}</td>
                <td className='d-xs-none text-left'>{cliente.bairro}</td>
                <td className='d-xs-none text-right'>{cliente.saldo}</td>
                <td className='text-right'>
                    <Button color='info' data-toggle='modal' data-target='#modalForm' onClick={this.onClickAtualizar}><span className='d-xs-none'>Editar</span> <i className='fas fa-pencil-alt d-sm-none'></i></Button>&nbsp;
                    <Button color='primary' data-toggle='modal' data-target='#modalForm' onClick={this.onClickDetalhes}><span className='d-xs-none'>Detalhes</span> <i className='far fa-eye d-sm-none'></i></Button>&nbsp;
                    <Button color='danger' onClick={this.onClickExcluir}><span className='d-xs-none'>Excluir</span> <i className='fas fa-minus  d-sm-none'></i></Button>
                </td>
            </Fragment>
        );
    };
};

export default Clientes;