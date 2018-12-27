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
            clienteAtual:{}
        };
    }

    render(){
        const clientes = <Clientes dados={this.props.dados} callbackParent={(cliente) => clienteGet(cliente)} />

        const clienteGet = (cliente) => {
            this.setState({
                clienteAtual:cliente,
                isNovo: false
            });
        };

        let formClientes = '';

        if(this.state.isNovo){
            formClientes = <FormClientes />
        } else {
            formClientes = <FormClientes dados={this.state.clienteAtual} />
        }

        return (
            <Fragment>
                <Col md={3} className='tela-clientes-barra'>
                    <Button color='success' className='form-control' data-toggle='modal' data-target='#modalForm' onClick={() => this.setState({isNovo:true})}><i className='fas fa-plus'></i> Novo</Button>
                </Col>
                <Col md={9} className='tela-clientes-barra'>
                    <input placeholder='Busca' className='form-control' />
                </Col>
                
                {clientes}
                {formClientes}
            </Fragment>
        );
    };
};

export default ListaClientes;