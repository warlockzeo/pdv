import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';

import './styles.css';

class Produtos extends Component {

    onClickDetalhes = async () => {
        await this.props.callbackParent({produto:this.props.produto,status:'view'});
    }

    onClickAtualizar = async () => {
        await this.props.callbackParent({produto:this.props.produto,status:'update'});
    }

    onClickExcluir = async () => {
        await this.props.excluir({produto:this.props.produto.id});
    }

    render() {
        const produto = this.props.produto;
        const precoFormatado = parseFloat(this.props.produto.preco).toFixed(2).replace(".",",");


        return(
            <Fragment>
                <td style={{flex:'0 1 39%'}} className='text-left'>{produto.descr}</td>
                <td style={{flex:'10%'}} className='d-xs-none text-center'>{produto.estoque}</td>
                <td style={{flex:'10%'}} className='d-xs-none text-right'>{precoFormatado}</td>
                <td style={{flex:'1 0 20%'}} className='text-right'>
                    <Button color='info' data-toggle='modal' data-target='#modalForm' onClick={this.onClickAtualizar}><span className='d-xs-none'>Editar</span> <i className='fas fa-pencil-alt d-sm-none'></i></Button>&nbsp;
                    <Button color='primary' data-toggle='modal' data-target='#modalForm' onClick={this.onClickDetalhes}><span className='d-xs-none'>Detalhes</span> <i className='far fa-eye d-sm-none'></i></Button>&nbsp;
                    <Button color='danger' onClick={this.onClickExcluir}><span className='d-xs-none'>Excluir</span> <i className='fas fa-minus  d-sm-none'></i></Button>
                </td>
            </Fragment>
        );
    };
};

export default Produtos;