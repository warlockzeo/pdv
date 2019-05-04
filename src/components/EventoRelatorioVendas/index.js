import React, {Component,Fragment} from 'react';
import DataBrasil from '../../components/DataBrasil';
import MoedaReal from '../../components/MoedaReal';

export default class EventoRelatorioVendas extends Component {
    render() {
        const evento = this.props.evento;
        const mostra = (evento.operacao==='Venda')?(
            <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                <td style={{flex:'0 1 10%'}}><DataBrasil data={evento.dataVenda} /></td>
                <td style={{flex:'0 1 15%'}} className='text-left'>{evento.nomeCliente||'A Vista'}</td>
                <td style={{flex:'0 1 15%'}}>Compra</td>
                <td style={{flex:'0 1 15%'}}><MoedaReal valor={evento.totalAPagar} /></td>
                <td style={{flex:'0 1 15%'}}><MoedaReal valor={evento.resta} /></td>
                <td style={{flex:'0 1 15%'}}>{(evento.pago==='0.00')?'Crediário':evento.formaPg}</td>
                <td style={{flex:'0 1 15%'}} className='text-right'><MoedaReal valor={evento.pago} /></td>
            </tr>
        ):(
            <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                <td style={{flex:'0 1 10%'}}><DataBrasil data={evento.dataVenda} /></td>
                <td style={{flex:'0 1 15%'}} className='text-left'>{evento.nomeCliente}</td>
                <td style={{flex:'0 1 15%'}}>{evento.operacao}</td>
                <td style={{flex:'0 1 15%'}}></td>
                <td style={{flex:'0 1 15%'}}></td>
                <td style={{flex:'0 1 15%'}}>{evento.formaPg}</td>
                <td style={{flex:'0 1 15%'}} className='text-right'><MoedaReal valor={evento.pago} /></td>
            </tr>
        );
        return(
            <Fragment>{mostra}</Fragment>
        );
    }
}