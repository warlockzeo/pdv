import React, {Component, Fragment} from 'react';
import {Col, Button} from 'reactstrap';
import Autocomplete from '../../components/Autocomplete';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

import './styles.css';

class TelaPdv extends Component {

    constructor(props) {
        super(props);

        this.state = {
            produtos: [],
            produtoAtual: [],
            itensVendidos: []
        };
    }

    componentDidMount(){
        const produtos = [
            {id:1,descr:'pulseira',preco: 20.00},
            {id:2,descr:'anel',preco: 15.35},
            {id:3,descr:'boné',preco: 16.50},
            {id:4,descr:'camisa',preco: 19.00}
        ];
    
        this.setState({
            produtos: produtos
        });
    }

    render(){
        const decimais = (numero) => numero.toFixed(2).replace(".",",");

        const mudaSubtotal = () => {
            document.querySelector('#preco-subtotal').value = decimais(this.state.produtoAtual[0].preco * document.getElementById('quant').value);
        };
        
        const produtoGet = (texto) => {
            this.setState({produtoAtual: this.state.produtos.filter(produto => produto.descr === texto)});
            if(this.state.produtoAtual.length){
                document.querySelector('#preco').value = decimais(this.state.produtoAtual[0].preco);
                mudaSubtotal();
            }
        };

        const totalGeral = (itensArray) => {
            if(itensArray.length){ 
                return(
                    decimais(
                        itensArray
                            .map(item => item.subTotal)
                            .reduce((a, s)=>a + s)
                    )
                );
            }
        };

        const addProd = () => {
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
                itensVendidos: itensVendidos
            });

            document.querySelector('.choose-produto input').value="";
            document.querySelector('#preco').value ="0,00";
            document.querySelector('#preco-subtotal').value ="0,00";
            document.querySelector('#quant').value ="1";
            document.querySelector('#total').value = totalGeral(itensVendidos);
        };

        return (
            <div className='tela-pdv'>

                <Col md={12} className='produto-descr'>
                    <Autocomplete suggestions={this.state.produtos.map(produto => produto.descr)} callbackParent={(texto) => produtoGet(texto)} texto='Produto' />
                </Col>

                <Col md={6} className={`choose-produto`}>
                    <form id='form-produto' onSubmit={addProd}>
                        <div className='choose-produto__quant'><span className='choose-produto__quant-legenda'>Quant:</span><input className='form-control choose-produto__quant-input' onChange={mudaSubtotal} type='number' id='quant' min='1' defaultValue='1' /></div>
                        <div className='choose-produto__preco'><span className='choose-produto__preco-legenda'>Preço:</span><input className='form-control choose-produto__preco-input' onChange={mudaSubtotal} type='text' id='preco' disabled defaultValue='0,00' /></div>
                        <div className='choose-produto__preco-subtotal'><span className='choose-produto__preco-subtotal-legenda'>Sub-total:</span><input className='form-control choose-produto__preco-subtotal-input' type='text' id='preco-subtotal' disabled defaultValue='0,00' /></div>
                        <div className='choose-produto__add'><Button onClick={addProd} color='success' className='form-control'>Adicionar</Button></div>
                    </form>
                </Col>

                <Col md={6} className={`itens-vendidos`}>
                    <div className='lista-itens'>
                        
                            {this.state.itensVendidos.map(item => (
                                <Fragment key={item.id}>
                                    <Col md={6} className="lista-itens__descr" >{item.descr}</Col>
                                    <Col md={6} className="lista-itens__unit">{item.unit}</Col>
                                </Fragment>
                            ))}
                        
                    </div>
                    <div className='total'><span className='total__legenda'>Total:</span><input className='form-control total__input' type='text' id='total' defaultValue='0,00' /></div>
                    <div className='btn-pagar'><Button color='success' className="form-control">Pagar Agora</Button></div>
                </Col>

            </div>
        );
    };
}
    
export default TelaPdv;