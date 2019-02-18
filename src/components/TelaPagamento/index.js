import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';

import Autocomplete from '../../components/Autocomplete';
import ItensVendidos from '../../components/pdv/ItensVendidos';

import './styles.css';

export default class TelaPagamento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itensVendidos: this.props.itens,
            clienteAtual: [],
            desconto: 0,
            total:parseFloat(this.props.itens.map(item => item.subTotal).reduce( (a,p) => a + p ))||0,
            totalAPagar:parseFloat(this.props.itens.map(item => item.subTotal).reduce( (a,p) => a + p ))||0,
            pago:0,
            resta:parseFloat(this.props.itens.map(item => item.subTotal).reduce( (a,p) => a + p ))||0,
        };
    }

    pagar = () => {
        const cliente = (this.state.clienteAtual.length)?this.state.clienteAtual[0].id:0;

        const e = document.querySelector('.venda__pago__formaPg');
        const formaPg = e.options[e.selectedIndex].value;
        
        this.props.callbackParent({
            itensVendidos: this.state.itensVendidos,
            venda:{
                cliente: cliente,
                total: this.state.total,
                desconto: this.state.desconto,
                totalAPagar: this.state.total - this.state.desconto,
                pago:this.state.pago,
                formaPg:formaPg,
                resta:(this.state.resta!==0)?this.state.resta:0,
            }
        });
    }

    render(){
        const descontoOnChange = async e => {
            let desconto = e.currentTarget.value.replace(',','.');
            desconto = parseFloat(desconto).toFixed(2);
            if(!isNaN(desconto)){
                await this.setState({ 
                    desconto: desconto,
                    totalAPagar: this.state.total - desconto
                });
            }
        }
    
        const descontoOnKeyDown = e => {
            if (e.keyCode === 13) {
                document.querySelector('.venda__pago__input').focus();
                document.querySelector('.venda__pago__input').select();
            };
        }

        const pagoOnChange = async e => {
            let pago = e.currentTarget.value.replace(',','.');
            pago = parseFloat(pago).toFixed(2);
            if(!isNaN(pago)){
                await this.setState({ 
                    pago: e.currentTarget.value, 
                    resta: (this.state.total - this.state.desconto) - pago
                });
            }
        }
    
        const pagoOnKeyDown = e => {
            if (e.keyCode === 13) {
                //document.querySelector('.btn-pagar').focus();
                this.pagar();
            };
        }
    
        const onBlur = async(e) => {
            let valor = e.currentTarget.value.replace(',','.');
            valor = parseFloat(valor).toFixed(2).replace('.',',');
            e.currentTarget.value = valor;
        }

        const clienteGet = (texto) => {
            this.setState({clienteAtual: this.props.clientes.filter(cliente => texto.indexOf(cliente.nome) > -1)});
            //if(this.state.clienteAtual.length){
                document.querySelector('.venda__desconto__input').focus();
                document.querySelector('.venda__desconto__input').select();
            //} 
        };
        
        const cliente = (this.state.clienteAtual.length)?this.state.clienteAtual[0]:'';
        let saldoCliente = (cliente.saldo>0)?(<div className='saldo-devedor'>Saldo devedor: R$ {cliente.saldo}</div>):'';

        const resta = (this.state.resta>0)?parseFloat(this.state.resta).toFixed(2).replace('.',','):parseFloat(this.state.resta*-1).toFixed(2).replace('.',',');

        const restaTroco = (this.state.resta>=0)?(
            <Fragment>
                <span className='venda__resta__legenda'>Resta:</span>
                <input type='text' className='venda__resta__input form-control' value={resta} disabled />
            </Fragment>
        ):(
            <Fragment>
                <span className='venda__resta__legenda'>Troco:</span>
                <input type='text' className='venda__troco__input form-control' value={resta} disabled />
            </Fragment>
        );

        return (
            <div className='tela-pdv'>
                <div className='wrap-pagamento'>
                    <div className='venda col-md-6'>
                        <ItensVendidos dados={this.props.itens} />
                    </div>
                    <div className='pagamento col-md-6'>
                        <div className='pagamento__cliente'>
                            <Autocomplete suggestions={this.props.clientes.map(cliente => `${cliente.nome}`)} callbackParent={(texto) => clienteGet(texto)} texto='Cliente Anônimo' />
                            {saldoCliente}
                        </div>
                        <div className='venda__desconto'>
                            <span className='venda__desconto__legenda'>Desconto:</span>
                            <input type='text' className='venda__desconto__input form-control' onBlur={onBlur} onKeyDown={descontoOnKeyDown}  onChange={descontoOnChange} defaultValue='0,00' />
                        </div>
                        <div className='venda__total'>
                            <span className='venda__total__legenda'>Total a Pagar:</span>
                            <input type='text' className='venda__total__input form-control' value={parseFloat(this.state.totalAPagar).toFixed(2).replace('.',',')} disabled />
                        </div>
                        <div className='venda__pago'>
                            <span className='venda__pago__legenda'>Forma Pg:</span>

                            <select className='venda__pago__formaPg'>
                                <option value='Dinheiro'>Dinheiro</option>
                                <option value='Cartão'>Cartão</option>
                            </select>

                            <input type='text' className='venda__pago__input form-control' onBlur={onBlur} onKeyDown={pagoOnKeyDown}  onChange={pagoOnChange} defaultValue='0,00' />
                        </div>
                        <div className='venda__resta'>
                            {restaTroco}
                        </div>
                        <Button className='btn-pagar form-control' color='success' onClick={this.pagar}>Pagar</Button>
                        
                    </div>
                </div>
            </div>
        );
    };
}