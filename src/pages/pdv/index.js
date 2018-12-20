import React, {Component} from 'react';
import {Col, Button} from 'reactstrap';
import Autocomplete from '../../components/Autocomplete';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import './styles.css';

class TelaPdv extends Component {
    constructor(props) {
        super(props);

        this.state = {
            produtos: [
                {id:1,descr:'pulseira',preco: 20.00},
                {id:2,descr:'anel',preco: 15.35},
                {id:3,descr:'boné',preco: 16.50},
                {id:4,descr:'camisa',preco: 19.00}
            ],
            produtoAtual: [],
            itensVendidos: []
        };
    }

    render(){
        const decimais = (numero) => numero.toFixed(2).replace(".",",");

        const produtoGet = (texto) => {
            this.setState({produtoAtual: this.state.produtos.filter(produto => produto.descr === texto)});
            if(this.state.produtoAtual.length){
                document.querySelector('#preco').value = decimais(this.state.produtoAtual[0].preco);
                mudaSubtotal();
            }
        };

        const mudaSubtotal = () => {
            document.querySelector('#preco-subtotal').value = decimais(this.state.produtoAtual[0].preco * document.getElementById('quant').value);
        };

        const addProd = () => {
            let quant = document.getElementById('quant').value;
            let item = {
                id: this.state.itensVendidos.length + 1,
                descr: this.state.produtoAtual[0].descr,
                quant: quant,
                unit: this.state.produtoAtual[0].preco,
                total: this.state.produtoAtual[0].preco * quant
            };
            this.state.itensVendidos.push(item);
            document.querySelector('.choose-produto input').value="";
            document.querySelector('#preco').value ="0,00";
            document.querySelector('#preco-subtotal').value ="0,00";
            document.querySelector('#quant').value ="1";
            document.querySelector('#total').value ="0,00";
        };

        return (
            <div className='tela-pdv'>

                <Col md={12} className='produto-descr'>
                    <Autocomplete suggestions={this.state.produtos.map(produto => produto.descr)} callbackParent={(texto) => produtoGet(texto)}/>
                </Col>

                <Col md={6} className={`choose-produto`}>
                    <div className='choose-produto__quant'><span className='choose-produto__quant-legenda'>Quant:</span><input className='form-control choose-produto__quant-input' onChange={mudaSubtotal} type='number' id='quant' min='1' defaultValue='1' /></div>
                    <div className='choose-produto__preco'><span className='choose-produto__preco-legenda'>Preço:</span><input className='form-control choose-produto__preco-input' onChange={mudaSubtotal} type='text' id='preco' disabled defaultValue='0,00' /></div>
                    <div className='choose-produto__preco-subtotal'><span className='choose-produto__preco-subtotal-legenda'>Sub-total:</span><input className='form-control choose-produto__preco-subtotal-input' type='text' id='preco-subtotal' disabled defaultValue='0,00' /></div>
                    <div className='choose-produto__add'><Button onClick={addProd} color='success' className='form-control'>Adicionar</Button></div>
                </Col>

                <Col md={6} className={`itens-vendidos`}>
                    <div className='lista-itens'>Lista de ítens</div>
                    <div className='total'><span className='total__legenda'>Total:</span><input className='form-control total__input' type='text' id='total' defaultValue='0,00' /></div>
                    <div className='btn-pagar'><Button color='success' className="form-control">Pagar Agora</Button></div>
                </Col>

            </div>
        );
    };
}
    
export default TelaPdv;