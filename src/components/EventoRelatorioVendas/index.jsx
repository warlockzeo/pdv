import React from 'react';
import { DataBrasil, MoedaReal } from '../../utils';

const EventoRelatorioVendas = ({ evento }) => {
  const {
    operacao,
    dataVenda,
    nomeCliente,
    totalAPagar,
    resta,
    formaPg,
    pago
  } = evento;

  return (
    <tr>
      <td>
        <DataBrasil data={dataVenda} />
      </td>
      <td className='text-left'>
        {operacao === 'Venda' ? nomeCliente || 'A Vista' : nomeCliente}
      </td>
      <td>{operacao === 'Venda' ? 'Compra' : operacao}</td>
      <td>{operacao === 'Venda' && <MoedaReal valor={totalAPagar} />}</td>
      <td>{operacao === 'Venda' && <MoedaReal valor={resta} />}</td>
      <td>{operacao === 'Venda' && pago === '0.00' ? 'Crediário' : formaPg}</td>
      <td className='text-right'>
        <MoedaReal valor={pago} />
      </td>
    </tr>
  );
};

export default EventoRelatorioVendas;
