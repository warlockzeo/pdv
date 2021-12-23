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
    <tr
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
      <td style={{ flex: '0 1 10%' }}>
        <DataBrasil data={dataVenda} />
      </td>
      <td style={{ flex: '0 1 15%' }} className="text-left">
        {operacao === 'Venda' ? nomeCliente || 'A Vista' : nomeCliente}
      </td>
      <td style={{ flex: '0 1 15%' }}>
        {operacao === 'Venda' ? 'Compra' : operacao}
      </td>
      <td style={{ flex: '0 1 15%' }}>
        {operacao === 'Venda' && <MoedaReal valor={totalAPagar} />}
      </td>
      <td style={{ flex: '0 1 15%' }}>
        {operacao === 'Venda' && <MoedaReal valor={resta} />}
      </td>
      <td style={{ flex: '0 1 15%' }}>
        {operacao === 'Venda' && pago === '0.00' ? 'Crediário' : formaPg}
      </td>
      <td style={{ flex: '0 1 15%' }} className="text-right">
        <MoedaReal valor={pago} />
      </td>
    </tr>
  );
};

export default EventoRelatorioVendas;
