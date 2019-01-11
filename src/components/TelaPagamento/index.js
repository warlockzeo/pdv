import React, {Component, Fragment} from 'react';
import {Button} from 'reactstrap';
import Autocomplete from '../../components/Autocomplete';
import ItensVendidos from '../../components/pdv/ItensVendidos';

import 'react-bootstrap-table/dist/react-bootstrap-table-all.min.css';

export default class TelaPagamento extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itensVendidos: this.props.itens,
            clienteAtual: [],
            desconto: 0,
            total: parseFloat(this.props.itens.map(item => item.subTotal).reduce( (a,p) => a + p ))||0,
            pago:0,
            resta:0
        };
    }

    pagar = () => {
        this.props.callbackParent({
            itensVendidos: this.state.itensVendidos,
            venda:{
                cliente: this.state.clienteAtual[0].id,
                total: this.state.total,
                desconto: this.state.desconto,
                totalAPagar: this.state.total - this.state.desconto,
                pago:this.state.pago,
                resta:(this.state.resta>0)?this.state.resta:0
            }
        });
    }

    render(){
        const descontoOnChange = async e => {
            await this.setState({ desconto: e.currentTarget.value || 0 });
        }
    
        const descontoOnKeyDown = e => {
            if (e.keyCode === 13) {
                document.querySelector('.venda__pago__input').focus();
            };
        }

        const pagoOnChange = async e => {
            await this.setState({ 
                pago: e.currentTarget.value || 0, 
                resta: (parseFloat(this.state.total) - parseFloat(this.state.desconto)) - parseFloat(e.currentTarget.value)
            });
        }
    
        const pagoOnKeyDown = e => {
            if (e.keyCode === 13) {
                document.querySelector('.btn-pagar').focus();
            };
        }
        
        const onBlur = e => {
            let x = document.querySelectorAll('input');
            x.forEach(
                (y)=>{
                    if((y.value+2)>2){
                        y.value = parseFloat(y.value).toFixed(2).replace('.',',')
                    }
                }
            );
        }

        const clienteGet = (texto) => {
            this.setState({clienteAtual: this.props.clientes.filter(cliente => texto.indexOf(cliente.nome) > -1)});
        };
        
        const cliente = (this.state.clienteAtual.length)?this.state.clienteAtual[0]:'';

        const saldoCliente = (this.state.clienteAtual.saldo>0)?`{<div>Saldo: ${cliente.saldo}</div>}`:'';

        const restaTroco = (this.state.resta>=0)?(
            <Fragment>
                <span className='venda__resta__legenda'>Resta:</span>
                <input type='text' className='venda__resta__input form-control' value={this.state.resta||'0,00'} disabled />
            </Fragment>
        ):(
            <Fragment>
                <span className='venda__resta__legenda'>Troco:</span>
                <input type='text' className='venda__troco__input form-control' value={(this.state.resta)*(-1)} disabled />
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
                            <input type='text' className='venda__desconto__input form-control' onBlur={onBlur} onKeyDown={descontoOnKeyDown}  onChange={descontoOnChange} value={this.state.desconto} />
                        </div>
                        <div className='venda__total'>
                            <span className='venda__total__legenda'>Total a Pagar:</span>
                            <input type='text' className='venda__total__input form-control' value={(this.state.total - parseFloat(this.state.desconto)).toFixed(2).replace('.',',')} disabled />
                        </div>
                        <div className='venda__pago'>
                            <span className='venda__pago__legenda'>Pago:</span>
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