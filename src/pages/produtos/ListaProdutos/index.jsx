import React, { Component, Fragment } from 'react';
import AddSearchBar from '../../../components/AddSearchBar';
import Produto from '../Produto';
import FormProdutos from '../../../components/FormProdutos';

import { tags as T } from '../../../components/tags';

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
    const produtos = this.props.dados.filter(
      (produto) =>
        produto.descr
          .toLowerCase()
          .indexOf(e.currentTarget.value.toLowerCase()) > -1
    );
    this.setState({
      produtosAtuais: produtos
    });
  };

  onClickNovo = () => {
    this.setState({
      typeForm: 'novo',
      produtoAtual: {}
    });
    document.querySelector('form').reset();
  };

  gravar = (produto) => {
    this.props.gravar(produto);
  };

  atualizar = (produto) => {
    this.props.atualizar(produto);
  };

  excluir = (produto) => {
    this.props.excluir(produto);
  };

  render() {
    const produtoGet = (retorno) => {
      this.setState({
        produtoAtual: retorno.produto,
        typeForm: retorno.status
      });
    };

    const formProdutos =
      this.state.typeForm === 'novo' ? (
        <FormProdutos
          titulo='Novo produto'
          callbackParent={this.gravar}
          typeForm='novo'
        />
      ) : this.state.typeForm === 'view' ? (
        <FormProdutos
          titulo='Detalhes do produto'
          dados={this.state.produtoAtual}
          typeForm='view'
        />
      ) : (
        <FormProdutos
          titulo='Detalhes do produto'
          callbackParent={this.atualizar}
          dados={this.state.produtoAtual}
          typeForm='update'
        />
      );

    const lista = this.state.produtosAtuais.length
      ? this.state.produtosAtuais
      : this.props.dados;
    const listaProdutos = lista.map((produto) => (
      <Fragment key={produto.id}>
        <tr onMouseOver={() => this.setState({ produtoAtual: produto })}>
          <Produto
            produto={produto}
            callbackParent={(produto) => produtoGet(produto)}
            excluir={this.excluir}
          />
        </tr>
      </Fragment>
    ));

    return (
      <>
        <AddSearchBar busca={this.busca} onClickNovo={this.onClickNovo} />
        <table className='table-produtos table table-sm table-hover'>
          <thead className='thead-dark'>
            <tr>
              <T.thDescription>Descrição</T.thDescription>
              <T.thNumbers className='text-center d-xs-none'>
                Estoque
              </T.thNumbers>
              <T.thNumbers className='text-center d-xs-none'>Preço</T.thNumbers>
              <th style={{ width: 240 }}></th>
            </tr>
          </thead>
          <tbody>{listaProdutos}</tbody>
        </table>
        {formProdutos}
      </>
    );
  }
}

export default ListaProdutos;
