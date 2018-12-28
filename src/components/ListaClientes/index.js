import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Clientes from '../Clientes';

import FormClientes from '../../components/FormClientes';

import './styles.css';

class ListaClientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isNovo: true,
            clientes: this.props.dados,
            clientesAtuais: this.props.dados,
            clienteAtual:{}
        };
    }

    busca = e => {
        const clientes = this.state.clientes.filter( cliente => cliente.nome.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1);
        this.setState({
            clientesAtuais:clientes
        });
    }

    render(){
        const clienteGet = (cliente) => {
            this.setState({
                clienteAtual:cliente,
                isNovo: false
            });
        };

        let formClientes = '';

        if(this.state.isNovo){
            formClientes = <FormClientes titulo='Novo cliente' />
        } else {
            formClientes = <FormClientes titulo='Detalhes do cliente' dados={this.state.clienteAtual} />
        }

        return (
            <Fragment>
                <Col md={3} className='tela-clientes-barra'>
                    <Button color='success' className='form-control' data-toggle='modal' data-target='#modalForm' onClick={() => this.setState({isNovo:true})}><i className='fas fa-plus'></i> Novo</Button>
                </Col>
                <Col md={9} className='tela-clientes-barra'>
                    <input placeholder='Busca' className='form-control' onChange={this.busca} />
                </Col>
                
                <Clientes dados={this.state.clientesAtuais} callbackParent={(cliente) => clienteGet(cliente)} />
                {formClientes}
            </Fragment>
        );
    };
};

export default ListaClientes;