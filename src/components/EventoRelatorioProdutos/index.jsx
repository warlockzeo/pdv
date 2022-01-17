import React from 'react';
import { DataBrasil, MoedaReal } from '../../utils';

const EventoRelatorioProdutos = ({ evento }) => {
  const { dataVenda, produto, quant, unit, subTotal } = evento;

  return (
    <tr>
      <td>
        <DataBrasil data={dataVenda} />
      </td>
      <td className='text-left'>{produto}</td>
      <td>{quant}</td>
      <td className='text-right'>
        <MoedaReal valor={unit} />
      </td>
      <td className='text-right'>
        <MoedaReal valor={subTotal} />
      </td>
    </tr>
  );
};

export default EventoRelatorioProdutos;
