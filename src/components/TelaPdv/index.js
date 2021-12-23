import React, { Component } from 'react';
import { Col, Button } from 'reactstrap';

import Autocomplete from '../../components/Autocomplete';
import ItensVendidos from '../../components/pdv/ItensVendidos';
import ProdutoAtual from '../../components/pdv/ProdutoAtual';

export default class TelaPdv extends Component {
  constructor(props) {
    super(props);

    this.state = {
      produtoAtual: [],
      itensVendidos: []
    };
  }

  pagar = () => {
    if (this.state.itensVendidos.length) {
      this.props.callbackParent(this.state.itensVendidos);
    }
  };

  addProd() {
    let itensVendidos = this.state.itensVendidos.filter(
      (item) => item.id !== this.state.produtoAtual[0].id
    );
    const itemRepetido = this.state.itensVendidos.filter(
      (item) => item.id === this.state.produtoAtual[0].id
    );

    let quant;
    if (itemRepetido.length) {
      quant =
        parseInt(document.getElementById('quant').value, 10) +
        parseInt(itemRepetido[0].quant, 10);
    } else {
      quant = parseInt(document.getElementById('quant').value, 10);
    }

    const item = {
      id: this.state.produtoAtual[0].id,
      descr: this.state.produtoAtual[0].descr,
      quant: quant,
      unit: this.state.produtoAtual[0].preco,
      subTotal: this.state.produtoAtual[0].preco * quant
    };

    itensVendidos.push(item);

    this.setState({
      itensVendidos,
      produtoAtual: []
    });
  }

  render() {
    const produtoGet = (texto) => {
      this.setState({
        produtoAtual: this.props.produtos.filter(
          (produto) => texto.indexOf(produto.descr) > -1
        )
      });
      if (this.state.produtoAtual.length) {
        document.querySelector('#quant').focus();
        document.querySelector('#quant').select();
      } else {
        if (this.state.itensVendidos.length) {
          this.pagar();
        }
      }
    };

    return (
      <div className="tela-pdv">
        <div className="produto-descr">
          <Autocomplete
            suggestions={this.props.produtos.map(
              (produto) => `${produto.codBarra} ${produto.descr}`
            )}
            callbackParent={(texto) => produtoGet(texto)}
            texto="Produto"
          />
        </div>
        <div className="wrap-pedido">
          <Col md={6} className="choose-produto">
            <ProdutoAtual
              dados={this.state.produtoAtual[0]}
              callbackParent={(item) => this.addProd(item)}
            />
          </Col>
          <Col md={6} className="itens-vendidos">
            <ItensVendidos dados={this.state.itensVendidos} />
            <div className="btn-pagar">
              <Button
                color="success"
                className="form-control"
                onClick={this.pagar}>
                Pagar Agora
              </Button>
            </div>
          </Col>
        </div>
      </div>
    );
  }
}
