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
        <table className='table table-sm table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th>Data</th>
              <th className='text-left'>Produto</th>
              <th>Quant</th>
              <th className='text-right'>Valor Unit</th>
              <th className='text-right'>Subtotal</th>
            </tr>
          </thead>
          <tbody>{mostra}</tbody>
        </table>
        <div className='relat__total'>
          <MoedaReal valor={total} />
        </div>
      </Fragment>
    );
  }
}
