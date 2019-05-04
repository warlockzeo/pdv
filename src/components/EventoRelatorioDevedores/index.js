import React, {Component,Fragment} from 'react';
import MoedaReal from '../../components/MoedaReal';

export default class EventoRelatorioDevedores extends Component {
    render() {
        const evento = this.props.evento;
        const mostra = (
            <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                <td style={{flex:'0 1 40%'}} className='text-left'>{evento.nome}</td>
                <td style={{flex:'0 1 30%'}} className='text-left'>{evento.endereco}</td>
                <td style={{flex:'0 1 15%'}} className='text-left'>{evento.fone}</td>
                <td style={{flex:'0 1 15%'}} className='text-right'><MoedaReal valor={evento.saldo} /></td>
            </tr>
        );

        return(
            <Fragment>{mostra}</Fragment>
        );
    }
}