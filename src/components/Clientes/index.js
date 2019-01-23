import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';
import MoedaReal from '../../components/MoedaReal';

import './styles.css';

class Clientes extends Component {

    onClickDetalhes = async () => {
        await this.props.historico({cliente:this.props.cliente});
    }

    onClickAtualizar = async () => {
        await this.props.callbackParent({cliente:this.props.cliente,status:'update'});
    }

    onClickExcluir = async () => {
        await this.props.excluir({cliente:this.props.cliente.id});
    }

    onClickPagar = () => {
        this.props.pagar({cliente:this.props.cliente});
    }

    render() {
        const cliente = this.props.cliente;

        return(
            <Fragment>
                <td style={{flex:'0 1 45%'}} className='text-left'>{cliente.nome}</td>
                <td style={{flex:'10%'}} className='d-xs-none text-left'>{cliente.fone}</td>
                <td style={{flex:'10%'}} className='d-xs-none text-right'><MoedaReal valor={cliente.saldo} /></td>
                <td style={{flex:'1 0 40%'}} className='text-right'>
                    <Button color='success' data-toggle='modal' data-target='#modalPagarForm' onClick={this.onClickPagar}><span className='d-xs-none'>Pagar</span> <i className='fas fa-dollar-sign d-sm-none'></i></Button>&nbsp;
                    <Button color='info' data-toggle='modal' data-target='#modalForm' onClick={this.onClickAtualizar}><span className='d-xs-none'>Editar</span> <i className='fas fa-pencil-alt d-sm-none'></i></Button>&nbsp;
                    <Button color='primary' onClick={this.onClickDetalhes}><span className='d-xs-none'>Detalhes</span> <i className='far fa-eye d-sm-none'></i></Button>&nbsp;
                    <Button color='danger' onClick={this.onClickExcluir}><span className='d-xs-none'>Excluir</span> <i className='fas fa-minus  d-sm-none'></i></Button>
                </td>
            </Fragment>
        );
    };
};

export default Clientes;