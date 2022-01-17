import React from 'react';
import EventoRelatorioDevedores from '../EventoRelatorioDevedores';
import Total from '../Total';

const RelatorioDevedores = ({ dados }) => {
  const total = dados.length
    ? dados.map((evento) => parseFloat(evento.saldo)).reduce((a, b) => a + b)
    : '0,00';

  return (
    <>
      <table className='table table-sm table-hover'>
        <thead className='thead-dark'>
          <tr>
            <th className='text-left'>Nome</th>
            <th className='text-left'>Endereço</th>
            <th className='text-left'>Telefone</th>
            <th className='text-right'>Saldo devedor</th>
          </tr>
        </thead>
        <tbody>
          {dados.map((evento) => (
            <EventoRelatorioDevedores key={evento.id} evento={evento} />
          ))}
        </tbody>
      </table>
      <Total value={total} />
    </>
  );
};

export default RelatorioDevedores;
