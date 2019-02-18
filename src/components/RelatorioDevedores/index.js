import React, {Component, Fragment} from 'react';
import MoedaReal from '../../components/MoedaReal';
import EventoRelatorioDevedores from '../../components/EventoRelatorioDevedores';

export default class RelatorioDevedores extends Component {
    render() {
        const total = (this.props.dados.length)?this.props.dados.map(evento => parseFloat(evento.saldo)).reduce((a,b) => a+b):'0,00';
        const mostra = this.props.dados.map(evento => 
            <EventoRelatorioDevedores key={evento.id} evento={evento} />
        );
        return (
            <Fragment>
                <table className='table table-sm table-hover'>
                    <thead className='relat__head-tabela thead-dark'>
                        <tr style={{display:'flex',flexDirection: 'row', alignItems: 'stretch'}}>
                            <th style={{flex:'0 1 40%'}} className='text-left'>Nome</th>
                            <th style={{flex:'0 1 30%'}} className='text-left'>Endereço</th>
                            <th style={{flex:'0 1 15%'}} className='text-left'>Telefone</th>
                            <th style={{flex:'0 1 15%'}} className='text-right'>Saldo devedor</th>
                        </tr>
                    </thead>
                    <tbody className='relat__scroll-tabela'>
                        {mostra}
                    </tbody>
                </table>
                <div className='relat__total'><MoedaReal valor={total} /></div>
            </Fragment>
        );
    }
}
