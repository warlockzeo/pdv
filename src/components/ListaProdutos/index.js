import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';

import Produtos from '../Produtos';

import FormProdutos from '../../components/FormProdutos';

import './styles.css';

class ListaProdutos extends Component {
    constructor(props) {
        super(props);

        this.state = {
            typeForm: '',
            produtos: [],
            produtosAtuais: [],
            produtoAtual: {}
        };
    }

    busca = (e) => {
        const produtos = this.props.dados.filter( produto => produto.descr.toLowerCase().indexOf(e.currentTarget.value.toLowerCase()) > -1);
        this.setState({
            produtosAtuais:produtos
        });
    }

    onClickNovo = () => {
        this.setState({
            typeForm:'novo', 
            produtoAtual:{}
        });
        document.querySelector('form').reset();
    }

    gravar = (produto) => {
        this.props.gravar(produto);
    }

    atualizar = (produto) => {
        this.props.atualizar(produto);
    }

    excluir = (produto) => {
        this.props.excluir(produto);
    }

    render(){
        const produtoGet = async (retorno) => {
            await this.setState({
                produtoAtual:retorno.produto,
                typeForm:retorno.status
            });
        };

        let formProdutos = '';

        if(this.state.typeForm==='novo'){
            formProdutos = <FormProdutos titulo='Novo produto' callbackParent={this.gravar} typeForm='novo' />
        } else if(this.state.typeForm==='view') {
            formProdutos = <FormProdutos titulo='Detalhes do produto' dados={this.state.produtoAtual} typeForm='view' />
        } else {
            formProdutos = <FormProdutos titulo='Detalhes do produto' callbackParent={this.atualizar} dados={this.state.produtoAtual} typeForm='update' />
        }
        
        const lista = (this.state.produtosAtuais.length) ? this.state.produtosAtuais : this.props.dados;
        const listaProdutos = lista.map((produto) => 
            <Fragment  key={produto.id}>
                <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}} onMouseOver={() => this.setState({produtoAtual:produto})}>
                    <Produtos produto={produto} callbackParent={(produto) => produtoGet(produto)} excluir={this.excluir}/>
                </tr>
            </Fragment>
        );

        return (
            <Fragment>
                <Col md={3} className='tela-produtos-barra'>
                    <Button color='success' className='form-control' data-toggle='modal' data-target='#modalForm' onClick={this.onClickNovo}><i className='fas fa-plus'></i> Novo</Button>
                </Col>
                <Col md={9} className='tela-produtos-barra'>
                    <input placeholder='Busca' className='form-control' onChange={this.busca} />
                </Col>
                
                <table className='table-produtos table table-sm table-hover'>
                    <thead className='head-tabela thead-dark'>
                        <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                            <th style={{flex:'0 1 43%'}} className='text-left'>Descrição</th>
                            <th style={{flex:'10%'}} className='d-xs-none text-left'>Estoque</th>
                            <th style={{flex:'10%'}} className='d-xs-none text-right'>Preço</th>
                            <th style={{flex:'1 0 22%'}}></th>
                        </tr>
                    </thead>
                    <tbody className='scroll-tabela'>
                        {listaProdutos}
                    </tbody>
                </table>
                
                {formProdutos}
            </Fragment>
        );
    };
};

export default ListaProdutos;