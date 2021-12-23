import React, { Component, Fragment } from 'react';
import { MoedaReal } from '../../utils';
import EventoRelatorioVendas from '../../components/EventoRelatorioVendas';

export default class RelatorioVendas extends Component {
  render() {
    const total = this.props.dados.length
      ? this.props.dados
          .map((evento) => parseFloat(evento.pago))
          .reduce((a, b) => a + b)
      : '0,00';
    const mostra = this.props.dados.map((evento) => (
      <EventoRelatorioVendas key={evento.id} evento={evento} />
    ));
    return (
      <Fragment>
        <table className="table table-sm table-hover">
          <thead className="relat__head-tabela thead-dark">
            <tr
              style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'stretch'
              }}>
              <th style={{ flex: '0 1 10%' }} className="text-left">
                Data
              </th>
              <th style={{ flex: '0 1 15%' }} className="text-left">
                Cliente
              </th>
              <th style={{ flex: '0 1 15%' }} className="text-right">
                Operação
              </th>
              <th style={{ flex: '0 1 15%' }}>Total</th>
              <th style={{ flex: '0 1 15%' }}>Crediário</th>
              <th style={{ flex: '0 1 15%' }}>Forma Pagamento</th>
              <th style={{ flex: '0 1 15%' }}>Valor Recebido</th>
            </tr>
          </thead>
          <tbody className="relat__scroll-tabela">{mostra}</tbody>
        </table>
        <div className="relat__total">
          <MoedaReal valor={total} />
        </div>
      </Fragment>
    );
  }
}
