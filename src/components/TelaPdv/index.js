import React, {Component} from 'react';
import {Col, Button} from 'reactstrap';
import Autocomplete from '../../components/Autocomplete';
import ItensVendidos from '../../components/pdv/ItensVendidos';
import ProdutoAtual from '../../components/pdv/ProdutoAtual';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export default class TelaPdv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produtoAtual: [],
            itensVendidos: []
        };
    }

    pagar = () => {
        if(this.state.itensVendidos){
            this.props.callbackParent(this.state.itensVendidos);
        }
    }

    addProd() {
        let itensVendidos = [];

        itensVendidos = Object.assign(itensVendidos,this.state.itensVendidos);

        let item = {
            id: this.state.itensVendidos.length + 1,
            descr: this.state.produtoAtual[0].descr,
            quant: document.getElementById('quant').value,
            unit: this.state.produtoAtual[0].preco,
            subTotal: this.state.produtoAtual[0].preco * document.getElementById('quant').value
        };
        
        itensVendidos.push(item);

        this.setState({
            itensVendidos: itensVendidos,
            produtoAtual:[]
        });
    };



    render(){
        const produtoGet = (texto) => {
            this.setState({produtoAtual: this.props.produtos.filter(produto => texto.indexOf(produto.descr) > -1)});
            if(this.state.produtoAtual.length){
                document.querySelector('#quant').focus();
            }
        };
        
        return (
            <div className='tela-pdv'>

                <Col md={12} className='produto-descr'>
                    <Autocomplete suggestions={this.props.produtos.map(produto => `${produto.codBarra} ${produto.descr}`)} callbackParent={(texto) => produtoGet(texto)} texto='Produto' />
                </Col>
                <div className='wrap-pedido'>
                    <Col md={6} className='choose-produto'>
                        <ProdutoAtual dados={this.state.produtoAtual[0]} callbackParent={(item)=>this.addProd(item)} />
                    </Col>
                    <Col md={6} className='itens-vendidos'>
                        <ItensVendidos dados={this.state.itensVendidos} />
                        <div className='btn-pagar'><Button color='success' className="form-control" onClick={this.pagar}>Pagar Agora</Button></div>
                    </Col>
                </div>
            </div>
        );
    };
}