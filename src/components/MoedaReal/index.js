import {Component} from 'react';

export default class MoedaReal extends Component {
    render(){
        const moeda = (valor) => {
            //let valorFormatado = valor.replace(',','.');
            //valorFormatado = parseFloat(valor).toFixed(2).replace('.',',');

            const valorFormatado = parseFloat(valor).toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' }); // => "R$1.231.230.123,23"

            return valorFormatado;
        }

        return(moeda(this.props.valor));
    }
}
