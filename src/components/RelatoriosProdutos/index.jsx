import React, { Component } from 'react';
import EventoRelatorioProdutos from '../EventoRelatorioProdutos';
import Total from '../Total';

export default class RelatoriosProdutos extends Component {
  render() {
    const total = this.props.dados.length
      ? this.props.dados
          .map((evento) => parseFloat(evento.subTotal))
          .reduce((a, b) => a + b)
      : '0,00';

    return (
      <>
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
          <tbody>
            {this.props.dados.map((evento) => (
              <EventoRelatorioProdutos key={evento.id} evento={evento} />
            ))}
          </tbody>
        </table>
        <Total value={total} />
      </>
    );
  }
}
