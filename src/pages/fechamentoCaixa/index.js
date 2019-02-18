import React, {Component} from 'react';
import MoedaReal from '../../components/MoedaReal';
import moment from 'moment';

import './styles.css';

class FechamentoCaixa extends Component {
    state = {
        vendas:[],
        input:0,
        isFechado:false
    }

    atualizaInput = (e) => {
        this.setState({
            input:e.currentTarget.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault();
    
        fetch(`http://pdv/fechamentoDeCaixa/`,{
            method:'POST',
            body:JSON.stringify({
                cliente: 0,
                pago:parseFloat(this.state.input).toFixed(2).replace(',','.'),
                formaPg:'Dinheiro',
                operacao:'Fechamento de caixa'
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            if(responseJson.resp==='ok'){
                window.location.href = '/';
                //console.log(responseJson)
            }
        })
    }

    componentDidMount() {
        const hoje=moment().format('YYYY-MM-DD');
        const amanha=moment().add(1, "days").format('YYYY-MM-DD');
        
        fetch("http://pdv/exibir/vendas/",{
            method:'POST',
            body:JSON.stringify({
                datai:hoje,
                dataf:amanha
            })
        })
        .then((response)=>response.json())
        .then((responseJson)=>
        {
            this.setState({
                vendas: responseJson.filter(venda => (venda.dataVenda === hoje))
            });

            const fechado = responseJson.filter(venda => (venda.operacao==='Fechamento de caixa')&&(venda.dataVenda === amanha));

            (fechado.length)&&(this.setState({isFechado:true}));
        });
    }

    render(){

        const total = (this.state.vendas.length)?(
            (this.state.vendas.length>1)?(
                this.state.vendas.map(evento => (evento.operacao!=='Fechamento de caixa')&&(parseFloat(evento.pago))).reduce((a,b) => a+b)
            ):(
                this.state.vendas[0].pago
            )
        ):(
            '0,00'
        );

        const mostra = (this.state.isFechado)?(
            <div className='fechamento__aviso'>Fechamento já realizado hoje</div>
        ):(
            <form onSubmit={this.onSubmit} name='formFechamento' className='fechamento__form'>
                <label className='fechamento__label'>Valor do troco de amanhã:</label>
                <input className='form-control fechamento__input' type='text' placeholder='Valor' onChange={this.atualizaInput} value={this.state.input} />
                <button className='btn btn-success form-control'>Fechar caixa</button>
            </form>
        );
        return(
            <div className='fechamento container'>
                <div>
                    <h2>ATENÇÃO!</h2>
                    O valor não pode ser corrigido e <br />
                    nenhuma venda será realizada após fechamento do caixa.
                </div>
    
                <div className='fechamento__saldo'>Saldo do caixa de hoje: <MoedaReal valor={total} /></div>

                {mostra}
 
            </div>
        );
    }
}

export default FechamentoCaixa;