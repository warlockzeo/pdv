import React from 'react';
import EventoRelatorioVendas from '../EventoRelatorioVendas';
import Total from '../Total';

const RelatorioVendas = ({ dados }) => {
  const total = dados.length
    ? dados.map((evento) => parseFloat(evento.pago)).reduce((a, b) => a + b)
    : '0,00';

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
        <tbody>
          {dados.map((evento) => (
            <EventoRelatorioVendas key={evento.id} evento={evento} />
          ))}
        </tbody>
      </table>
      <Total value={total} />
    </>
  );
};

export default RelatorioVendas;
