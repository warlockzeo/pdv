import React, { Component, Fragment } from 'react';
import { MoedaReal } from '../../utils';
import EventoRelatorioProdutos from '../../components/EventoRelatorioProdutos';

export default class RelatoriosProdutos extends Component {
  render() {
    const total = this.props.dados.length
      ? this.props.dados
          .map((evento) => parseFloat(evento.subTotal))
          .reduce((a, b) => a + b)
      : '0,00';
    const mostra = this.props.dados.map((evento) => (
      <EventoRelatorioProdutos key={evento.id} evento={evento} />
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
              <th style={{ flex: '0 1 15%' }}>Data</th>
              <th style={{ flex: '0 1 40%' }} className="text-left">
                Produto
              </th>
              <th style={{ flex: '0 1 15%' }}>Quant</th>
              <th style={{ flex: '0 1 15%' }} className="text-right">
                Valor Unit
              </th>
              <th style={{ flex: '0 1 15%' }} className="text-right">
                Subtotal
              </th>
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
