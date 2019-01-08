import React, {Component} from 'react';

export default class ProdutoAtual extends Component {
    state = {

        subTotal:0
    }

    render(){
        const mudaSubtotal = e => {
            this.setState({subtotal: this.props.dados.preco * parseInt(e.currentTarget.value)});
            document.querySelector('#preco-subtotal').value = (this.props.dados.preco * parseInt(e.currentTarget.value)).toFixed(2).replace(".",",");
        };

        const quantOnKeyDown = e => {
            if (e.keyCode === 13) {
                this.props.callbackParent(this.state);
            };
        }

        const preco = (this.props.dados)?this.props.dados.preco:'0,00';

        return(
            <form id='form-produto' onSubmit={this.props.callbackParent}>
                <div className='choose-produto__quant'><span className='choose-produto__quant-legenda'>Quant:</span><input className='form-control choose-produto__quant-input' onChange={mudaSubtotal} onKeyDown={quantOnKeyDown} type='number' id='quant' min='1' defaultValue='1' /></div>
                <div className='choose-produto__preco'><span className='choose-produto__preco-legenda'>Preço:</span><input className='form-control choose-produto__preco-input' type='text' id='preco' disabled value={parseFloat(preco).toFixed(2).replace(".",",")} /></div>
                <div className='choose-produto__preco-subtotal'><span className='choose-produto__preco-subtotal-legenda'>Sub-total:</span><input className='form-control choose-produto__preco-subtotal-input' type='text' id='preco-subtotal' disabled defaultValue='0,00' /></div>
            </form>
        );
    };
}