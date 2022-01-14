import React, { Component, Fragment } from 'react';
import { MoedaReal } from '../../utils';
import EventoRelatorioDevedores from '../../components/EventoRelatorioDevedores';

export default class RelatorioDevedores extends Component {
  render() {
    const total = this.props.dados.length
      ? this.props.dados
          .map((evento) => parseFloat(evento.saldo))
          .reduce((a, b) => a + b)
      : '0,00';

    const mostra = this.props.dados.map((evento) => (
      <EventoRelatorioDevedores key={evento.id} evento={evento} />
    ));

    return (
      <Fragment>
        <table className='table table-sm table-hover'>
          <thead className='thead-dark'>
            <tr>
              <th className='text-left'>Nome</th>
              <th className='text-left'>Endereço</th>
              <th className='text-left'>Telefone</th>
              <th className='text-right'>Saldo devedor</th>
            </tr>
          </thead>
          <tbody>{mostra}</tbody>
        </table>
        <div className='relat-dev__total'>
          <MoedaReal valor={total} />
        </div>
      </Fragment>
    );
  }
}
