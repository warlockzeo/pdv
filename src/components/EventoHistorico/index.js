import React, {Component, Fragment} from 'react';
import DataBrasil from '../../components/DataBrasil';
import MoedaReal from '../../components/MoedaReal';

export default class Evento extends Component {

    detalhesEvento = () => {
        if(this.props.dados.operacao === 'Venda'){
            this.props.mostraDetalhes(this.props.dados.id);
        }
    }

    render() {
        const evento = this.props.dados;

        const mostra = (evento.operacao === 'Venda')?(
                <Fragment>
                    <tr onClick={this.detalhesEvento}>
                        <td><DataBrasil data={evento.dataVenda} /></td>
                        <td>{evento.id}</td>
                        <td>{evento.operacao}</td>
                        <td className='text-right'><MoedaReal valor={evento.valor} /></td>
                    </tr>
                </Fragment>
        ):(
                <Fragment>
                    <tr onClick={this.detalhesEvento}>
                        <td><DataBrasil data={evento.dataVenda} /></td>
                        <td></td>
                        <td>{evento.operacao}</td>
                        <td className='text-right'><MoedaReal valor={(evento.pago)*(-1)} /></td>
                    </tr>
                </Fragment>
        );

        return <Fragment>{mostra}</Fragment>

    };

}