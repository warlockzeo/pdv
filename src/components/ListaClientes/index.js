import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Clientes from '../Clientes';

import FormClientes from '../../components/FormClientes';

import './styles.css';

class ListaClientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeForm: '',
            clientes: [],
            clientesAtuais: [],
            clienteAtual: {}
        };
    }

    busca = (e) => {
        const clientes = this.props.dados.filter( cliente => cliente.nome.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1);
        this.setState({
            clientesAtuais:clientes
        });
    }

    onClickNovo = () => {
        this.setState({
            typeForm:'novo', 
            clienteAtual:{}
        });
        document.querySelector('form').reset();
    }

    gravar = (cliente) => {
        this.props.gravar(cliente);
    }

    atualizar = (cliente) => {
        this.props.atualizar(cliente);
    }

    render(){
        const clienteGet = async (retorno) => {
            await this.setState({
                clienteAtual:retorno.cliente,
                typeForm:retorno.status
            });
        };

        let formClientes = '';

        if(this.state.typeForm==='novo'){
            formClientes = <FormClientes titulo='Novo cliente' callbackParent={this.gravar} typeForm='novo' />
        } else if(this.state.typeForm==='view') {
            formClientes = <FormClientes titulo='Detalhes do cliente' dados={this.state.clienteAtual} typeForm='view' />
        } else {
            formClientes = <FormClientes titulo='Detalhes do cliente' callbackParent={this.atualizar} dados={this.state.clienteAtual} typeForm='update' />
        }
        
        const lista = (this.state.clientesAtuais.length) ? this.state.clientesAtuais : this.props.dados;
        const listaClientes = lista.map((cliente) => 
            <Fragment  key={cliente.id}>
                <tr onMouseOver={() => this.setState({clienteAtual:cliente})}>
                    <Clientes cliente={cliente} callbackParent={(cliente) => clienteGet(cliente)} />
                </tr>
            </Fragment>
        );

        return (
            <Fragment>
                <Col md={3} className='tela-clientes-barra'>
                    <Button color='success' className='form-control' data-toggle='modal' data-target='#modalForm' onClick={this.onClickNovo}><i className='fas fa-plus'></i> Novo</Button>
                </Col>
                <Col md={9} className='tela-clientes-barra'>
                    <input placeholder='Busca' className='form-control' onChange={this.busca} />
                </Col>
                

                <table className='table-clientes table table-sm table-hover'>
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
                        {listaClientes}
                    </tbody>
                </table>

                {formClientes}
            </Fragment>
        );
    };
};

export default ListaClientes;