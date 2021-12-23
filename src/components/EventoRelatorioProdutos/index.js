import React from 'react';
import { DataBrasil, MoedaReal } from '../../utils';

const EventoRelatorioProdutos = ({ evento }) => {
  const { dataVenda, produto, quant, unit, subTotal } = evento;
  return (
    <tr
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'stretch'
      }}>
      <td style={{ flex: '0 1 15%' }}>
        <DataBrasil data={dataVenda} />
      </td>
      <td style={{ flex: '0 1 40%' }} className="text-left">
        {produto}
      </td>
      <td style={{ flex: '0 1 15%' }}>{quant}</td>
      <td style={{ flex: '0 1 15%' }} className="text-right">
        <MoedaReal valor={unit} />
      </td>
      <td style={{ flex: '0 1 15%' }} className="text-right">
        <MoedaReal valor={subTotal} />
      </td>
    </tr>
  );
};

export default EventoRelatorioProdutos;
