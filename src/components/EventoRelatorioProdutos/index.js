import React, {Component,Fragment} from 'react';
import DataBrasil from '../../components/DataBrasil';
import MoedaReal from '../../components/MoedaReal';

export default class EventoRelatorioProdutos extends Component {
    render() {
        const evento = this.props.evento;
        const mostra = (
            <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                <td style={{flex:'0 1 15%'}}><DataBrasil data={evento.dataVenda} /></td>
                <td style={{flex:'0 1 40%'}} className='text-left'>{evento.produto}</td>
                <td style={{flex:'0 1 15%'}}>{evento.quant}</td>
                <td style={{flex:'0 1 15%'}} className='text-right'><MoedaReal valor={evento.unit} /></td>
                <td style={{flex:'0 1 15%'}} className='text-right'><MoedaReal valor={evento.subTotal} /></td>
            </tr>
        );

        return(
            <Fragment>{mostra}</Fragment>
        );
    }
}