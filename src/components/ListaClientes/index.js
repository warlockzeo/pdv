import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Clientes from '../Clientes';

import FormClientes from '../../components/FormClientes';
import FormPagar from '../../components/FormPagar';

import './styles.css';

class ListaClientes extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isFormPagarOpen: false,
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
            isFormPagarOpen:false,
            clienteAtual:{}
        });
        document.querySelector('form').reset();
    }

    onClickPagar = (cliente) => {
        this.setState({isFormPagarOpen:true, clienteAtual:cliente});
    }

    gravar = (cliente) => {
        this.props.gravar(cliente);
    }

    atualizar = (cliente) => {
        this.props.atualizar(cliente);
    }

    excluir = (cliente) => {
        this.props.excluir(cliente);
    }

    historico = (cliente) => {
        this.props.historico(cliente);
    }

    atualizaSaldo = (retorno) => {
        this.props.atualizaSaldo(retorno);
    }

    render(){
        const clienteGet = async (retorno) => {
            await this.setState({
                clienteAtual:retorno.cliente,
                typeForm:retorno.status
            });
        };

        let mostraFormClientes = '';

        if(this.state.typeForm==='novo'){
            mostraFormClientes = <FormClientes titulo='Novo cliente' callbackParent={this.gravar} typeForm='novo' />
        } else {
            mostraFormClientes = <FormClientes titulo='Detalhes do cliente' callbackParent={this.atualizar} dados={this.state.clienteAtual} typeForm='update' />
        }

        const mostraFormPagar = (this.state.isFormPagarOpen)?<FormPagar atualizaSaldo={this.atualizaSaldo} cliente={this.state.clienteAtual.cliente} />:'';
        
        const lista = (this.state.clientesAtuais.length) ? this.state.clientesAtuais : this.props.dados;
        const listaClientes = lista.map((cliente) => 
            <Fragment  key={cliente.id}>
                <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}} onMouseOver={() => this.setState({clienteAtual:cliente})}>
                    <Clientes cliente={cliente} historico={this.historico} callbackParent={(cliente) => clienteGet(cliente)} excluir={this.excluir} pagar={(cliente) => this.onClickPagar(cliente)} />
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
                    <thead className='head-tabela thead-dark'>
                        <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                            <th style={{flex:'0 1 43%'}} className='text-left'>Nome</th>
                            <th style={{flex:'10%'}} className='d-xs-none text-left'>Telefone</th>
                            <th style={{flex:'10%'}} className='d-xs-none text-right'>Saldo</th>
                            <th style={{flex:'1 0 42%'}}></th>
                        </tr>
                    </thead>
                    <tbody className='scroll-tabela'>
                        {listaClientes}
                    </tbody>
                </table>
                

                {mostraFormClientes}
                {mostraFormPagar}
            </Fragment>
        );
    };
};

export default ListaClientes;