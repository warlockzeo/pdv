import React from 'react';
import { MoedaReal } from '../../utils';
import EventoRelatorioVendas from '../../components/EventoRelatorioVendas';

const RelatorioVendas = ({ dados }) => {
  const total = dados.length
    ? dados.map((evento) => parseFloat(evento.pago)).reduce((a, b) => a + b)
    : '0,00';

  const mostra = dados.map((evento) => (
    <EventoRelatorioVendas key={evento.id} evento={evento} />
  ));

  return (
    <>
      <table className='table table-sm table-hover'>
        <thead className=' thead-dark'>
          <tr>
            <th className='text-left'>Data</th>
            <th className='text-left'>Cliente</th>
            <th className='text-right'>Operação</th>
            <th>Total</th>
            <th>Crediário</th>
            <th>Form Pgto</th>
            <th>Valor Recebido</th>
          </tr>
        </thead>
        <tbody>{mostra}</tbody>
      </table>
      <div className='relat__total'>
        <MoedaReal valor={total} />
      </div>
    </>
  );
};

export default RelatorioVendas;
