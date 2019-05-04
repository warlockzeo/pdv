import React, {Component,Fragment} from 'react';

export default class ProdutoAtual extends Component {
    state = {
        subTotal:0
    }

    render(){
        const mudaSubtotal = e => {
            if(this.props.dados){
                this.setState({subTotal: this.props.dados.preco * parseInt(e.currentTarget.value)});
            }
        };

        const quantOnKeyDown = e => {
            if (e.keyCode === 13) {
                if((e.currentTarget.value > 0) && (this.state.subTotal > 0)){
                    this.props.callbackParent(this.state);
                }
                limpar();
            };
        }

        const limpar = () => {
            document.querySelector('.choose-produto__quant-input').value = '0';
            this.setState({subTotal:0.00});
            document.querySelector('.input-autocomplete').value = '';
            document.querySelector('.input-autocomplete').focus();
        }

        const preco = (this.props.dados)?this.props.dados.preco:'0,00';

        return(
            <Fragment>
                <div className='choose-produto__quant'>
                    <span className='choose-produto__quant-legenda'>Quant:</span>
                    <input className='form-control choose-produto__quant-input' onChange={mudaSubtotal} onKeyDown={quantOnKeyDown} onBlur={limpar} type='number' id='quant' min='1' defaultValue='0' />
                </div>
                <div className='choose-produto__preco'><span className='choose-produto__preco-legenda'>Preço:</span><input className='form-control choose-produto__preco-input' type='text' id='preco' disabled value={parseFloat(preco).toFixed(2).replace(".",",")} /></div>
                <div className='choose-produto__preco-subtotal'><span className='choose-produto__preco-subtotal-legenda'>Sub-total:</span><input className='form-control choose-produto__preco-subtotal-input' type='text' id='preco-subtotal' disabled value={(this.state.subTotal).toFixed(2).replace(".",",")} /></div>
            </Fragment>
        );
    };
}